import { useState } from 'react';
import './App.css';
import BgAnimation from './BgAnimation';
import Inputshort from './Inputshort';
import Result from './Result';

function App() {
  const [inputVal, setInputVal] = useState("");
  const [finalUrl, setFinalUrl] = useState("");

  const handleShortenClick = () => {
    setFinalUrl(inputVal); // Trigger shortening on click
  };

  return (
    <div className="container">
      <Inputshort
        inputVal={inputVal}
        setInputVal={setInputVal}
        handleShortenClick={handleShortenClick}
      />
      <BgAnimation />
      <Result inputVal={finalUrl} />
    </div>
  );
}

export default App;
