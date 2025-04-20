// Corpus.jsx
import { useState } from 'react';
import CorpusItem from './CorpusCard';
import { corpusData } from './CorpusData';

export default function Corpus() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Corpus Linguistiques</h2>
        <input
          type="text"
          placeholder="Rechercher..."
          className="px-4 py-2 border border-border rounded-full bg-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {corpusData
          .filter(corpus => 
            corpus.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(corpus => (
            <CorpusItem key={corpus.id} {...corpus} />
          ))}
      </div>
    </div>
  );
}