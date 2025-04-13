import React from 'react';

function Inputshort({ inputVal, setInputVal, handleShortenClick }) {
  return (
    <div className="inputContainer">
      <h1>URL <span>Shortener</span></h1>
      <div>
        <input
          type="text"
          placeholder="Paste a link to shorten it"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={handleShortenClick}>Shorten</button>
      </div>
    </div>
  );
}

export default Inputshort;
