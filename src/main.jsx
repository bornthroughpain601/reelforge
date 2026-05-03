import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('Doodle Animation')
  const [emotion, setEmotion] = useState('Humor and Comedy')
  const [audience, setAudience] = useState('General Public')
  const [length, setLength] = useState('30 seconds')
  const [pacing, setPacing] = useState('Fast and Punchy')
  const [hook, setHook] = useState('Question Hook')
  const [narrative, setNarrative] = useState('Problem — Solution — Result')
  const [conflict, setConflict] = useState('Person vs Self')
  const [character, setCharacter] = useState('The Everyman')
  const [setting, setSetting] = useState('Everyday Life')
  const [twist, setTwist] = useState('Unexpected Reversal')
  const [visualStyle, setVisualStyle] = useState('High Contrast Bold Text')
  const [musicMood, setMusicMood] = useState('Upbeat and Energetic')
  const [voiceTone, setVoiceTone] = useState('Conversational')
  const [platform, setPlatform] = useState('Instagram Reels')
  const [cta, setCta] = useState('Follow For More')
  const [contentPillar, setContentPillar] = useState('Entertainment')
  const [script, setScript] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.puter.com/v2/'
    script.async = true
    document.head.appendChild(script)
  }, [])

  const label = {
    color:'#ff6b35',fontWeight:'bold',fontSize:'13px',
    letterSpacing:'2px',textTransform:'uppercase',
    display:'block',marginBottom:'8px',marginTop:'20px'
  }

  const select = {
    display:'block',width:'100%',padding:'11px',
    backgroundColor:'#2a2a2a',border:'1px solid #444',
    borderRadius:'8px',color:'white',fontSize:'14px',marginBottom:'4px'
  }

  const extractVoiceLines = (text) => {
    const voLines = text.match(/VO:([^\n]+)/g) || []
    if (voLines.length > 0) {
      return voLines.map(l => l.replace(/\*?\*?VO:\*?\*?/, '').replace(/"/g, '').trim()).join(' ')
    }
    return text
      .replace(/\*\*.*?\*\*/g, '')
      .replace(/#{1,3}[^\n]*/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/---/g, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 2000)
  }

  const speakScript = async (text) => {
    try {
      setSpeaking(true)
      const voiceText = extractVoiceLines(text)
      const voice = emotion === 'Horror and Terror' ? 'Matthew' :
                    emotion === 'Love and Beauty' ? 'Joanna' :
                    emotion === 'Courage and Heroism' ? 'Brian' :
                    emotion === 'Humor and Comedy' ? 'Salli' :
                    emotion === 'Sadness and Compassion' ? 'Kendra' : 'Joanna'
      const engine = 'neural'
      if (window.puter) {
        const audio = await window.puter.ai.txt2speech(voiceText, { voice, engine })
        audio.onended = () => setSpeaking(false)
        audio.play()
      } else {
        throw new Error('Puter not loaded yet')
      }
    } catch (e) {
      setSpeaking(false)
      setError('Voice error: ' + e.message)
    }
  }

  const stopSpeaking = () => {
    setSpeaking(false)
    const audios = document.querySelectorAll('audio')
    audios.forEach(a => { a.pause(); a.currentTime = 0 })
  }

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or story first.')
      return
    }
    setLoading(true)
    setError('')
    setScript('')

    const key = import.meta.env.VITE_GEMINI_API_KEY
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + key

    const prompt = 'You are a world class short form video script writer. Generate a complete video script. STORY: ' + topic + ' STYLE: ' + style + ' EMOTION: ' + emotion + ' NARRATIVE: ' + narrative + ' CONFLICT: ' + conflict + ' CHARACTER: ' + character + ' SETTING: ' + setting + ' HOOK: ' + hook + ' TWIST: ' + twist + ' PACING: ' + pacing + ' VISUAL: ' + visualStyle + ' MUSIC: ' + musicMood + ' VOICE: ' + voiceTone + ' AUDIENCE: ' + audience + ' PLATFORM: ' + platform + ' LENGTH: ' + length + ' PILLAR: ' + contentPillar + ' CTA: ' + cta + ' Write the script with: TITLE, HOOK, SCENE 1, SCENE 2, SCENE 3, CLIMAX, RESOLUTION, CALL TO ACTION, CAPTION with hashtags. Include VO: lines for every scene.'

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })
      const data = await res.json()
      if (data.error) {
        setError('API Error: ' + data.error.message)
      } else {
        const text = data.candidates[0].content.parts[0].text
        setScript(text)
      }
    } catch (e) {
      setError('Error: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{backgroundColor:'#0f0f0f',minHeight:'100vh',color:'white',fontFamily:'Arial, sans-serif'}}>
      <nav style={{backgroundColor:'#111',padding:'18px 40px',borderBottom:'1px solid #222',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h1 style={{margin:0,color:'#ff6b35',fontSize:'26px',letterSpacing:'2px'}}>REELFORGE</h1>
        <span style={{color:'#555',fontSize:'13px'}}>AI Powered Video Generation</span>
      </nav>
      <div style={{maxWidth:'700px',margin:'50px auto',padding:'40px',backgroundColor:'#1a1a1a',borderRadius:'16px'}}>
        <h2 style={{marginBottom:'8px'}}>Generate Your Reel</h2>
        <p style={{color:'#666',fontSize:'13px',marginBottom:'24px'}}>Fill in every field for the best possible output.</p>
        <span style={label}>Your Story or Topic</span>
        <textarea
          placeholder="Write your full story here. Include characters, setting, conflict, climax and resolution."
          value={topic}
          onChange={e => setTopic(e.target.value)}
          rows={6}
          style={{display:'block',width:'100%',padding:'14px',backgroundColor:'#2a2a2a',border:'1px solid #444',borderRadius:'8px',color:'white',fontSize:'14px',boxSizing:'border-box',resize:'vertical',lineHeight:'1.7'}}
        />
        <span style={label}>Animation Style</span>
        <select value={style} onChange={e => setStyle(e.target.value)} style={select}>
          <option>Doodle Animation</option>
          <option>Cartoon Characters</option>
          <option>Realistic Cinematic</option>
          <option>Whiteboard Explainer</option>
          <option>Motion Graphics</option>
          <option>Stop Motion</option>
          <option>Typographic</option>
          <option>Mixed Media</option>
        </select>
        <span style={label}>Core Emotion</span>
        <select value={emotion} onChange={e => setEmotion(e.target.value)} style={select}>
          <option>Love and Beauty</option>
          <option>Humor and Comedy</option>
          <option>Sadness and Compassion</option>
          <option>Fury and Anger</option>
          <option>Courage and Heroism</option>
          <option>Horror and Terror</option>
          <option>Disgust and Revulsion</option>
          <option>Wonder and Amazement</option>
          <option>Peace and Serenity</option>
        </select>
        <span style={label}>Narrative Framework</span>
        <select value={narrative} onChange={e => setNarrative(e.target.value)} style={select}>
          <option>Problem — Solution — Result</option>
          <option>Before — After — Bridge</option>
          <option>Hero's Journey</option>
          <option>Three Act Structure</option>
          <option>In Medias Res</option>
          <option>The Revelation</option>
          <option>The Contrast</option>
          <option>The Loop</option>
          <option>False Start</option>
          <option>The List</option>
        </select>
        <span style={label}>Type of Conflict</span>
        <select value={conflict} onChange={e => setConflict(e.target.value)} style={select}>
          <option>Person vs Self</option>
          <option>Person vs Person</option>
          <option>Person vs Society</option>
          <option>Person vs Nature</option>
          <option>Person vs Technology</option>
          <option>Person vs Fate</option>
          <option>Person vs Unknown</option>
        </select>
        <span style={label}>Character Archetype</span>
        <select value={character} onChange={e => setCharacter(e.target.value)} style={select}>
          <option>The Everyman</option>
          <option>The Hero</option>
          <option>The Trickster</option>
          <option>The Mentor</option>
          <option>The Rebel</option>
          <option>The Innocent</option>
          <option>The Villain</option>
          <option>The Outcast</option>
          <option>The Lover</option>
          <option>No Character — Narrator Only</option>
        </select>
        <span style={label}>Setting</span>
        <select value={setting} onChange={e => setSetting(e.target.value)} style={select}>
          <option>Everyday Life</option>
          <option>Fantasy World</option>
          <option>Futuristic</option>
          <option>Historical</option>
          <option>Nature and Wilderness</option>
          <option>Urban City</option>
          <option>Supernatural</option>
          <option>Abstract and Surreal</option>
          <option>Workplace</option>
          <option>Domestic Home</option>
        </select>
        <span style={label}>Hook Type</span>
        <select value={hook} onChange={e => setHook(e.target.value)} style={select}>
          <option>Question Hook</option>
          <option>Shocking Statement Hook</option>
          <option>Story Drop Hook</option>
          <option>Fact Hook</option>
          <option>Controversy Hook</option>
          <option>Relatability Hook</option>
          <option>Fear Hook</option>
          <option>Curiosity Gap Hook</option>
          <option>Challenge Hook</option>
          <option>Confession Hook</option>
          <option>Prediction Hook</option>
          <option>Myth Busting Hook</option>
          <option>Number Hook</option>
          <option>Before and After Hook</option>
          <option>Pain Point Hook</option>
        </select>
        <span style={label}>Twist or Surprise</span>
        <select value={twist} onChange={e => setTwist(e.target.value)} style={select}>
          <option>Unexpected Reversal</option>
          <option>Hidden Information Revealed</option>
          <option>Genre Subversion</option>
          <option>Fourth Wall Break</option>
          <option>Time Jump</option>
          <option>Role Reversal</option>
          <option>No Twist — Straight Narrative</option>
        </select>
        <span style={label}>Overall Pacing</span>
        <select value={pacing} onChange={e => setPacing(e.target.value)} style={select}>
          <option>Slow and Cinematic</option>
          <option>Medium and Conversational</option>
          <option>Fast and Punchy</option>
          <option>Slow Build to Fast Climax</option>
          <option>Fast Open Slow Close</option>
          <option>Rhythmic and Musical</option>
          <option>Erratic and Chaotic</option>
        </select>
        <span style={label}>Visual Style</span>
        <select value={visualStyle} onChange={e => setVisualStyle(e.target.value)} style={select}>
          <option>High Contrast Bold Text</option>
          <option>Minimal Clean White</option>
          <option>Dark Moody Cinematic</option>
          <option>Bright Playful Colourful</option>
          <option>Vintage and Retro</option>
          <option>Neon and Cyberpunk</option>
          <option>Nature and Earthy</option>
          <option>Black and White</option>
        </select>
        <span style={label}>Music Mood</span>
        <select value={musicMood} onChange={e => setMusicMood(e.target.value)} style={select}>
          <option>Upbeat and Energetic</option>
          <option>Dark and Tense</option>
          <option>Emotional and Cinematic</option>
          <option>Funny and Quirky</option>
          <option>Lo-Fi and Relaxed</option>
          <option>Epic and Powerful</option>
          <option>Silence — No Music</option>
          <option>Horror Ambient</option>
          <option>Romantic and Soft</option>
        </select>
        <span style={label}>Voice Tone</span>
        <select value={voiceTone} onChange={e => setVoiceTone(e.target.value)} style={select}>
          <option>Conversational</option>
          <option>Authoritative</option>
          <option>Excited and Hyped</option>
          <option>Calm and Soothing</option>
          <option>Mysterious and Whispery</option>
          <option>Comedic</option>
          <option>Dramatic</option>
          <option>Robotic and Detached</option>
          <option>No Voice — Text Only</option>
        </select>
        <span style={label}>Target Platform</span>
        <select value={platform} onChange={e => setPlatform(e.target.value)} style={select}>
          <option>Instagram Reels</option>
          <option>YouTube Shorts</option>
          <option>TikTok</option>
          <option>Facebook Reels</option>
          <option>LinkedIn Video</option>
          <option>Twitter/X Video</option>
          <option>All Platforms</option>
        </select>
        <span style={label}>Video Length</span>
        <select value={length} onChange={e => setLength(e.target.value)} style={select}>
          <option>15 seconds</option>
          <option>30 seconds</option>
          <option>45 seconds</option>
          <option>60 seconds</option>
          <option>90 seconds</option>
        </select>
        <span style={label}>Target Audience</span>
        <select value={audience} onChange={e => setAudience(e.target.value)} style={select}>
          <option>General Public</option>
          <option>Children</option>
          <option>Teenagers</option>
          <option>Young Adults 18-25</option>
          <option>Adults 25-40</option>
          <option>Professionals</option>
          <option>Entrepreneurs</option>
          <option>Parents</option>
          <option>Seniors</option>
          <option>Niche Community</option>
        </select>
        <span style={label}>Content Pillar</span>
        <select value={contentPillar} onChange={e => setContentPillar(e.target.value)} style={select}>
          <option>Entertainment</option>
          <option>Education</option>
          <option>Inspiration</option>
          <option>Controversy and Opinion</option>
          <option>Behind the Scenes</option>
          <option>Storytelling</option>
          <option>News and Trends</option>
          <option>Humour and Satire</option>
          <option>Horror and Thriller</option>
          <option>Romance and Emotion</option>
        </select>
        <span style={label}>Call To Action</span>
        <select value={cta} onChange={e => setCta(e.target.value)} style={select}>
          <option>Follow For More</option>
          <option>Comment Your Thoughts</option>
          <option>Share With Someone Who Needs This</option>
          <option>Save This Video</option>
          <option>Tag a Friend</option>
          <option>Visit Link in Bio</option>
          <option>Answer This Question</option>
          <option>Duet or Stitch This</option>
          <option>No Call To Action</option>
        </select>
        {error && (
          <div style={{padding:'16px',backgroundColor:'#3a1a1a',border:'1px solid #ff4444',borderRadius:'8px',marginTop:'20px',color:'#ff4444'}}>
            {error}
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{display:'block',width:'100%',padding:'20px',backgroundColor:loading?'#555':'#ff6b35',border:'none',borderRadius:'10px',color:'white',fontSize:'20px',fontWeight:'bold',cursor:loading?'not-allowed':'pointer',letterSpacing:'1px',marginTop:'24px'}}
        >
          {loading ? 'Generating Your Script...' : 'Generate Video'}
        </button>
        {script && (
          <div style={{marginTop:'32px',padding:'28px',backgroundColor:'#2a2a2a',borderRadius:'12px',border:'1px solid #ff6b35'}}>
            <h3 style={{margin:'0 0 16px 0',color:'#ff6b35'}}>Your Generated Script</h3>
            <div style={{display:'flex',gap:'12px',marginBottom:'20px',flexWrap:'wrap'}}>
              <button
                onClick={() => speakScript(script)}
                disabled={speaking}
                style={{padding:'12px 24px',backgroundColor:speaking?'#555':'#ff6b35',border:'none',borderRadius:'8px',color:'white',fontSize:'15px',fontWeight:'bold',cursor:speaking?'not-allowed':'pointer'}}
              >
                {speaking ? '🔊 Speaking...' : '▶ Play Voiceover'}
              </button>
              <button
                onClick={stopSpeaking}
                style={{padding:'12px 24px',backgroundColor:'#333',border:'1px solid #555',borderRadius:'8px',color:'white',fontSize:'15px',cursor:'pointer'}}
              >
                ⏹ Stop
              </button>
            </div>
            <pre style={{whiteSpace:'pre-wrap',fontFamily:'Arial, sans-serif',fontSize:'14px',lineHeight:'1.8',color:'#ddd',margin:0}}>
              {script}
            </pre>
          </div>
        )}
        <div style={{marginTop:'32px',padding:'20px',backgroundColor:'#2a2a2a',borderRadius:'8px'}}>
          <h3 style={{margin:'0 0 8px 0',fontSize:'16px'}}>Queue Status</h3>
          <p style={{margin:0,color:'#666',fontSize:'14px'}}>No videos in queue yet. Generate your first reel above.</p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)