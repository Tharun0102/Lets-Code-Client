import React, { useEffect } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Console.css';
import Input from './Input';

export default function Console(props) {
  const { outputLoading, output } = props;
  useEffect(() => {
    props.setInput('');
  }, [])
  return (
    <div className="console">
      <div className="output">
        <h2>console</h2>
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
      </div>
      <Input
        input={props.input}
        setInput={props.setInput}
      />
    </div >
  )
}
