import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Project from '../../components/Projects/Project';
import * as api from '../../api';

import './CollectionList.css';

export default function CollectionList() {
  const user = useSelector(state => state.userDetails);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getProjects = async () => {
      try {
        console.log(user);
        const res = await api.getUserProjects({
          email: user.email,
          name: user.name
        });
        console.log(res);
        setProjects(res);
      } catch (error) {
        console.log(error);
      }
    }
    getProjects();
  }, [user])


  const addProject = () => {

  }
  return (
    <div className="folder-list">
      <div className="header">
        <h2 className="title">{`${user.name}'s Projects`}</h2>
        <button onClick={addProject}>ADD</button>
      </div>
      {projects && projects.length !== 0 &&
        projects.map(project => <Project project={project} key={project.id} />)
      }
    </div>
  )
}
