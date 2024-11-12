// CardDisplay.js
import React, { useState, useEffect } from 'react';
import pokemon from 'pokemontcgsdk';

// Configure API key if needed
pokemon.configure({ apiKey: '03343862-f6ec-4ab9-beb2-452ddef63707' });

const CardDisplay = ({ cardId }) => {
  const [card, setCard] = useState(null); // Holds the card data
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Holds any error message

  useEffect(() => {
    // Fetch the card by ID when the component mounts
    pokemon.card.find(cardId)
      .then(cardData => {
        setCard(cardData); // Update card data in state
        setLoading(false); // Stop loading promise has been fulfilled
      })
      .catch(err => {
        setError("Failed to fetch card"); // Set error message if fetching fails
        setLoading(false); // Stop loading
      });
  }, [cardId]); // Re-run fetch if cardId changes

  if (loading) return <p>Loading card data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', width: '300px', margin: '20px auto', textAlign: 'center' }}>
      <h2>{card.name}</h2>
      <img src={card.images.large} alt={card.name} style={{ width: '100%' }} />
      <p><strong>Set:</strong> {card.set.name}</p>
      <p><strong>Rarity:</strong> {card.rarity || 'Unknown'}</p>
      <p><strong>HP:</strong> {card.hp}</p>
      <p><strong>Type:</strong> {card.types && card.types.join(', ')}</p>
    </div>
  );
};

export default CardDisplay;
