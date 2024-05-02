import React from "react";
import "./CreatePostForm.css";

const CreatePostForm = () => {
  return (
    <div className="createPostForm">
      <div className="containerForm">
        <div className="modal">
        <form>
          <div className="modal__header">
            <span className="modal__title">New post</span>
          </div>
          <div className="modal__body">
            <div className="inputForm">
              <label className="input__label">Post title</label>
              <input className="input__field" type="text" minLength="16" maxLength="64" required/>
              <p className="input__description">
                The title must be between 16 and 64 symbols
              </p>
            </div>
            <div className="inputForm">
              <label className="input__label">Description</label>
              <textarea  className="input__field input__field--textarea" minLength="32" maxLength="8192" required></textarea>
              <p className="input__description">
                The content must be between 32 symbols and 8192 symbols.
              </p>
            </div>
          </div>
          <div className="modal__footer">
            <button type="submit" className="buttonForm button--primary">Create post</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
