import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Setup } from './Setup';
import { Finish } from './Finish';

import { 
  GameResult
  , CalculateLeaderboardFunc
  , calculateLeaderboard
  , getPreviousPlayers 
} from './front-end-model';

import { 
  HashRouter
  , Routes
  , Route 
} from 'react-router-dom';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import localforage from 'localforage';

const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:45:30.000Z"
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:42:00.000Z"
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:47:00.000Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:41:48.000Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:50:00.000Z"
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:43:12.000Z"
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:47:13.000Z"
  }
];


const App = () => {

  //State hooks
  const [results, setGameResults] = useState(hardcodedGameResults);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: " "
    , chosenPlayers: []
  });

  const [emailKey, setEmailKey] = useState("");

  //useEffect hook
  useEffect(
    () => {

      const loadEmailKey = async () => {
      
        try {
          setEmailKey(
            await localforage.getItem("emailKey") ?? ""
          );
        }
        catch (err) {
          console.error(err);
        }
      };
 
      loadEmailKey();
    }
    , []
  );


  //Helper functions
  const addGameResult = (r: GameResult) => {
    setGameResults([
      ...results 
      , r
    ]);
  };

  const saveEmailKey = async () => {
    try {
      await localforage.setItem(
        "emailKey"
        , emailKey
      );
    }
    catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="App m-3">
      <h1>
        TCA Raccoon Tycoon
      </h1>
      <h2>
        Companion App
      </h2>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="text"
            placeholder="User email address"
            value={emailKey}
            onChange={(e) => setEmailKey(e.target.value)} 
          />
            <Button
              onClick={saveEmailKey}
            >
              Save
            </Button>
      </Form.Group>  
      <hr />
      <HashRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home
                leaderboardData={calculateLeaderboard(results)}
              />
            } 
          />
          <Route 
            path="/setup" 
            element={
              <Setup
                previousPlayers={getPreviousPlayers(results)}
                setSetupInfo={setSetupInfo}     
              />
            } 
          />
          <Route 
            path="/finish" 
            element={
              <Finish
              addGameResultFunc={addGameResult}
              setupInfo={setupInfo} 
              />
            } 
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
