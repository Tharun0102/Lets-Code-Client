import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Console from '../../components/console/Console';
import Editor from '../../components/Editor/Editor';
import Header from '../../components/Header/Header';
import FilesList from '../FilesList/FilesList';

import './ProjectHome.css';


export default function ProjectHome() {
  const { projectId } = useParams();
  const activeState = useSelector(state => state.active);
  const [output, setOutput] = useState({});
  const [outputLoading, setOutputLoading] = useState(false);
  const [input, setInput] = useState('2 4')
  return (
    <>
      <Header />
      <div className="project-home">
        <FilesList
          projectId={activeState.projectId}
          name={projectId}
        />
        <Editor
          setOutput={setOutput}
          setOutputLoading={setOutputLoading}
          input={input}
        />
        <Console
          output={output}
          outputLoading={outputLoading}
          input={input}
          setInput={setInput}
        />
      </div>
    </>
  )
}
