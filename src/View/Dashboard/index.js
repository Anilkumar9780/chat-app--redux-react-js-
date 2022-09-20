// Pakages
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { useDispatch } from "react-redux";
// Components
import UserContext from '../../Context/Auth';
import { addMessage } from '../../Redux/Action';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';

/**
 * @returns node
 */
const ChatPanel = ({ appState = [], addNewMessage = {} }) => {
  // useContext used
  const isLogin = useContext(UserContext);

  // state to post  data in the form of object in json
  const [user, setUser] = useState({
    comment: '',
    user_id: isLogin.userData.id,
    date: new Date().toLocaleString()
  });
  //  console.log();
  // state handle to save fetch data
  const [posts, setPosts] = useState([]);

  const getData = async() => {
    const responce = await fetch('http://localhost:3004/comments');
    const msg = await responce.json();
    setPosts(msg)
  };

  useEffect(() => {
    getData()
  }, []);
  /**
    * @param {Object} event
    * Method to manage the the input fields changes
    */
  const handleInput = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  /**
    * @param {object} event
    * Method to post user data by hiting API
    */
  const submitComment = (event) => {
    event.preventDefault();
    const message = user;
    axios.post('http://localhost:3004/comments', message).then((res) => {
        getData();
      });
    addNewMessage(message);
    setUser({ ...user, comment: '' });
  };

  // console.log
  return (
    <div>
      <div id="app">
        <div className="container" style={{ marginTop: '80px', marginLeft: '320px' }}>
          <div className="row" id="comment">
            <div className="col-md-12 mx-auto">
              <div className="card">
                <div className="card-header text-center">
                  <b><span>{isLogin.userData.fullname}</span></b>
                </div>
                <div className="card-body chat-care">
                  {posts.map((post) => (
                    <ul className="chat" key={post.id}>
                      {post.user_id === isLogin.userData.id ? (
                        // it's admin detail based on above condition.
                        <li className="admin clearfix">
                          <div className="chat-body clearfix">
                            <div className="header clearfix">
                              <small className="left text-muted">
                                <span className="glyphicon glyphicon-time" />
                                {post.date}
                              </small>
                              {' '}
                              <strong className="right primary-font"> {post.user_id}</strong>
                            </div>
                            <p>
                              {post.comment}
                            </p>
                          </div>
                        </li>
                      ) : (

                        // Your Oponent user detail.
                        <li className="agent clearfix">
                          <div className="chat-body clearfix">
                            <div className="header clearfix">
                              <small className="right text-muted">
                                <span className="glyphicon glyphicon-time" />
                                <strong className="right primary-font"> {post.user_id}</strong>
                              </small>
                            </div>
                            <div className="header clearfix">
                              <small className="right text-muted">
                                <span className="glyphicon glyphicon-time" />
                                {post.date}
                              </small>
                            </div>
                            <p>
                              {post.comment}
                            </p>
                          </div>
                        </li>

                      )}
                    </ul>
                  )
                  )}
                </div>
                <div className="card-footer">
                  <div className="input-group">

                    {/* User Comment Form  */}
                    <form
                      onSubmit={submitComment}
                      className="form-horizontal post-comment-form"
                      method="post"
                      action="http://localhost/world-of-cultures/public/clientmeet/comment/10"
                      encType="multipart/form-data"
                    >

                      {/* User Comment Inputbox  */}
                      <input
                        id="btn-input"
                        onChange={handleInput}
                        type="text"
                        value={user.comment}
                        name="comment"
                        className="form-control input-sm"
                        placeholder="Type your message here..."
                      />

                      {/* Comment send button */}
                      <span className="input-group-btn">
                        <button
                          type="submit"
                          className="btn btn-primary post-comment-btn"
                          id="btn-chat"
                        >
                          Send
                        </button>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appState: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addNewMessage: (message) => {
      dispatch(addMessage(message));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);
