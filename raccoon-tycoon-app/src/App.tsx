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


const App = () => {

  //State hooks
  const [results, setGameResults] = useState<GameResult[]>([]);

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
