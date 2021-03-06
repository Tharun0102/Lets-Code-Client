import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Project from '../../components/Projects/Project';
import * as api from '../../api';
import { ADD_PROJECT, INIT_PROJECTS } from '../../redux/actions/Projects';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import cogoToast from 'cogo-toast';
import CircularProgress from '@mui/material/CircularProgress';
import './CollectionList.scss';
import './projectModal.css';
import './deleteModal.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Typography from '@mui/material/Typography';
import EmptyBox from '../../Utils/EmptyBox/EmptyBox';

const defaultProjectState = { name: '', type: 'C', isFav: false, error: '' };

export default function CollectionList() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails);
  const [addModal, setAddModal] = useState(false);

  const languages = ["C", "C++", "Java", "JavaScript", "Python"];
  const [projectData, setProjectData] = useState(defaultProjectState);
  const [Loading, setLoading] = useState(false);
  const [addingProject, setAddingProject] = useState(false);


  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      api.getUserProjects({ id: user.id })
        .then((res) => {
          const projects = res.data.filter(p => p !== null)
          dispatch(INIT_PROJECTS(projects));
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false)
        })

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
    if (projectData.name.length <= 2 || projectData.name.length >= 30) {
      setProjectData({ ...projectData, error: 'name length must be in between 3 and 30!' });
      return;
    }
    const isNameTaken = user.projects.filter(p => (p !== null && p.name === projectData.name)).length > 0;
    if (isNameTaken) {
      setProjectData({ ...projectData, error: 'name is taken!' });
      return;
    }
    setAddingProject(true);
    try {
      const res = await api.createProject({ ...projectData, userId: user.id });
      cogoToast.success('project added!');
      dispatch(ADD_PROJECT(res.data));
      setAddingProject(false);
      closeAddModal();
    } catch (err) {
      cogoToast.error('Failed to add the project, try again!');
      setAddingProject(false);
      console.warn(err);
      closeAddModal();
    }
  }



  return (
    <div className="folder-list">

      {addModal && <Modal
        open={addModal}
        onClose={closeAddModal}
        className="modal-style"
      >
        <Box className="add-modal">
          <Box className="input-container">
            <Typography className="label-text">Name:</Typography>
            <TextField
              value={projectData.name}
              variant="outlined"
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              className="input-field"
            />
          </Box>
          {projectData.error !== '' && <span style={{ color: 'red', fontSize: '12px' }}>*{projectData.error}</span>}
          <Box className="input-container">
            <Typography className="label-text">Language:</Typography>
            <Select
              onChange={(e) => setProjectData({ ...projectData, type: e.target.value })}
              value={projectData.type}
              placeholder="language"
              defaultValue="java"
              className="select-dropdown"
            >
              {
                languages.map((language) => <MenuItem value={language}>{language}</MenuItem>)
              }
            </Select>
          </Box>

          <Box className="modal-footer">
            <Button
              onClick={closeAddModal}
              variant="outlined"
              className="cancel-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={addProjectHandler}
              variant="contained"
              className="confirm-btn"
              disabled={addingProject}
            >
              {addingProject ? <CircularProgress size={20} /> : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
      }

      <div className="header">
        <h2 className="title">{`${user.name}'s Projects`}</h2>
        <Button
          variant="contained"
          onClick={openAddModal}
          color="primary"
          className="add-btn"
        >
          ADD
        </Button>
      </div>
      <Box className="projects-list">
        {Loading && <LoadingSpinner />}
        {!Loading &&
          user.projects.map((project, index) => {
            if (!project) return <span></span>
            return <Project
              project={project}
              key={index}
            />
          })
        }
        {!Loading && user.projects.length === 0 &&
          <EmptyBox type="Project" />
        }
      </Box>
    </div>
  )
}



