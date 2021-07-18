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
  const [fileState, setFileState] = useState({ name: '', error: '' });
  const [fetchFiles, setFetchFiles] = useState(true);
  const [projectDetails, setProjectDetails] = useState({});
  const user = useSelector(state => state.userDetails);

  useEffect(() => {
    setLoading(true);
    api.getProjectFiles({ id: user.id, projectId: props.projectId })
      .then((res) => {
        Promise.all(res.data.map(async (fileId) => {
          const res = await api.getFile({ id: user.id, projectId: props.projectId, _id: fileId });
          return res.data;
        })).then((FILES) => {
          setFiles(FILES);
          setLoading(false);
        })
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
    api.getProjectById({
      userId: user.id,
      projectId: props.projectId
    }).then((res) => {
      setProjectDetails(res.data);
    })
  }, [fetchFiles]);

  const openFileModal = () => {
    setFileModal(true);
  }
  const closeFileModal = () => {
    setFileModal(false);
    setFileState({ name: '', errror: '' });
  }
  const addFile = async () => {
    const fileNameExists = files.filter(file => file.name === fileState.name).length > 0;
    if (fileNameExists) {
      setFileState({ ...fileState, error: 'file name exists!' })
      return;
    }
    const res = await api.createFile({ id: user.id, projectId: props.projectId, name: fileState.name, type: projectDetails.type });
    setFiles([...files, res.data]);
    closeFileModal();
  }
  return (
    <div className="files-list" style={{ fontFamily: 'sans-serif' }}>
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
          onChange={(e) => setFileState({ ...fileState, name: e.target.value })}
          value={fileState.name}
        />
        <span style={{ color: 'red' }}>{fileState.error}</span>
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
