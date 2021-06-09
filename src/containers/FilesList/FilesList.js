import React, { useEffect, useState } from 'react'
import UserFiles from '../../components/userFiles/UserFiles';
import * as api from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/Modal/Modal';
import { useSelector } from 'react-redux';

export default function FilesList(props) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileModal, setFileModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fetchFiles, setFetchFiles] = useState(true);
  const user = useSelector(state => state.userDetails);

  useEffect(() => {
    setLoading(true);
    api.getProjectFiles({ _id: props.projectId })
      .then((res) => {
        console.log(res.data);
        Promise.all(res.data.map(async (fileId) => {
          const res = await api.getFile({ id: user.id, projectId: props.projectId, _id: fileId });
          return res.data;
        })).then((FILES) => {
          console.log(FILES);
          setFiles(FILES);
          setLoading(false);
        })
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }, [fetchFiles]);

  const openFileModal = () => {
    setFileModal(true);
  }
  const closeFileModal = () => {
    setFileModal(false);
  }
  const addFile = async () => {
    const res = await api.createFile({ id: user.id, projectId: props.projectId, name: fileName });
    console.log(res.data);
    setFiles([...files, res.data]);
    closeFileModal();
  }

  return (
    <div className="files-list">
      {fileModal && <Modal
        show={fileModal}
        onCancel={closeFileModal}
        footer={<React.Fragment>
          <button onClick={addFile}>ADD</button>
          <button onClick={closeFileModal}>CANCEL</button>
        </React.Fragment>
        }
        header="Add File"
      >
        <input
          placeholder="name"
          type="text"
          onChange={(e) => setFileName(e.target.value)}
          value={fileName}
        />
      </Modal>
      }
      {loading && <LoadingSpinner />}
      {!loading && <UserFiles
        title={props.name}
        files={files}
        createFileHandler={openFileModal}
        setFetchFiles={setFetchFiles}
      />}
    </div>
  )
}
