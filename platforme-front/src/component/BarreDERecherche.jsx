import React from "react";
import { useState, useEffect } from "react";

// Remplace cette fonction par ton vrai fetch backend (appel API)
async function fetchRecommendations(query) {
  // Simulation d’une requête HTTP
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = [
        "Apple yoooooooooooooooooooooooooooooooooooooo",
        "Banana",
        "Orange",
        "Mango",
        "Papaya",
        "Pineapple",
      ];
      resolve(
        items.filter((x) => x.toLowerCase().includes(query.toLowerCase()))
      );
    }, 400);
  });
}

const BarreDERecherche = () => {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([
    "appel",
    "banana",
    "orange",
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setRecommendations([]);
      return;
    }
    setLoading(true);

    const timer = setTimeout(() => {
      fetchRecommendations(query)
        .then((results) => {
          setRecommendations(results);
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);
  return (
    <div className="search-box">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        id="barreDeRecherchePrincipale"
        placeholder=" Search...."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* ndir kach 7aja ki ykon y7wes 3la recommandation */}
      {loading && <div className="search-loading"></div>}
      {recommendations.length > 0 && (
        <div>
          <ul className="recommendations-list">
            {recommendations.map((item) => (
              <li key={item} className="recommendation-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BarreDERecherche;
