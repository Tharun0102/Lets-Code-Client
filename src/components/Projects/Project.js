import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Project.css';
import Modal from '../Modal/Modal';
import * as api from '../../api';
import * as userActions from '../../redux/actions/User';

function Project(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails);
  const [deleteModal, setDeleteModal] = useState(false);

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

  const deleteProjectHandler = async (e) => {
    await api.deleteProject({ id: user.id, projectId: props.project._id });
    dispatch(userActions.DELETE_PROJECT({ _id: props.project._id }));
    closeDeleteModal();
  }

  const goToProject = () => {
    dispatch({ type: 'SET_PROJECT', payload: { _id: props.project._id } })
  }

  return <React.Fragment>
    {deleteModal && <Modal
      show={deleteModal}
      onCancel={closeDeleteModal}
      footer={<React.Fragment>
        <button onClick={deleteProjectHandler}>DELETE</button>
        <button onClick={closeDeleteModal}>CANCEL</button>
      </React.Fragment>
      }
      header="Delete Project"
    >
      <p style={{ fontSize: '25px' }}>Are you sure you want to delete?</p>

    </Modal>
    }
    <div className="project">
      <Link className="project-title" to={`/projects/${props.project.name}`}>
        <div onClick={goToProject} >{props.project.name}</div>
      </Link>
      <div className="project-controls">
        <div onClick={toggleFavourite}>{props.project.isFav ? "💘" : "❤️"}</div>
        <div onClick={openDeleteModal}>❌</div>
      </div>
    </div >
  </React.Fragment>
}


export default Project;

