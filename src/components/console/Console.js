import React, { useEffect } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Console.scss';
import Input from './Input';
import Box from '@mui/material/Box';

export default function Console(props) {
  const { outputLoading, output } = props;
  useEffect(() => {
    props.setInput('');
  }, [])
  return (
    <Box className="console">
      <Box className="output">
        <Box className="title">console</Box>
        <pre className="output-content">
          {outputLoading && <LoadingSpinner />}
          {!outputLoading && output?.compile_output &&
            <div>
              compile result: {output?.compile_output}
            </div>}
          {!outputLoading && output?.status?.description === 'Accepted' &&
            <div>
              <div>{output?.stdout}</div>
              <div className="run-time">
                <div>Finished in {output?.time}s</div>
              </div>
            </div>
          }
          {!outputLoading && output?.status?.description !== 'Accepted' &&
            <div>
              <div>{output?.status?.description}</div>
            </div>
          }
        </pre>
      </Box>
      <Input
        input={props.input}
        setInput={props.setInput}
      />
    </Box >
  )
}
