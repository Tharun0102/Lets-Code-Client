import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Project from '../../components/Projects/Project';
import * as api from '../../api';
import Modal from '../../components/Modal/Modal.js';
import * as userActions from '../../redux/actions/User';

import './CollectionList.css';
import './projectModal.css';
import './deleteModal.css';

const defaultProjectState = { name: '', type: 'java', isFav: false, error: '' };

export default function CollectionList() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails);
  const [addModal, setAddModal] = useState(false);

  const [projectData, setProjectData] = useState(defaultProjectState);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getProjects = () => {
      setLoading(true);
      api.getUserProjects({ id: user.id })
        .then((res) => {
          setLoading(false);
          dispatch(userActions.INIT_PROJECTS(res.data));
        })
        .catch(error =>
          console.log(error)
        )
    }
    getProjects();
  }, [])


  const openAddModal = () => {
    setAddModal(true);
  }

  const closeAddModal = () => {
    setProjectData(defaultProjectState);
    setAddModal(false);
  }


  const addProjectHandler = async (e) => {
    e.preventDefault();
    console.log(projectData);
    if (projectData.name === '') {
      setProjectData({ ...projectData, error: 'name cannot be empty!' });
      return;
    }
    const isNameTaken = user.projects.filter(p => (p !== null && p.name === projectData.name)).length > 0;
    if (isNameTaken) {
      setProjectData({ ...projectData, error: 'name is taken!' });
      return;
    }

    const res = await api.createProject({ ...projectData, userId: user.id });

    dispatch(userActions.ADD_PROJECT(res.data));
    closeAddModal();
  }



  return (
    <div className="folder-list">

      { addModal && <Modal
        show={addModal}
        onCancel={closeAddModal}
        footer={<React.Fragment>
          <button onClick={addProjectHandler}>ADD</button>
          <button onClick={closeAddModal}>CANCEL</button>
        </React.Fragment>
        }
        header="Add Project"
      >
        <input
          placeholder="name"
          value={projectData.name}
          onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
        />
        {projectData.error !== '' && <span style={{ color: 'red' }}>{projectData.error}</span>}
        <select
          onChange={(e) => setProjectData({ ...projectData, type: e.target.value })}
          placeholder="language"
          defaultValue="java"
        >
          <option>java</option>
          <option>python</option>
        </select>
      </Modal>
      }

      <div className="header">
        <h2 className="title">{`${user.name}'s Projects`}</h2>
        <button onClick={openAddModal}>ADD</button>
      </div>
      {Loading && <span style={{ fontSize: '30px' }}>Loading...</span>}

      {
        user.projects.map(project => {
          if (!project) return <span></span>
          return <Project
            project={project}
            key={project._id}
          />
        })
      }
    </div>
  )
}



