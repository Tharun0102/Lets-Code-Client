import React, { useEffect } from 'react';
import CollectionList from '../../containers/CollectionList/CollectionList';
import { useSelector } from 'react-redux';
import * as api from '../../api';

import './home.css';
import { updateUser } from '../../redux/actions/User';


export default function Home() {
  const user = useSelector(state => state.userDetails)

  useEffect(() => {
    const get = async () => {
      const fetched = await api.getUser({ name: user.name, email: user.email });
      if (fetched && fetched.data !== '') {
        updateUser(fetched.data);
      }
    }
    get();
  }, []);
  return (
    <div className="home">
      <CollectionList />
    </div>
  )
}
