import React, { useState } from 'react';
import FileOptions from './FileOptions';
import * as api from '../../api';
import { useSelector, useDispatch } from 'react-redux';

import './file.css';

export default function File(props) {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState('');
  const [renameActive, setRenameActive] = useState(false);
  const toggle = () => setShowOptions(!showOptions);
  const user = useSelector(state => state.userDetails)
  const activeState = useSelector(state => state.active)
  const dispatch = useDispatch();

  const renameHandler = () => {
    setRenameActive(true);
    setShowOptions(false);
  }
  const deleteHandler = async () => {
    await api.deleteFile({
      id: user.id,
      projectId: activeState.projectId,
      fileId: props.file._id
    }).catch(err => console.error(err));
    setShowOptions(false);
    props.setFetchFiles(prev => !prev);
    dispatch({ type: 'SET_FILE', payload: { _id: null } })
  }

  const selectFile = () => {
    dispatch({ type: 'SET_FILE', payload: { _id: props.file._id } });
  }

  return (
    <div
      className="file"
      style={{ backgroundColor: (props.file._id === activeState.fileId) ? 'red' : 'inherit' }}
    >
      <div
        className="left"
        contentEditable={renameActive}
        onChange={(e) => setName(e.target.value)}
        onClick={selectFile}
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
    </div >
  )
}
