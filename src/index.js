import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import App from './draggable and droppable App/App';
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
// yarn json-server --watch db.json --port 3004