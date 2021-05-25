import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Project.css';

function Project(props) {
  const dispatch = useDispatch();
  return (
    <div className="project">

      <div className="project-title"><Link to={`/${props.project.id}`}>{props.project.name}</Link></div>

      <div className="project-controls">
        <div onClick={() => { console.log(`dispatching ${props.project.id}`); dispatch({ type: 'STAR', id: props.project.id }) }}>{props.starred ? "💘" : "❤️"}</div>
        <div>❌</div>
      </div>
    </div >
  )
}


export default Project;

