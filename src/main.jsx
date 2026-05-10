import React, { useState, useRef, useEffect } from 'react'
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
  const [scenes, setScenes] = useState([])
  const [currentScene, setCurrentScene] = useState(0)
  const [playing, setPlaying] = useState(false)
  const canvasRef = useRef(null)
  const intervalRef = useRef(null)

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

  const getBgColor = () => {
    if (visualStyle === 'Dark Moody Cinematic') return '#0a0a0a'
    if (visualStyle === 'Minimal Clean White') return '#ffffff'
    if (visualStyle === 'Neon and Cyberpunk') return '#0d0221'
    if (visualStyle === 'Vintage and Retro') return '#2c1810'
    if (visualStyle === 'Nature and Earthy') return '#1a2e1a'
    if (visualStyle === 'Bright Playful Colourful') return '#1a1a6e'
    if (visualStyle === 'Black and White') return '#000000'
    return '#0f0f0f'
  }

  const getTextColor = () => {
    if (visualStyle === 'Minimal Clean White') return '#111111'
    if (visualStyle === 'Black and White') return '#ffffff'
    return '#ffffff'
  }

  const getAccentColor = () => {
    if (visualStyle === 'Neon and Cyberpunk') return '#ff00ff'
    if (visualStyle === 'Nature and Earthy') return '#7bc67e'
    if (visualStyle === 'Vintage and Retro') return '#d4a853'
    if (visualStyle === 'Bright Playful Colourful') return '#ffdd57'
    if (visualStyle === 'Minimal Clean White') return '#ff6b35'
    return '#ff6b35'
  }

  const extractScenes = (scriptText) => {
    const voLines = scriptText.match(/\*?\*?VO:\*?\*?\s*"?([^"\n]+)"?/g) || []
    const visualLines = scriptText.match(/\*?\*?VISUAL:\*?\*?\s*([^\n]+)/g) || []
    const extracted = []
    const maxScenes = Math.max(voLines.length, visualLines.length)
    for (let i = 0; i < Math.min(maxScenes, 8); i++) {
      const vo = voLines[i] ? voLines[i].replace(/\*?\*?VO:\*?\*?/, '').replace(/"/g, '').trim() : ''
      const visual = visualLines[i] ? visualLines[i].replace(/\*?\*?VISUAL:\*?\*?/, '').trim() : ''
      if (vo || visual) {
        extracted.push({ vo, visual, index: i })
      }
    }
    if (extracted.length === 0) {
      const paragraphs = scriptText.split('\n').filter(l => l.trim().length > 20).slice(0, 6)
      paragraphs.forEach((p, i) => {
        extracted.push({ vo: p.trim().slice(0, 100), visual: '', index: i })
      })
    }
    return extracted
  }

  const drawScene = (sceneIndex, sceneList) => {
    const canvas = canvasRef.current
    if (!canvas || !sceneList || sceneList.length === 0) return
    const ctx = canvas.getContext('2d')
    const scene = sceneList[sceneIndex]
    if (!scene) return

    const bg = getBgColor()
    const textColor = getTextColor()
    const accent = getAccentColor()

    ctx.fillStyle = bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = accent
    ctx.fillRect(0, 0, canvas.width, 6)
    ctx.fillRect(0, canvas.height - 6, canvas.width, 6)

    ctx.fillStyle = accent + '33'
    ctx.fillRect(20, 20, canvas.width - 40, 2)
    ctx.fillRect(20, canvas.height - 22, canvas.width - 40, 2)

    ctx.fillStyle = accent
    ctx.font = 'bold 18px Arial'
    ctx.textAlign = 'left'
    ctx.fillText('REELFORGE', 30, 55)

    ctx.fillStyle = textColor + '66'
    ctx.font = '14px Arial'
    ctx.textAlign = 'right'
    ctx.fillText('Scene ' + (sceneIndex + 1) + ' of ' + sceneList.length, canvas.width - 30, 55)

    if (scene.vo) {
      const words = scene.vo.split(' ')
      const lines = []
      let currentLine = ''
      const maxWidth = canvas.width - 80
      ctx.font = 'bold 28px Arial'
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      })
      if (currentLine) lines.push(currentLine)

      const lineHeight = 40
      const totalHeight = lines.length * lineHeight
      const startY = (canvas.height - totalHeight) / 2

      ctx.fillStyle = accent
      ctx.fillRect(30, startY - 20, 4, totalHeight + 10)

      lines.forEach((line, i) => {
        ctx.fillStyle = textColor
        ctx.font = 'bold 28px Arial'
        ctx.textAlign = 'left'
        ctx.fillText(line, 50, startY + i * lineHeight)
      })
    }

    if (scene.visual) {
      const visualText = scene.visual.slice(0, 80)
      ctx.fillStyle = textColor + '44'
      ctx.font = 'italic 14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(visualText, canvas.width / 2, canvas.height - 50)
    }

    const progress = (sceneIndex + 1) / sceneList.length
    ctx.fillStyle = accent + '33'
    ctx.fillRect(30, canvas.height - 35, canvas.width - 60, 4)
    ctx.fillStyle = accent
    ctx.fillRect(30, canvas.height - 35, (canvas.width - 60) * progress, 4)
  }

  useEffect(() => {
    if (scenes.length > 0) {
      drawScene(currentScene, scenes)
    }
  }, [currentScene, scenes, visualStyle])

  const playPreview = () => {
    if (scenes.length === 0) return
    setPlaying(true)
    setCurrentScene(0)
    let index = 0
    intervalRef.current = setInterval(() => {
      index++
      if (index >= scenes.length) {
        clearInterval(intervalRef.current)
        setPlaying(false)
        setCurrentScene(0)
      } else {
        setCurrentScene(index)
      }
    }, 3000)
  }

  const stopPreview = () => {
    clearInterval(intervalRef.current)
    setPlaying(false)
    setCurrentScene(0)
  }

  const extractVoiceLines = (text) => {
    const voLines = text.match(/VO:([^\n]+)/g) || []
    if (voLines.length > 0) {
      return voLines.map(l => l.replace(/\*?\*?VO:\*?\*?/, '').replace(/"/g, '').trim()).join(' ')
    }
    return text.replace(/\*\*.*?\*\*/g, '').replace(/#{1,3}[^\n]*/g, '').replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/---/g, '').replace(/\n+/g, ' ').trim().slice(0, 2000)
  }

  const speakScript = (text) => {
    try {
      setSpeaking(true)
      setError('')
      window.speechSynthesis.cancel()
      const voiceText = extractVoiceLines(text)
      const utterance = new SpeechSynthesisUtterance(voiceText)
      utterance.rate = pacing === 'Fast and Punchy' ? 1.3 : pacing === 'Slow and Cinematic' ? 0.8 : 1.0
      utterance.pitch = emotion === 'Humor and Comedy' ? 1.2 : emotion === 'Horror and Terror' ? 0.6 : 1.0
      utterance.volume = 1
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)
      window.speechSynthesis.speak(utterance)
    } catch (e) {
      setSpeaking(false)
      setError('Voice error: ' + e.message)
    }
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or story first.')
      return
    }
    setLoading(true)
    setError('')
    setScript('')
    setScenes([])
    setCurrentScene(0)
    stopPreview()
    window.speechSynthesis.cancel()

    const key = import.meta.env.VITE_GEMINI_API_KEY
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + key
    const prompt = 'You are a world class short form video script writer. Generate a complete video script. STORY: ' + topic + ' STYLE: ' + style + ' EMOTION: ' + emotion + ' NARRATIVE: ' + narrative + ' CONFLICT: ' + conflict + ' CHARACTER: ' + character + ' SETTING: ' + setting + ' HOOK: ' + hook + ' TWIST: ' + twist + ' PACING: ' + pacing + ' VISUAL: ' + visualStyle + ' MUSIC: ' + musicMood + ' VOICE: ' + voiceTone + ' AUDIENCE: ' + audience + ' PLATFORM: ' + platform + ' LENGTH: ' + length + ' PILLAR: ' + contentPillar + ' CTA: ' + cta + ' Write the script with: TITLE, HOOK, SCENE 1, SCENE 2, SCENE 3, CLIMAX, RESOLUTION, CALL TO ACTION, CAPTION with hashtags. Include VO: lines and VISUAL: descriptions for every scene.'

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      })
      const data = await res.json()
      if (data.error) {
        setError('API Error: ' + data.error.message)
      } else {
        const text = data.candidates[0].content.parts[0].text
        setScript(text)
        const extractedScenes = extractScenes(text)
        setScenes(extractedScenes)
        if (extractedScenes.length > 0) {
          setTimeout(() => drawScene(0, extractedScenes), 100)
        }
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
        {scenes.length > 0 && (
          <div style={{marginTop:'32px',padding:'28px',backgroundColor:'#2a2a2a',borderRadius:'12px',border:'1px solid #ff6b35'}}>
            <h3 style={{margin:'0 0 16px 0',color:'#ff6b35'}}>Video Preview</h3>
            <canvas
              ref={canvasRef}
              width={540}
              height={960}
              style={{width:'100%',borderRadius:'8px',marginBottom:'16px',display:'block'}}
            />
            <div style={{display:'flex',gap:'12px',marginBottom:'16px',flexWrap:'wrap'}}>
              <button
                onClick={playPreview}
                disabled={playing}
                style={{padding:'12px 24px',backgroundColor:playing?'#555':'#ff6b35',border:'none',borderRadius:'8px',color:'white',fontSize:'15px',fontWeight:'bold',cursor:playing?'not-allowed':'pointer'}}
              >
                {playing ? 'Playing...' : 'Play Preview'}
              </button>
              <button
                onClick={stopPreview}
                style={{padding:'12px 24px',backgroundColor:'#333',border:'1px solid #555',borderRadius:'8px',color:'white',fontSize:'15px',cursor:'pointer'}}
              >
                Stop
              </button>
              <button
                onClick={() => speakScript(script)}
                disabled={speaking}
                style={{padding:'12px 24px',backgroundColor:speaking?'#555':'#333',border:'1px solid #ff6b35',borderRadius:'8px',color:'white',fontSize:'15px',cursor:speaking?'not-allowed':'pointer'}}
              >
                {speaking ? 'Speaking...' : 'Play Voiceover'}
              </button>
              <button
                onClick={stopSpeaking}
                style={{padding:'12px 24px',backgroundColor:'#333',border:'1px solid #555',borderRadius:'8px',color:'white',fontSize:'15px',cursor:'pointer'}}
              >
                Stop Voice
              </button>
            </div>
            <div style={{padding:'16px',backgroundColor:'#1a1a1a',borderRadius:'8px',marginBottom:'16px'}}>
              <p style={{margin:'0 0 8px 0',color:'#ff6b35',fontWeight:'bold',fontSize:'13px'}}>NEXT STEP — GET YOUR ANIMATED VIDEO</p>
              <p style={{margin:'0 0 8px 0',color:'#aaa',fontSize:'13px'}}>Copy your scene descriptions below and paste them into Seedance at seedance.tv for free animated video generation. No watermark. No credit card.</p>
            </div>
          </div>
        )}
        {script && (
          <div style={{marginTop:'32px',padding:'28px',backgroundColor:'#2a2a2a',borderRadius:'12px',border:'1px solid #333'}}>
            <h3 style={{margin:'0 0 16px 0',color:'#ff6b35'}}>Your Generated Script</h3>
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