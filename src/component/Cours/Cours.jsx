// Cours.jsx
import CoursCard from "./CoursCard"; 
import { cours } from './CoursData'; 

export default function Cours() {
  return (
    <div className="main-content">
      <div className="component-header">
        <h2 className="text-xl font-semibold text-foreground">Cours</h2>
        <button className="primary-btn">Nouveau Cours</button>
      </div>

      <div className="recommendations-section">
        <h4 className="section-subtitle">Recommandé pour vous</h4>
        <div className="courses-grid">
          {cours.map(course => (
            <CoursCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
