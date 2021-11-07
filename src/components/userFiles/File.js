import React, { useState } from 'react';
// import FileOptions from './FileOptions';
import * as api from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import './file.scss';
import { SET_FILE } from '../../redux/actions/Files';

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
    dispatch(SET_FILE(null));
  }

  const selectFile = () => {
    dispatch(SET_FILE(props.file._id));
  }

  return (
    <React.Fragment>
      {deleteModal && <Modal
        open={deleteModal}
        onClose={closeDeleteModal}
        className="modal-style"
      >
        <Box className="delete-modal">
          <Typography className="label-text">Are you sure you want to delete?</Typography>
          <Typography className="modal-content">on confirming, this file will be deleted permanently</Typography>
          <Box className="modal-footer">
            <Button
              onClick={closeDeleteModal}
              variant="outlined"
              className="cancel-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteHandler}
              variant="contained"
              className="confirm-btn"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      }
      <div
        className="file"
        style={{ backgroundColor: (props.file._id === activeState.fileId) ? 'darkslateblue' : 'inherit' }}
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
          <div onClick={openDeleteModal}><DeleteIcon /></div>

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
