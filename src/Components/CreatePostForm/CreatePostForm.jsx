import React, { useState, useEffect, useContext} from "react";
import "./CreatePostForm.css";
import { createPost, getPosts, getUsers, } from "../../service/request-service";
import AuthContext from '../../Context/AuthContext.jsx';

const CreatePostForm = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: ''
  })
  const [user, setUser] = useState();
  const { isLoggedIn, setLoginState } = useContext(AuthContext);

  
  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts();
      setPosts(posts);
    };
    fetchPosts();

    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      if (isLoggedIn.status) {
        const currentUsername = users.filter(
          (user) => user[1].emailAddress === isLoggedIn.user
        )[0][0];
        setUser(currentUsername);
      }
    };
    fetchUsers();
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const post = await createPost({
        Id: posts.length + 1,
        postTitle: e.target.title.value,
        postContent: e.target.description.value,
        date: new Date().toLocaleDateString(),
        postLikedBy: {[user]:true},
        postAuthor: user,
      });
    } catch (error) {
    }
  }

  return (
    <div className="createPostForm">
      <div className="containerForm">
        <div className="modal">
        <form onSubmit={submitHandler}>
          <div className="modal__header">
            <span className="modal__title">New post</span>
          </div>
          <div className="modal__body">
            <div className="inputForm">
              <label className="input__label">Post title</label>
              <input name="title" id="title" className="input__field" type="text" minLength="16" maxLength="64" required/>
              <p className="input__description">
                The title must be between 16 and 64 symbols
              </p>
            </div>
            <div className="inputForm">
              <label className="input__label">Description</label>
              <textarea name="description" id="description" className="input__field input__field--textarea" minLength="32" maxLength="8192" required></textarea>
              <p className="input__description">
                The content must be between 32 symbols and 8192 symbols.
              </p>
            </div>
          </div>
          <div className="modal__footer">
            <button  type="submit" className="buttonForm button--primary">Create post</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
