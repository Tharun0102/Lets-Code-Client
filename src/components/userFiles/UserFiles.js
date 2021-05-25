import React from 'react';
import File from './File';
import './userFiles.css';

export default function UserFiles(props) {


  return (
    <div className="user-files-container">
      <div className="user-files-header">
        <h2>Files</h2>
        <div onClick={props.createFileHandler}>Fi</div>
        <div>Fo</div>
      </div>
      <div className="user-files-content">
        {
          props.files.map(file => <File file={file} />)
        }
      </div>
    </div>
  )
}
