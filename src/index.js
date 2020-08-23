import React, { useState, useEffect } from 'react'
import Scanner from './components/Scanner'
import ReactDOM from 'react-dom'

import superagent from 'superagent'

import './styles.css'

function App() {
  const [camera, setCamera] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const _getBookValue = async () => {
      const bookValue = await superagent.get(
        `http://localhost:5000/getBarcode/${result}`
      )
      console.log(bookValue)
    }

    if (result) {
      _getBookValue()
    }
  }, [result])

  const onDetected = (result) => {
    setResult(result)
  }

  return (
    <div className='App'>
      <p>{result ? result : 'Scanning...'}</p>
      <button onClick={() => setCamera(!camera)}>
        {camera ? 'Stop' : 'Start'}
      </button>
      <div className='container'>
        {camera && <Scanner onDetected={onDetected} />}
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
