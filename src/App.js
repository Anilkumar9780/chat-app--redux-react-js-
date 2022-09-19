// packages
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Login from './View/Login';
import UserContext from './Context/Auth';
import SignUp from './View/SignUp';
import ChatPanel from './View/Dashboard';
import Navbar from './View/Navbar';

// Styles
import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // state to store login user's detail
  const [userData, setUserData] = useState('');

  // useMemo hook to stop the rerendring
  const userAuthData = useMemo(() => ({
    userData, setUserData,
  }),[userData]);
  return (
    <div className="App">

      {/* UserContext.provider using as a wrapper to access
      the props value of this in childrens components . */}

      <UserContext.Provider value={userAuthData}>
        <Router>
          <Navbar />
          <Routes>
            {/* Route path for the components */}
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route exact path="/chat" element={userData ? (<ChatPanel />) : (<Login />)} />
          </Routes>
        </Router>
      </UserContext.Provider>

    </div>
  );
};
export default App;

// yarn json-server --watch db.json --port 3004