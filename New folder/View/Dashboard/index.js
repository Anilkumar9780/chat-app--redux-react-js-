// Pakages
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// Components
import UserContext from '../../Context/Auth';
import {addMessage} from '../../Redux/Action';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';


/**
 * @returns node
 */
const ChatPanel = ({ appState = [] , addNewMessage = {} }) => {

  // useContext used
  const isLogin = useContext(UserContext);

  // state to post  data in the form of object in json
  const [user, setUser] = useState({
    comment: '',
    user_id: isLogin.userData.id,
  });

  // state handle to save fetch data
  const [posts, setPosts] = useState([]);

  /**
   * Method to fetch comments data from db.json
   */
  const getPosts = () => {
    axios.get('http://localhost:8000/comments').then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, [posts !== ''])

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
    axios.post('http://localhost:8000/comments',message).then(() => {
      getPosts();
    })
    addNewMessage(message);
    setUser({ ...user, comment: '' });
  };

  return (
    <div>
      <div id="app">

        <div className="container" style={{ marginTop: '80px', marginLeft: '320px' }}>

          <div className="row" id="comment">
            <div className="col-md-12 mx-auto">

              <div className="card">
                <div className="card-header text-center">
                  <b><span>LEAVE YouR CommenT HERE</span></b>
                </div>
                <div className="card-body chat-care">

                  {posts.map((post, index) => (
                    <ul className="chat" key={index}>

                      {post.user_id === isLogin.userData.id ? (

                      // it's admin detail based on above condition.
                        <li className="admin clearfix">
                          <div className="chat-body clearfix">
                            <div className="header clearfix">
                              <small className="left text-muted">
                                <span className="glyphicon glyphicon-time" />
                                just now
                              </small>
                              <strong className="right primary-font">Admin</strong>
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
                              <strong className="primary-font">Rahul</strong>
                              <small className="right text-muted">
                                <span className="glyphicon glyphicon-time" />
                                just now
                              </small>
                            </div>
                            <p>
                              {post.comment}
                            </p>
                          </div>
                        </li>

                      )}
                    </ul>
                  ))}
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

                      {/* Getting User's User id  */}
                      <span>
                        <h5>
                          User_id :
                          {user.user_id}
                        </h5>
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
