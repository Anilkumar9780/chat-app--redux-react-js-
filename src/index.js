import React from 'react';
import ReactDOM from 'react-dom/client';

// chating app in redux-reactJS 
// import App from './App'; 
// password Generator
import App from './passwordGenerator/App';
// Note App
// import App from './Note app/App';
// Dreggable and dropable App
// import App from './draggable and droppable App/App';
// import configureStore from './Redux/store';
// import { Provider } from 'react-redux';
// const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>
);
// yarn json-server --watch db.json --port 3004 ( only uesing this sever chat app ) 