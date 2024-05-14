import { useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { createPost, getPosts, getUsers, } from "../../service/request-service";
import AuthContext from '../../Context/AuthContext.jsx';
import "./CreatePostForm.css";

const CreatePostForm = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [newPost, setNewPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    const addPost = async () => {
      try {
        setLoading(true);
        const maxId = Math.max(...posts.map(post => post[1].Id));
        await createPost({
          Id: maxId + 1,
          postTitle: newPost.postTitle,
          postContent: newPost.postContent,
          date: new Date().toLocaleDateString(),
          postLikedBy: {},
          postAuthor: user,
        });
        setLoading(false);
        setError(null);
        navigate(`/posts/${maxId + 1}`);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      } 
    }
    if (newPost) addPost();
  }, [newPost])

  const submitHandler = async (e) => {
    e.preventDefault();
    const postTitle = e.target.title.value;
    const postContent = e.target.description.value;
    setNewPost({postTitle, postContent});
  }

  if (loading) {
    return <div className="spinner"></div>
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
          {error && <div id="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
