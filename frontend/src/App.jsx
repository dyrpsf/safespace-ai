import { useState } from 'react'

function App() {
  const [location, setLocation] = useState('')
  const [hour, setHour] = useState(23)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showRoute, setShowRoute] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null) // 🛡️ New Error State

  const handleVibeCheck = async () => {
    if (!location) return alert("Please enter a location!")
    
    setLoading(true)
    setShowRoute(false) 
    setResult(null)
    setErrorMsg(null) // Clear old errors
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/vibe-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: location, hour_of_day: Number(hour) })
      })
      
      const data = await response.json()

      // 🛑 Catch the FastAPI Rejection
      if (!response.ok) {
        setErrorMsg(data.detail)
        setLoading(false)
        return
      }
      
      setResult(data)
      
      setTimeout(() => {
        setShowRoute(true)
      }, 800)

    } catch (error) {
      console.error("Connection error:", error)
      setErrorMsg("Make sure your Python backend is running!")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
        
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-2">SafeSpace AI</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">Context-Aware Predictive Safety</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Where are you going?</label>
            <input 
              type="text" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. VIT Bhopal, Delhi..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Time of Travel: {hour}:00
            </label>
            <input 
              type="range" 
              min="0" max="23" 
              className="w-full accent-blue-500"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
          </div>

          <button 
            onClick={handleVibeCheck}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform active:scale-95 mt-4"
          >
            {loading ? "Analyzing Context..." : "Run Vibe Check 🧠"}
          </button>
          
          {/* 🛡️ Display Errors Here */}
          {errorMsg && (
            <div className="mt-2 text-center text-red-400 text-sm p-2 bg-red-900/20 border border-red-800 rounded-lg">
              ⚠️ {errorMsg}
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 p-5 bg-gray-700 rounded-lg border border-gray-600 animate-pulse-once">
            <h2 className="text-xl font-bold mb-2">
              Risk Level: 
              <span className={
                result.risk_level === 'High' ? 'text-red-400 ml-2' : 
                result.risk_level === 'Medium' ? 'text-yellow-400 ml-2' : 'text-green-400 ml-2'
              }>
                {result.risk_level} ({result.risk_score_percentage}%)
              </span>
            </h2>
            <div className="bg-gray-800 p-3 rounded text-sm text-gray-300 border-l-4 border-blue-500 leading-relaxed">
              <strong>AI Insight:</strong> {result.explanation}
            </div>
          </div>
        )}

        {/* Safe Route Module (Simulated) */}
        {showRoute && result && (
          <div className="mt-4 p-5 bg-gray-800 rounded-lg border border-gray-700 shadow-inner">
            <h3 className="text-md font-bold mb-3 text-gray-200 flex items-center">
              <span className="mr-2">🛣️</span> Route Analysis Complete
            </h3>
            
            <div className="space-y-3">
              <div className={`p-3 border rounded flex justify-between items-center ${result.risk_level === 'Low' ? 'bg-green-900/20 border-green-800' : 'bg-red-900/20 border-red-800'}`}>
                <div>
                  <p className={`font-semibold ${result.risk_level === 'Low' ? 'text-green-400' : 'text-red-400'}`}>Default Route</p>
                  <p className="text-xs text-gray-400">Direct Path • 12 mins</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${result.risk_level === 'Low' ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}>
                    Risk: {result.risk_level}
                  </span>
                </div>
              </div>

              {result.risk_level !== 'Low' && (
                <div className="p-3 bg-green-900/30 border border-green-700 rounded flex justify-between items-center border-l-4 border-l-green-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10">
                    <p className="font-semibold text-green-400 flex items-center">
                      SafeSpace Alternative ✨
                    </p>
                    <p className="text-xs text-gray-400">Well-Lit Path • 15 mins</p>
                  </div>
                  <div className="text-right relative z-10">
                    <span className="text-xs font-bold bg-green-800 text-green-200 px-2 py-1 rounded">
                      Risk: Low
                    </span>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center italic">
              *Demo environment: Simulating alternative secure routing.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App