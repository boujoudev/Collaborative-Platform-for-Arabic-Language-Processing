// BibliothequeCard.jsx
export default function BibliothequeCard({ title, author, type, timeAgo, price }) {
    return (
      <div className="resource-card">
        <div className="card-header">
          <span className="resource-type">{type}</span>
          <span className="resource-time">{timeAgo}</span>
        </div>
        <h3 className="resource-title">{title}</h3>
        <div className="card-footer">
          <span className="resource-author">{author}</span>
          <div className="resource-actions">
            <button className="action-btn download-btn">Télécharger</button>
            <button className="action-btn details-btn">Détails</button>
          </div>
        </div>
      </div>
    )
  }