// CoursCard.jsx
export default function CoursCard({ title, instructor, progress }) {
    return (
      <div className="course-card">
        <h3 className="course-title">{title}</h3>
        <span className="course-instructor">{instructor}</span>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    )
  }