import { render } from '@testing-library/react';
import React from 'react'
import UserFiles from '../../components/userFiles/UserFiles';

const FILES = [
  {
    "name": "main.java",
    'data': "hello java",
    "editing": false
  },
  {
    "name": "main.c",
    'data': "hello c",
    "editing": false
  }
];

export default function FilesList() {

  const createFileHandler = () => {
    FILES.push(
      {
        name: "",
        data: "new File!",
        editing: true
      }
    );
    render();
  }

  return (
    <div className="files-list">
      <UserFiles
        files={FILES}
        createFileHandler={createFileHandler}
      />
    </div>
  )
}
