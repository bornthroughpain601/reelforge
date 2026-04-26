import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{backgroundColor:'#0f0f0f',minHeight:'100vh',color:'white',fontFamily:'Arial'}}>
      <nav style={{backgroundColor:'#1a1a1a',padding:'20px 40px',borderBottom:'1px solid #333'}}>
        <h1 style={{margin:0,color:'#ff6b35'}}>ReelForge</h1>
      </nav>
      <div style={{maxWidth:'600px',margin:'60px auto',padding:'40px',backgroundColor:'#1a1a1a',borderRadius:'12px'}}>
        <h2>Generate Your Reel</h2>
        <p>Topic:</p>
        <input type="text" placeholder="e.g. cat explains quantum physics" style={{width:'100%',padding:'12px',backgroundColor:'#2a2a2a',border:'1px solid #444',borderRadius:'8px',color:'white',fontSize:'16px',boxSizing:'border-box'}}/>
        <p>Style:</p>
        <select style={{width:'100%',padding:'12px',backgroundColor:'#2a2a2a',border:'1px solid #444',borderRadius:'8px',color:'white',fontSize:'16px'}}>
          <option>Doodle</option>
          <option>Faceless</option>
          <option>Character</option>
        </select>
        <p>Tone:</p>
        <select style={{width:'100%',padding:'12px',backgroundColor:'#2a2a2a',border:'1px solid #444',borderRadius:'8px',color:'white',fontSize:'16px'}}>
          <option>Funny</option>
          <option>Serious</option>
          <option>Educational</option>
        </select>
        <br/><br/>
        <button style={{width:'100%',padding:'16px',backgroundColor:'#ff6b35',border:'none',borderRadius:'8px',color:'white',fontSize:'18px',fontWeight:'bold',cursor:'pointer'}}>
          Generate Video
        </button>
      </div>
    </div>
  )
}
