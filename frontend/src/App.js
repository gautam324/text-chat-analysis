import React from 'react';
import TextInput from './TextInput'; // Adjusted import for TextInput.js
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <h1>Text/Chat analysis tool</h1>
      <TextInput />
    </div>
  );
}

export default App;
