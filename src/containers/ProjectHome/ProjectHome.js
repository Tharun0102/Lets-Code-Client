import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Console from '../../components/console/Console';
import Editor from '../../components/Editor/Editor';
import FilesList from '../FilesList/FilesList';

import './ProjectHome.css';


export default function ProjectHome() {
  const { projectId } = useParams()
  const user = useSelector(state => state.user)
  return (
    <div className="project-home">
      <FilesList />
      <Editor />
      <Console />
    </div>
  )
}
