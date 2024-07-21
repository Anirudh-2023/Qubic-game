// src/App.js
import React from 'react';
import Game from './components/Game';
import './App.css';
import backgroundImage from './assets/background.jpg';

function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh'
    }}>
      <Game />
    </div>
  );
}

export default App;