import React, { useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Register from './components/forms/Register'
import ApplyLoan from './components/forms/ApplyLoan';
import './custom.css'
import Login from './components/forms/Login';
import UserContext from './contexts/UserContext';
import Update from './components/forms/Update';
import ProtectedRoute from './components/route/ProtectedRoute';
import LockRoute from './components/route/LockRoute';


const initialState = {
  data: null,
  token: ''
}

function getSessionData(){
  let data = sessionStorage.getItem('user');
  return JSON.parse(data) || initialState
}

function setSessionData(data){
  sessionStorage.setItem('user', JSON.stringify(data))
}


export default function App() {
  const [user, setUser] = useState(getSessionData());
  
  const setUserData = userData => {
    setUser(userData)
    setSessionData(userData)
  }
  const logout = () => {
    sessionStorage.clear()
    setUser(initialState)
  }

  return (
    <UserContext.Provider value={[user, setUserData, logout]}>
      <Layout>
        <LockRoute path='/Login' render={(props) => <Login {...props} />} />
        <LockRoute path='/Register' component={Register} />
        <ProtectedRoute  path='/Home' render={(props) => <Home {...props} />} />
        <ProtectedRoute path='/ApplyLoan' component={ApplyLoan} />
        <ProtectedRoute path='/Update' component={Update}/>
        <ProtectedRoute  exact path='/' render={(props) => <Home {...props} />}  />
      </Layout>
    </UserContext.Provider>
  );
}
