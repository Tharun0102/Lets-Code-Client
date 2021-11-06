import React from 'react';
import File from './File';
import AddBoxIcon from '@mui/icons-material/AddBox';
import './userFiles.css';
import EmptyBox from '../../Utils/EmptyBox/EmptyBox';

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
        <div onClick={props.createFileHandler} className="add-icon"><AddBoxIcon /></div>
      </div>
      <div className="user-files-content">
        {props?.files?.length > 0 &&
          props?.files?.map(file => <File setFetchFiles={props.setFetchFiles} file={file} key={file.name} />)
        }
        {props?.files?.length === 0 &&
          <EmptyBox type="File" />
        }
      </div>
    </div>
  )
}
