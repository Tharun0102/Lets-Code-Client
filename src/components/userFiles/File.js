import React, { useState } from 'react';
import FileOptions from './FileOptions';
import * as api from '../../api';
import { useSelector } from 'react-redux';

import './file.css';

export default function File(props) {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState('');
  const [renameActive, setRenameActive] = useState(false);
  const toggle = () => setShowOptions(!showOptions);
  const user = useSelector(state => state.userDetails)
  const activeState = useSelector(state => state.active)

  const renameHandler = () => {
    setRenameActive(true);
    setShowOptions(false);
  }
  const deleteHandler = async () => {
    await api.deleteFile({ id: user.id, projectId: activeState.projectId, fileId: props.file._id }).catch(err => console.error(err));
    setShowOptions(false);
    props.setFetchFiles(prev => !prev);
  }

  return (
    <div className="file"    >
      <p>{name}</p>
      <div
        className="left"
        contentEditable={renameActive}
        onChange={(e) => setName(e.target.value)}
        value={name}
      >
        {props.file.name}
      </div>
      <div className="right">
        <button onClick={toggle} >
          op
      </button>
        {showOptions &&
          <FileOptions
            show={showOptions}
            setShowOptions={setShowOptions}
            renameHandler={renameHandler}
            deleteHandler={deleteHandler}
          />
        }
      </div>
    </div>
  )
}
