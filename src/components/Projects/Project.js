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

  const deleteProjectHandler = async (e) => {
    await api.deleteProject({ id: user.id, projectId: props.project._id });
    dispatch(userActions.DELETE_PROJECT({ _id: props.project._id }));
    closeDeleteModal();
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
      <p style={{ fontSize: '25px' }}>Are u sure to delete?</p>

    </Modal>
    }
    <div className="project">
      <Link className="project-title" to={`/projects/${props.project._id}`}>{props.project.name}</Link>
      <div className="project-controls">
        <div onClick={() => { dispatch({ type: 'STAR', payload: { _id: props.project._id } }) }}>{props.project.isFav ? "💘" : "❤️"}</div>
        <div onClick={openDeleteModal}>❌</div>
      </div>
    </div >
  </React.Fragment>
}


export default Project;

