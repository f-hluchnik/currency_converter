// import React from 'react';
import logo from './coin.svg';
// import { useState } from 'react';
import './App.css';
import Form from "./Form"

function App() {

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form />
      </div>
    </div>
  );
}

export default App;
