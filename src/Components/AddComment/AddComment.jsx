import React, { useContext, useEffect, useState } from "react";
import AuthContext from '../../Context/AuthContext';
import { createComment, getComments, getUsers } from '../../service/request-service';
import "./AddComment.css";

const MIN_CHARS = 1;
const MAX_CHARS = 300;

const AddComment = (props) => {
  const {isLoggedIn} = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const handleAddComment = async () => {
    setLoading(true);
    try {
      const data = await getComments();
      const comments = Object.entries(data).map(([key, comment]) => comment = {id: key, ...comment});
      const users = await getUsers();
      const author = Object.values(users).find(user => user.emailAddress === isLoggedIn.user);  

      const maxId = Math.max(...comments.map(comment => comment.id));
      const newComment = {
        id: maxId + 1,
        commentAuthor: author.username,
        commentContent: content,
        date: new Date().toLocaleDateString(),
        relatedPost: +props.relatedPost,
      }
      await createComment(newComment);
      props.fn();
    } catch (error) {
      setError("An error occurred while adding the comment.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (content) handleAddComment(); }, [content]);

  const addComment = async (event) => {
    event.preventDefault();
    const content = event.target.textarea.value;
    event.target.textarea.value = '';
    if (content.length < MIN_CHARS || content.length > MAX_CHARS) {
      setError(`Comment length does not comply with requirements.`);
      return;
    }
    setError(null);
    setContent(content);
  }

  if (loading) {
    return <div className="spinner"></div>
  }

  return (
    <div>
      <form onSubmit={addComment} className="addComment">
      <h4>Add comment</h4>
      <h5><i>/ Characters allowed: {MIN_CHARS} - {MAX_CHARS} /</i></h5>
          <textarea id="textarea" placeholder="Write your comment here"></textarea>
          {error && <div id="error">{error}</div>}
          <button type="submit" className="buttonSend">Add<span></span></button>
      </form>
    </div>
  );
};

export default AddComment;
