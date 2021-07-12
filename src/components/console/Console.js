import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function Console(props) {
  const { outputLoading, output } = props;
  console.log(props);
  return (
    <div className="console">
      <h2>console</h2>
      {outputLoading && <LoadingSpinner />}
      {!outputLoading && output?.compile_output !== null &&
        <div>
          compile result: {output?.compile_output}
        </div>}
      {!outputLoading && output?.status?.description === 'Accepted' &&
        <div>
          <div>{output?.stdout}</div>
          <div>Finished in {output?.time}s</div>
        </div>
      }
      {!outputLoading && output?.status?.description !== 'Accepted' &&
        <div>
          <div>{output?.status?.description}</div>
        </div>
      }
    </div >
  )
}
