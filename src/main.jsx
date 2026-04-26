import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{
      backgroundColor: '#0f0f0f',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ color: '#ff6b35' }}>ReelForge</h1>
      <p>AI Powered Video Generation Tool</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
