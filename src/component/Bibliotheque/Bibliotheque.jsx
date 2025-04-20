// Bibliotheque.jsx
import { useState } from 'react'
import BibliothequeCard from './BibliothequeCard'
import { ressources } from './BibliothequeData'

export default function Bibliotheque() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="main-content">
      <div className="component-header">
        <h2 className="text-xl font-semibold text-foreground">Bibliothèque Virtuelle</h2>
        <div className="flex gap-2">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous ▼
          </button>
          <button
            className={`filter-btn ${filter === 'theses' ? 'active' : ''}`}
            onClick={() => setFilter('theses')}
          >
            Thèses ▼
          </button>
        </div>
      </div>

      <div className="resources-grid">
        {ressources
          .filter(r => filter === 'all' || r.type === filter)
          .map(ressource => (
            <BibliothequeCard key={ressource.id} {...ressource} />
          ))}
      </div>
    </div>
  )
}