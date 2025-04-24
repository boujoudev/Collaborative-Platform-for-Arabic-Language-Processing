import React, { useState } from "react";

const AddProject = () => {
  const [domain, setDomain] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { domain, title, link, description };
    console.log("Form submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="title">Add Project</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select className="selectDomain" value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option className="Domain" value="">Select domain</option>
            <option className="Domain" value="translation">Translation</option>
            <option className="Domain" value="grammar">Grammar</option>
            <option className="Domain" value="vocabulary">Vocabulary</option>
            <option className="Domain" value="pronunciation">Pronunciation</option>
          </select>
          <select className="selectDomain" value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option className="Domain" value="">Type</option>
            <option className="Domain" value="translation">Translation</option>
            <option className="Domain" value="grammar">Grammar</option>
            <option className="Domain" value="vocabulary">Vocabulary</option>
            <option className="Domain" value="pronunciation">Pronunciation</option>
          </select>
        </div>

        <div className="form-group">
          <input
          className="inputAddProject"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input className="inputAddProject"
            type="url"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <textarea
          className="inputAddProject"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="AddProjectPage" type="submit">Post</button>
      </form>
    </div>
  );
};

export default AddProject;
