import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Home = () => (
  <>
    <h1>
      TCA Raccoon Tycoon
    </h1>
      <h2>
        Companion App
      </h2>
      <Button variant="primary">
        Select Players
      </Button>{' '}
      <Card>
        <Card.Header>
          Leaderboard
        </Card.Header>
        <Card.Body>
          Play a game to begin your leaderboard.
        </Card.Body>
      </Card>

  </>
);

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
