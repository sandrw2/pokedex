// App.js
import React, { useState } from 'react';
import CardDisplay from './CardDisplay.jsx';

function App() {
  const [cardId, setCardId] = useState(''); // Holds the card ID entered by the user
  const [submittedId, setSubmittedId] = useState(null); // Holds the ID to pass to CardDisplay

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedId(cardId); // Set the ID to display when form is submitted
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Pokémon Card Viewer</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Po kémon card ID (e.g., base1-4)"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit">Search</button>
      </form>
      
      {submittedId && <CardDisplay cardId={submittedId} />} {/* Display card when submitted */}
    </div>
  );
}

export default App;
