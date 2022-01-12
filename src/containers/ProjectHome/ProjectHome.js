import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Console from '../../components/console/Console';
import Editor from '../../components/Editor/Editor';
import Header from '../../components/Header/Header';
import FilesList from '../FilesList/FilesList';
import useMediaQuery from '../../Utils/useMediaQuery.jsx';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './ProjectHome.scss';

export default function ProjectHome() {
  const mobileView = useMediaQuery('(max-width:700px)');
  const { projectId } = useParams();
  const activeState = useSelector(state => state.active);
  const [output, setOutput] = useState({});
  const [outputLoading, setOutputLoading] = useState(false);
  const [input, setInput] = useState('');
  const [showFiles, setShowFiles] = useState(false);
  const [mobileVisibility, setMobileVisibility] = useState('editor');

  const handleShowFiles = () => {
    setShowFiles(true)
  }
  useEffect(() => {
    setShowFiles(false)
  }, [activeState.fileId])

  if (mobileView) {
    return (
      <>
        <Header />
        {showFiles && <Modal
          open={showFiles}
          onClose={() => setShowFiles(false)}
        >
          <Box className='files-modal'>
            <div className='files-modal-content'>
              <FilesList
                projectId={activeState.projectId}
                name={projectId}
              />
            </div>
          </Box>
        </Modal>}
        <Box className="mobile-wrapper">
          {mobileVisibility === 'editor' &&
            <Editor
              setOutput={setOutput}
              setOutputLoading={setOutputLoading}
              input={input}
              mobileView
              handleShowFiles={handleShowFiles}
              setMobileVisibility={setMobileVisibility}
            />
          }
          {mobileVisibility === 'console' &&
            <Console
              output={output}
              outputLoading={outputLoading}
              input={input}
              setInput={setInput}
            />
          }
          <Box display="flex" justifyContent="space-between" className="mobile-footer">
            <div className='footer-btn' onClick={() => setShowFiles(true)}>All Files</div>
            <div className='footer-btn' onClick={() => setMobileVisibility('editor')}>Editor</div>
            <div className='footer-btn' onClick={() => setMobileVisibility('console')}>Console</div>
          </Box>
        </Box>
      </>
    )
  }

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
