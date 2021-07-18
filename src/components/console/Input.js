import React from 'react'

export default function Input({ input, setInput }) {
  return (
    <div className="input">
      <h2>Input</h2>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Input" spellCheck="false" color='white'></textarea>
    </div>
  )
}
