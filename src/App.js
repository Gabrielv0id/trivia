import React from 'react';
import { Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login';
import Feedbacks from './Pages/Feedbacks';
import Settings from './Pages/Settings';
import Ranking from './Pages/Ranking';
import Game from './Pages/Game';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Route exact path="/" render={ () => <Login /> } />
        <Route path="/game" render={ () => <Game /> } />
        <Route path="/settings" render={ () => <Settings /> } />
        <Route path="/feedbacks" render={ () => <Feedbacks /> } />
        <Route path="/ranking" render={ () => <Ranking /> } />
      </header>
    </div>
  );
}
