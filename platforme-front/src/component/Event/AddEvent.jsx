import React, { useState } from "react";

const AddEvent = () => {
  const [isOngoing, setIsOngoing] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      isOngoing,
      startDate,
      startTime,
      endDate,
      endTime,
      title,
      description,
    });
  };

  return (
    <div className="event-form-container">
      <div className="event-form-header">
        <h2>Add Event</h2>
      </div>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="event-type-selector">
          <label className={`event-type-option ${isOngoing ? "active" : ""}`}>
            <input
              type="radio"
              name="eventType"
              checked={isOngoing}
              onChange={() => setIsOngoing(true)}
            />
            Ongoing
          </label>
          <label className={`event-type-option ${!isOngoing ? "active" : ""}`}>
            <input
              type="radio"
              name="eventType"
              checked={!isOngoing}
              onChange={() => setIsOngoing(false)}
            />
            To schedule
          </label>
        </div>

        <div className="event-form-field">
          <select className="event-form-select">
            <option value="">Select institution</option>
            <option value="univ1">University 1</option>
            <option value="univ2">University 2</option>
          </select>
        </div>

        <div className="event-form-row">
          <div className="event-form-field">
            <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
              Start Date
            </h5>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="event-form-input"
              required
            />
          </div>
          <div className="event-form-field">
            <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
              Start Time
            </h5>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="event-form-input"
              required
            />
          </div>
        </div>

        <div className="event-form-row">
          <div className="event-form-field">
            <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
              End Date
            </h5>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="event-form-input"
              required
            />
          </div>
          <div className="event-form-field">
            <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
              End Time
            </h5>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="event-form-input"
              required
            />
          </div>
        </div>

        <div className="event-form-field">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="event-form-input"
            required
          />
        </div>

        <div className="event-form-field">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="event-form-textarea"
            required
          />
        </div>

        <button type="submit" className="event-form-submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
