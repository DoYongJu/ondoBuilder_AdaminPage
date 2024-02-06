import './App.css';
import React from 'react';
import Router from '../src/Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
        <div className="App">
      <Router />
      </div>
    </RecoilRoot>
  );
}

export default App;
