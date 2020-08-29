import React, { useState, useEffect } from 'react'
import Scanner from './components/Scanner'
import ReactDOM from 'react-dom'

import superagent from 'superagent'

import './styles.css'

const API_URL = process.env.API_URL || 'http://localhost:5000'

function App() {
  const [camera, setCamera] = useState(false)
  const [result, setResult] = useState(null)
  const [bookValue, setBookValue] = useState('')

  useEffect(() => {
    const _getBookValue = async () => {
      console.log(API_URL)
      const {
        body: { book_value },
      } = await superagent.get(`${API_URL}/getBarcode/${result}`)

      setBookValue(book_value)
      console.log(book_value)
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
      <hr width='1' />
      <p>{bookValue}</p>
      <button onClick={() => setCamera(!camera)}>
        {camera ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setResult(null)}>reset</button>
      <div className='container'>
        {camera && <Scanner onDetected={onDetected} />}
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
