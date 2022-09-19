import React, { useContext, useState } from 'react';
// Package
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Component
import UserContext from '../../Context/Auth';

/**
 *
 * @returns
*/
const Login = () => {
  // useNavigate is used to redirect the page
  const navigate = useNavigate();

  // setUserData storing the datails of login user
  const { setUserData } = useContext(UserContext);
//  console.log(setUserData);
  // user state to store the login user's detail
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  /**
     * on change event this function will handle the changes of input boxes.
     * @param {Object} event
     * setUser function is used to update the current state's value through below process.
    */
  const inputHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  /**
     * on submit event submitLoginForm () will be execute and set user state data in setUserData.
     * @param {object} event
    */
  const submitLoginForm = async (event) => {
    event.preventDefault();
    await axios.get('http://localhost:3004/users').then((res) => {
      const userList = res.data;
      const method = userList.find((o) => o.email === user.email && o.password === user.password);
      setUserData(method);
      setUser({ ...user, email: '', password: '' });
      navigate('/home');
    });
  };

  // return Function
  return (
    <div>
      <h1 className="mt-5">USER LOGIN</h1>

      {/* User Login Form */}
      <form className="container mt-5 bg-light" action="" onSubmit={submitLoginForm} style={{ width: '500px', fontSize: '21px', textAlign: 'left' }}>

        {/* User Email */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            value={user.email}
            onChange={inputHandler}
          />
        </div>

        {/* User Password */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={user.password}
            onChange={inputHandler}
          />
        </div>

        {/* Login Button  */}
        <button type="submit" className="btn btn-info mt-3 mx-5">Login</button>
       <Link to="/signup"><button type="submit" className="btn btn-info mt-3 mx-5">Signup</button></Link>
      </form>
    </div>
  );
};
export default Login;
