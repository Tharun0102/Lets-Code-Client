import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Console from '../../components/console/Console';
import Editor from '../../components/Editor/Editor';
import FilesList from '../FilesList/FilesList';

import './ProjectHome.css';


export default function ProjectHome() {
  const { projectId } = useParams();
  const activeState = useSelector(state => state.active);
  const [output, setOutput] = useState({});
  const [outputLoading, setOutputLoading] = useState(false);
  return (
    <div className="project-home">
      <FilesList
        projectId={activeState.projectId}
        name={projectId}
      />
      <Editor
        setOutput={setOutput}
        setOutputLoading={setOutputLoading}
      />
      <Console
        output={output}
        outputLoading={outputLoading}
      />
    </div>
  )
}
