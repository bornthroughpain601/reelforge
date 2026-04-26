 import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('Doodle')
  const [tone, setTone] = useState('Funny')

  return (
    <div style={{
      backgroundColor: '#0f0f0f',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <nav style={{
        backgroundColor: '#1a1a1a',
        padding: '20px 40px',
        borderBottom: '1px solid #333'
      }}>
        <h1 style={{ margin: 0, color: '#ff6b35' }}>ReelForge</h1>
      </nav>

      <div style={{
        maxWidth: '600px',
        margin: '60px auto',
        padding: '40px',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px'
      }}>
        <h2 style={{ marginBottom: '30px' }}>Generate Your Reel</h2>

        <div style={{ marginBottom: '20px' }}>
          <label>Topic</label>
          <input
            type="text"
            placeholder="e.g. cat explains quantum physics"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '8px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              boxSizing: 'border-box'
          onClick={() => alert(`Generating ${style} reel about: ${topic}`)}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
