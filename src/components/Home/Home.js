import React, { useEffect } from 'react';
import CollectionList from '../../containers/CollectionList/CollectionList';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../api';

import './home.css';


export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails)

  useEffect(() => {
    const get = async () => {
      console.log(user);
      const fetched = await api.getUser({ name: user.name, email: user.email });
      if (fetched && fetched.data !== '') {
        console.log("home");
        dispatch({
          type: 'SIGN_IN',
          payload: fetched.data
        });
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
