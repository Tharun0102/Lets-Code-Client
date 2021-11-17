import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Project.scss';
import Modal from '@mui/material/Modal';
import * as api from '../../api';
import { DELETE_PROJECT, SET_PROJECT } from '../../redux/actions/Projects';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
function Project(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingProject, setDeletingProjecct] = useState(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const toggleFavourite = () => {
    dispatch({ type: 'STAR', payload: { _id: props.project._id } });
    api.toggleFavourite({ id: user.id, projectId: props.project._id });
  }

  const deleteHandler = async (e) => {
    setDeletingProjecct(true);
    try {
      await api.deleteProject({ id: user.id, projectId: props.project._id });
      dispatch(DELETE_PROJECT(props.project._id));
      setDeletingProjecct(false);
      closeDeleteModal();
    } catch (err) {
      setDeletingProjecct(false);
      closeDeleteModal();
    }
  }

  const goToProject = () => {
    dispatch(SET_PROJECT(props.project._id))
  }

  return <React.Fragment>
    {deleteModal && <Modal
      open={deleteModal}
      onClose={closeDeleteModal}
      className="modal-style"
    >
      <Box className="delete-modal" style={{ paddingTop: props?.key === 0 ? '0' : '1rem' }}>
        <Typography className="label-text">Are you sure you want to delete?</Typography>
        <Typography className="modal-content">on confirming, this Project will be deleted permanently</Typography>
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
            {deletingProject ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </Box>
      </Box>
    </Modal>
    }
    <div className="project">
      <Link className="project-title" to={`/projects/${props.project.name}`}>
        <div onClick={goToProject} >{props.project.name}</div>
      </Link>
      <div className="project-controls">
        <div onClick={toggleFavourite}>
          {props.project.isFav ? <StarIcon /> : <StarBorderIcon />}
        </div>
        <div onClick={openDeleteModal}><DeleteTwoToneIcon /></div>
      </div>
    </div >
  </React.Fragment>
}


export default Project;

