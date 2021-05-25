import React from 'react';
import { useSelector } from 'react-redux';
import Project from '../../components/Projects/Project';
import './CollectionList.css';



export default function CollectionList() {
  // const Collections = useSelector(state => state.state);
  const Collections = [
    {
      id: 1,
      name: 'Project1',
      starred: false,
      fileList: []
    },
    {
      id: 2,
      name: 'Project2',
      starred: false,
      fileList: []
    }
  ];
  return (
    <div className="folder-list">
      <h2 className="title">Your Collections</h2>
      {
        Collections.map(project => <Project project={project} key={project.id} />)
      }
    </div>
  )
}
