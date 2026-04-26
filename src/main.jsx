import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function Section({ title, children }) {
  return (
    <div style={{marginBottom:'28px'}}>
      <p style={{color:'#ff6b35',fontWeight:'bold',fontSize:'13px',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'12px'}}>{title}</p>
      {children}
    </div>
  )
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{display:'block',width:'100%',padding:'11px',backgroundColor:'#2a2a2a',border:'1px solid #444',borderRadius:'8px',color:'white',fontSize:'14px'}}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  )
}

function Grid({ children }) {
  return <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>{children}</div>
}

function App() {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('Doodle Animation')
  const [emotion, setEmotion] = useState('Humor and Comedy')
  const [audience, setAudience] = useState('General Public')
  const [length, setLength] = useState('30 seconds')
  const [pacing, setPacing] = useState('Fast and Punchy')
  const [hook, setHook] = useState('Question Hook')
  const [hookPosition, setHookPosition] = useState('First 3 seconds')
  const [narrative, setNarrative] = useState('Problem — Solution — Result')
  const [conflict, setConflict] = useState('Person vs Self')
  const [characterType, setCharacterType] = useState('The Everyman')
  const [setting, setSetting] = useState('Everyday Life')
  const [twist, setTwist] = useState('Unexpected Reversal')
  const [openingLine, setOpeningLine] = useState('Bold Statement')
  const [visualStyle, setVisualStyle] = useState('High Contrast Bold Text')
  const [captionStyle, setCaptionStyle] = useState('Word by Word Pop')
  const [musicMood, setMusicMood] = useState('Upbeat and Energetic')
  const [voiceTone, setVoiceTone] = useState('Conversational')
  const [platform, setPlatform] = useState('Instagram Reels')
  const [cta, setCta] = useState('Follow For More')
  const [ctaPlacement, setCtaPlacement] = useState('Final 3 seconds')
  const [replayability, setReplayability] = useState('Cliffhanger Ending')
  const [contentPillar, setContentPillar] = useState('Entertainment')
  const [trend, setTrend] = useState('Original Concept')
  const [script, setScript] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or story first.')
      return
    }
    setLoading(true)
    setError('')
    setScript('')

    const prompt = `You are a world class short form video script writer.

Generate a complete video script based on these exact parameters:

STORY OR TOPIC: ${topic}
ANIMATION STYLE: ${style}
CORE EMOTION: ${emotion}
NARRATIVE FRAMEWORK: ${narrative}
CONFLICT TYPE: ${conflict}
CHARACTER ARCHETYPE: ${characterType}
SETTING: ${setting}
HOOK TYPE: ${hook}
HOOK PLACEMENT: ${hookPosition}
OPENING LINE STYLE: ${openingLine}
TWIST: ${twist}
PACING: ${pacing}
VISUAL STYLE: ${visualStyle}
CAPTION STYLE: ${captionStyle}
MUSIC MOOD: ${musicMood}
VOICE TONE: ${voiceTone}
TARGET AUDIENCE: ${audience}
PLATFORM: ${platform}
VIDEO LENGTH: ${length}
CONTENT PILLAR: ${contentPillar}
TREND APPROACH: ${trend}
REPLAYABILITY FACTOR: ${replayability}
CALL TO ACTION: ${cta}
CTA PLACEMENT: ${ctaPlacement}

Write the script in this exact format:

TITLE: [Catchy video title]

HOOK (${hookPosition}):
[Exactly what is said and shown in the opening]

SCENE 1:
[Visual description + Voiceover/Caption text]

SCENE 2:
[Visual description + Voiceover/Caption text]

SCENE 3:
[Visual description + Voiceover/Caption text]

CLIMAX:
[The peak moment of the story]

RESOLUTION:
[How it ends]

CALL TO ACTION:
[Exact CTA text]

CAPTION FOR POST:
[Full Instagram/YouTube caption with hashtags]`

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      )
      const data = await response.json()
      const text = data.candidates[0].content.parts[0].text
      setScript(text)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{backgroundColor:'#0f0f0f',minHeight:'100vh',color:'white',fontFamily:'Arial, sans-serif'}}>
      <nav style={{backgroundColor:'#111',padding:'18px 40px',borderBottom:'1px solid #222',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h1 style={{margin:0,color:'#ff6b35',fontSize:'26px',letterSpacing:'2px'}}>REELFORGE</h1>
        <span style={{color:'#555',fontSize:'13px'}}>AI Powered Video Generation</span>
      </nav>

      <div style={{maxWidth:'740px',margin:'50px auto',padding:'40px',backgroundColor:'#1a1a1a',borderRadius:'16px'}}>
        <h2 style={{marginBottom:'8px',fontSize:'22px'}}>Generate Your Reel</h2>
        <p style={{color:'#666',fontSize:'13px',marginBottom:'32px'}}>Fill in every field for the best possible output.</p>

        <Section title="Your Story or Topic">
          <textarea
            placeholder="Write your full story, idea, or narrative here. Include characters, setting, conflict, climax, and resolution. The more detail the better."
            value={topic}
            onChange={e => setTopic(e.target.value)}
        {error && (
          <div style={{padding:'16px',backgroundColor:'#3a1a1a',border:'1px solid #ff4444',borderRadius:'8px',marginBottom:'20px',color:'#ff4444'}}>
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{display:'block',width:'100%',padding:'20px',backgroundColor:loading?'#888':'#ff6b35',border:'none',borderRadius:'10px',color:'white',fontSize:'20px',fontWeight:'bold',cursor:loading?'not-allowed':'pointer',letterSpacing:'1px',marginTop:'10px'}}
        >
          {loading ? 'Generating Your Script...' : 'Generate Video'}
        </button>

        {script && (
          <div style={{marginTop:'32px',padding:'28px',backgroundColor:'#2a2a2a',borderRadius:'12px',border:'1px solid #ff6b35'}}>
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
