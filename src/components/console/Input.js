import React from 'react'
import Box from '@mui/material/Box';

export default function Input({ input, setInput }) {
  return (
    <Box className="input">
      <Box className="title">Input</Box>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Input" spellCheck="false" color='white'></textarea>
    </Box>
  )
}
