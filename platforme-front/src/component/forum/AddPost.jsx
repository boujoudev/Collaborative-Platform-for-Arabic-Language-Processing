import React from "react";
import { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, link, description, file };
    console.log("Form submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="title">Add Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="inputAddPost"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="inputAddPost"
            type="url"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileInputPost" id="inputAddPost">
            Upload File{" "}
            <input
              style={{ display: "none" }}
              id="fileInputPost"
              type="file"
              // className="inputAddProjectFile"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="form-group">
          <textarea
            className="inputAddPost"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="AddPost" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
