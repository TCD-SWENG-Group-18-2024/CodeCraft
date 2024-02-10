import React, { useState, useEffect } from 'react';

function App() {
  const [joke, setJoke] = useState(null);
  const BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    // Fetch joke data from Flask backend
    fetch(`${BASE_URL}/joke`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } 
        // Return the parsed JSON data
        return response.json();
      })
      .then(data => setJoke(data))
      .catch(error => console.error('Error fetching joke:', error));
  }, []);

  return (
    <div>
      <h1>Random Joke</h1>
      {joke ? (
        <div>
          <p><strong>Setup:</strong> {joke.setup}</p>
          <p><strong>Punchline:</strong> {joke.punchline}</p>
        </div>
      ) : (
        <p>Loading joke...</p>
      )}
    </div>
  );
}

export default App;