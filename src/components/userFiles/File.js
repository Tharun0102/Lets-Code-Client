import React, { useState } from 'react';
// import FileOptions from './FileOptions';
import Modal from '../Modal/Modal';
import * as api from '../../api';
import { useSelector, useDispatch } from 'react-redux';

import './file.css';

export default function File(props) {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState('');
  const [renameActive, setRenameActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggle = () => setShowOptions(!showOptions);
  const user = useSelector(state => state.userDetails)
  const activeState = useSelector(state => state.active)
  const dispatch = useDispatch();

  const renameHandler = () => {
    setRenameActive(true);
    setShowOptions(false);
  }
  const openDeleteModal = () => {
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
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
    <React.Fragment>
      {deleteModal && <Modal
        show={deleteModal}
        onCancel={closeDeleteModal}
        footer={<React.Fragment>
          <button onClick={deleteHandler}>DELETE</button>
          <button onClick={closeDeleteModal}>CANCEL</button>
        </React.Fragment>
        }
        header="Delete File"
      >
        <p style={{ fontSize: '25px' }}>Are you sure you want to delete?</p>

      </Modal>
      }
      <div
        className="file"
        style={{ backgroundColor: (props.file._id === activeState.fileId) ? 'darkslateblue' : 'inherit', padding: '0 .3rem', color: 'white' }}
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
          <div onClick={openDeleteModal}>❌</div>

          {/* for multiple options like rename */}
          {/* <button onClick={toggle} >
          op
        </button> */}
          {/* {showOptions &&
          <FileOptions
            show={showOptions}
            setShowOptions={setShowOptions}
            renameHandler={renameHandler}
            deleteHandler={deleteHandler}
          />
        } */}
        </div>
      </div >
    </React.Fragment>
  )
}
