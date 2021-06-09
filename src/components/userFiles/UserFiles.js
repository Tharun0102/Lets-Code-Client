import React, { useState } from 'react';
import File from './File';
import './userFiles.css';

export default function UserFiles(props) {

  return (
    <div className="user-files-container">
      <h2 style={{
        color: 'white',
        padding: '.5rem',
        marginBottom: '.2rem',
        backgroundColor: 'darkslateblue'
      }}>
        {props.title}
      </h2>
      <div className="user-files-header">
        <h2>Files</h2>
        <button onClick={props.createFileHandler}>ADD</button>
      </div>
      <div className="user-files-content">
        {props.files &&
          props.files.map(file => <File setFetchFiles={props.setFetchFiles} file={file} key={file.name} />)
        }
      </div>
    </div>
  )
}
