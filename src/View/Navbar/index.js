import React, { useContext } from 'react';
// Package
import { Link, useNavigate } from 'react-router-dom';

// Component
import UserContext from '../../Context/Auth';

/**
 *
 * @returns node
 */
const Navbar = () => {
  // navigate used to redirect page on particular condition.
  const navigate = useNavigate();

  const isLogin = useContext(UserContext);

  // on click logout button it will remove saved data.
  const logoutbtn = () => {
    isLogin.userData = '';
    navigate('/');
  };
  return (
  // Navbar portion
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container">
        {/* Home and Chat Panel */}
        <Link className="navbar-brand " to="/home"></Link>
        {isLogin.userData ? (
          <Link className="btn btn-outline-info btn-lg mx-1" aria-current="page" to="/chat">Start Chat</Link>
        ) :('')}
        <div className="text-info" style={{ marginLeft: '410px', fontSize: '55px' }}>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/*Logout */}
            <li className="nav-item">
              {isLogin.userData ? (
                <button className="btn btn-outline-info btn-lg" aria-current="page"  onClick={logoutbtn}  style={{ marginLeft: '400px' }}>LOGOUT</button>
              ) : ('')} 
            </li>
            <li className="nav-item">
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
