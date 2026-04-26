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
  const [emotion, setEmotion] = useState('Humor')
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

  const handleGenerate = () => {
    alert(`Generating your ${style} reel.\n\nEmotion: ${emotion}\nAudience: ${audience}\nLength: ${length}\nHook: ${hook}\nNarrative: ${narrative}`)
  }

  return (
    <div style={{backgroundColor:'#0f0f0f',minHeight:'100vh',color:'white',fontFamily:'Arial, sans-serif'}}>
      <nav style={{backgroundColor:'#111',padding:'18px 40px',borderBottom:'1px solid #222',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h1 style={{margin:0,color:'#ff6b35',fontSize:'26px',letterSpacing:'2px'}}>REELFORGE</h1>
        <span style={{color:'#555',fontSize:'13px'}}>AI Powered Video Generation</span>
      </nav>

      <div style={{maxWidth:'740px',margin:'50px auto',padding:'40px',backgroundColor:'#1a1a1a',borderRadius:'16px',boxShadow:'0 0 40px rgba(255,107,53,0.05)'}}>
        <h2 style={{marginBottom:'8px',fontSize:'22px'}}>Generate Your Reel</h2>
        <p style={{color:'#666',fontSize:'13px',marginBottom:'32px'}}>Fill in every field for the best possible output. The more specific you are, the sharper the video.</p>

        <Section title="Your Story or Topic">
          <textarea
            placeholder="Write your full story, idea, or narrative here. Include characters, setting, conflict, climax, and resolution. The more detail the better."
            value={topic}
            onChange={e => setTopic(e.target.value)}
            rows={6}
            style={{display:'block',width:'100%',padding:'14px',backgroundColor:'#2a2a2a',border:'1px solid #444',borderRadius:'8px',color:'white',fontSize:'14px',boxSizing:'border-box',resize:'vertical',lineHeight:'1.7'}}
          />
        </Section>

        <Section title="Animation Style">
          <Select value={style} onChange={setStyle} options={[
            'Doodle Animation',
            'Cartoon Characters',
            'Realistic Cinematic',
            'Whiteboard Explainer',
            'Motion Graphics',
            'Stop Motion',
            'Typographic',
            'Mixed Media'
          ]}/>
        </Section>

        <Section title="Core Emotion (The Nine Rasas)">
          <Select value={emotion} onChange={setEmotion} options={[
            'Love and Beauty',
            'Humor and Comedy',
            'Sadness and Compassion',
            'Fury and Anger',
            'Courage and Heroism',
            'Horror and Terror',
            'Disgust and Revulsion',
            'Wonder and Amazement',
            'Peace and Serenity'
          ]}/>
        </Section>

        <Section title="Story Structure and Conflict">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Narrative Framework</p>
              <Select value={narrative} onChange={setNarrative} options={[
                'Problem — Solution — Result',
                'Before — After — Bridge',
                'Hero\'s Journey',
                'Three Act Structure',
                'In Medias Res',
                'The Revelation',
                'The Contrast',
                'The Loop',
                'False Start',
                'The List'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Type of Conflict</p>
              <Select value={conflict} onChange={setConflict} options={[
                'Person vs Self',
                'Person vs Person',
                'Person vs Society',
                'Person vs Nature',
                'Person vs Technology',
                'Person vs Fate',
                'Person vs Unknown'
              ]}/>
            </div>
          </Grid>
        </Section>

        <Section title="Character and World">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Character Archetype</p>
              <Select value={characterType} onChange={setCharacterType} options={[
                'The Everyman',
                'The Hero',
                'The Trickster',
                'The Mentor',
                'The Rebel',
                'The Innocent',
                'The Villain',
                'The Outcast',
                'The Lover',
                'No Character — Narrator Only'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Setting</p>
              <Select value={setting} onChange={setSetting} options={[
                'Everyday Life',
                'Fantasy World',
                'Futuristic',
                'Historical',
                'Nature and Wilderness',
                'Urban City',
                'Supernatural',
                'Abstract and Surreal',
                'Workplace',
                'Domestic Home'
              ]}/>
            </div>
          </Grid>
        </Section>

        <Section title="Hook and Opening">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Hook Type</p>
              <Select value={hook} onChange={setHook} options={[
                'Question Hook',
                'Shocking Statement Hook',
                'Story Drop Hook',
                'Fact Hook',
                'Controversy Hook',
                'Relatability Hook',
                'Fear Hook',
                'Curiosity Gap Hook',
                'Challenge Hook',
                'Confession Hook',
                'Prediction Hook',
                'Myth Busting Hook',
                'Number Hook',
                'Before and After Hook',
                'Pain Point Hook'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Hook Placement</p>
              <Select value={hookPosition} onChange={setHookPosition} options={[
                'First 1 second',
                'First 2 seconds',
                'First 3 seconds',
                'First 5 seconds'
              ]}/>
            </div>
          </Grid>
          <div style={{marginTop:'12px'}}>
            <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Opening Line Style</p>
            <Select value={openingLine} onChange={setOpeningLine} options={[
              'Bold Statement',
              'Rhetorical Question',
              'Shocking Statistic',
              'Provocative Opinion',
              'Direct Address to Viewer',
              'Sound Effect or Action',
              'Silence Then Impact'
            ]}/>
          </div>
        </Section>

        <Section title="Pacing and Rhythm">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Overall Pacing</p>
              <Select value={pacing} onChange={setPacing} options={[
                'Slow and Cinematic',
                'Medium and Conversational',
                'Fast and Punchy',
                'Slow Build to Fast Climax',
                'Fast Open Slow Close',
                'Rhythmic and Musical',
                'Erratic and Chaotic'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Twist or Surprise</p>
              <Select value={twist} onChange={setTwist} options={[
                'Unexpected Reversal',
                'Hidden Information Revealed',
                'Genre Subversion',
                'Fourth Wall Break',
                'Time Jump',
                'Role Reversal',
                'No Twist — Straight Narrative'
              ]}/>
            </div>
          </Grid>
        </Section>

        <Section title="Visual and Audio Direction">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Visual Style</p>
              <Select value={visualStyle} onChange={setVisualStyle} options={[
                'High Contrast Bold Text',
                'Minimal Clean White',
                'Dark Moody Cinematic',
                'Bright Playful Colourful',
                'Vintage and Retro',
                'Neon and Cyberpunk',
                'Nature and Earthy',
                'Black and White'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Caption Style</p>
              <Select value={captionStyle} onChange={setCaptionStyle} options={[
                'Word by Word Pop',
                'Full Sentence Fade',
                'Highlighted Keywords',
                'No Captions',
                'Bottom Third Bar',
                'Animated Typewriter'
              ]}/>
            </div>
          </Grid>
          <Grid style={{marginTop:'12px'}}>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Music Mood</p>
              <Select value={musicMood} onChange={setMusicMood} options={[
                'Upbeat and Energetic',
                'Dark and Tense',
                'Emotional and Cinematic',
                'Funny and Quirky',
                'Lo-Fi and Relaxed',
                'Epic and Powerful',
                'Silence — No Music',
                'Horror Ambient',
                'Romantic and Soft'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Voice Tone</p>
              <Select value={voiceTone} onChange={setVoiceTone} options={[
                'Conversational',
                'Authoritative',
                'Excited and Hyped',
                'Calm and Soothing',
                'Mysterious and Whispery',
                'Comedic',
                'Dramatic',
                'Robotic and Detached',
                'No Voice — Text Only'
              ]}/>
            </div>
          </Grid>
        </Section>

        <Section title="Platform and Distribution">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Target Platform</p>
              <Select value={platform} onChange={setPlatform} options={[
                'Instagram Reels',
                'YouTube Shorts',
                'TikTok',
                'Facebook Reels',
                'LinkedIn Video',
                'Twitter/X Video',
                'All Platforms'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Video Length</p>
              <Select value={length} onChange={setLength} options={[
                '15 seconds',
                '30 seconds',
                '45 seconds',
                '60 seconds',
                '90 seconds'
              ]}/>
            </div>
          </Grid>
        </Section>

        <Section title="Target Audience">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Primary Audience</p>
              <Select value={audience} onChange={setAudience} options={[
                'General Public',
                'Children',
                'Teenagers',
                'Young Adults 18-25',
                'Adults 25-40',
                'Professionals',
                'Entrepreneurs',
                'Parents',
                'Seniors',
                'Niche Community'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Content Pillar</p>
              <Select value={contentPillar} onChange={setContentPillar} options={[
                'Entertainment',
                'Education',
                'Inspiration',
                'Controversy and Opinion',
                'Behind the Scenes',
                'Storytelling',
                'News and Trends',
                'Humour and Satire',
                'Horror and Thriller',
                'Romance and Emotion'
              ]}/>
            </div>
          </Grid>
        </Section>

        <Section title="Engagement and Virality">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Replayability Factor</p>
              <Select value={replayability} onChange={setReplayability} options={[
                'Cliffhanger Ending',
                'Hidden Detail to Spot',
                'Satisfying Loop',
                'Twist That Recontextualises Everything',
                'Quotable Final Line',
                'None'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>Trend Approach</p>
              <Select value={trend} onChange={setTrend} options={[
                'Original Concept',
                'Riding Current Trend',
                'Subverting a Trend',
                'Timeless and Evergreen',
                'News Jacking',
                'Seasonal or Holiday'
              ]}/>
            </div>
          </Grid>
        </Section>

        <Section title="Call To Action">
          <Grid>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>CTA Type</p>
              <Select value={cta} onChange={setCta} options={[
                'Follow For More',
                'Comment Your Thoughts',
                'Share With Someone Who Needs This',
                'Save This Video',
                'Tag a Friend',
                'Visit Link in Bio',
                'Answer This Question',
                'Duet or Stitch This',
                'No Call To Action'
              ]}/>
            </div>
            <div>
              <p style={{color:'#888',fontSize:'12px',marginBottom:'6px'}}>CTA Placement</p>
              <Select value={ctaPlacement} onChange={setCtaPlacement} options={[
                'Final 3 seconds',
                'Final 5 seconds',
                'Midpoint and End',
                'Throughout Video',
                'Opening Tease'
              ]}/>
            </div>
          </Grid>
        </Section>

        <button
          onClick={handleGenerate}
          style={{display:'block',width:'100%',padding:'20px',backgroundColor:'#ff6b35',border:'none',borderRadius:'10px',color:'white',fontSize:'20px',fontWeight:'bold',cursor:'pointer',letterSpacing:'1px',marginTop:'10px'}}
        >
          Generate Video
        </button>

        <div style={{marginTop:'32px',padding:'20px',backgroundColor:'#2a2a2a',borderRadius:'8px'}}>
          <h3 style={{margin:'0 0 8px 0',fontSize:'16px'}}>Queue Status</h3>
          <p style={{margin:0,color:'#666',fontSize:'14px'}}>No videos in queue yet. Generate your first reel above.</p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
