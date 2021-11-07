import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as judge from '../../api/judge0';
import * as api from '../../api';
import MonacoEditor from "@monaco-editor/react";
import Button from '@mui/material/Button';

import './Editor.scss'
import { SET_FILE } from "../../redux/actions/Files";

export default function Editor(props) {
  const { setOutputLoading, setOutput } = props;
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const user = useSelector(state => state.userDetails);
  const activeState = useSelector(state => state.active);

  useEffect(()=>{
    dispatch(SET_FILE(null));
  },[])

  useEffect(() => {
    refreshEditor();
  }, [activeState.fileId]);

  const getType = async () => {
    const project = await api.getProjectById({ userId: user.id, projectId: activeState.projectId });
    return project?.data?.type;
  }
  const runCodeHandler = async () => {
    setOutputLoading(true);
    const languageType = await getType();
    const res = await judge.run(languageType, editorRef.current?.getValue(), props.input);
    setOutput(res)
    setOutputLoading(false);
  }

  const handleEditorDidMount = async (editor) => {
    editorRef.current = editor;
    refreshEditor();
  }
  const refreshEditor = async () => {
    const file = await api.getFile({
      id: user.id,
      projectId: activeState.projectId,
      _id: activeState.fileId
    })
    if (file.data) {
      editorRef.current?.setValue(file.data.body);
    }
  }

  const saveCodeHandler = () => {
    setSaving(true);
    api.updateFile({
      id: user.id,
      projectId: activeState.projectId,
      _id: activeState.fileId,
      data: editorRef.current?.getValue()
    })
      .then(() => {
        setSaving(false);
      })
      .catch(err =>{
        setSaving(false);
        console.error(err)
      })
  }

  const handleChange = () => {

  }


  return (
    <>
      {activeState.fileId === null &&
        <div className="default-editor-window">
          click on a file to open it!
        </div>
      }
      {activeState.fileId !== null &&
        <div className="editor">

          <MonacoEditor
            height="calc(100vh - 60px)"
            theme="vs-dark"
            defaultLanguage="python"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            onChange={handleChange}
          />
          <div className="editor-menu">
            <Button 
              variant="contained"
              onClick={saveCodeHandler} 
              disabled={saving}
              className="save-btn"
              color="primary"
            >
              {saving ? "saving.." : "save"}
            </Button>
            <Button 
              variant="contained"
              onClick={runCodeHandler} 
              className="run-btn"
              color="primary"
            >
              Run
            </Button>
          </div>
        </div>
      }
    </>
  );
}





