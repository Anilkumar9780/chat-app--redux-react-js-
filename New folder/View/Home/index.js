// package
import React from 'react';

// Image
import image1 from './image1.png';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @returns node
 * Method to show first page after user login
 */
const Home = () => (
  <div className="fixed-top bg-dark" style={{ width: '100%', height: '100%', marginTop: '100px' }}>
    <div className="App ">
      <img
        className="homeImage"
        src={image1}
        alt=""
      />
      <h1 className="text-light" style={{ paddingTop: '60px', fontSize: '150px' }}>Welcome To Chat App</h1>
    </div>
  </div>
);
export default Home;
