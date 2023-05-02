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

import { saveGameToCloud, loadGamesFromCloud } from './tca-cloud-api';


const App = () => {

  //State hooks
  const [results, setGameResults] = useState<GameResult[]>([]);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: " "
    , chosenPlayers: []
  });

  const [emailKeyInput, setEmailKeyInput] = useState("");
  const [emailKeySaved, setEmailKeySaved] = useState("");

  //useEffect hook
  useEffect(
    () => {

      const loadEmailKey = async () => {
      
        try {

          const ek = String(await localforage.getItem("emailKey")) ?? "";

          setEmailKeyInput(ek);
          setEmailKeySaved(ek);
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

    //Save game result to cloud.
    saveGameToCloud(
      emailKeySaved
      , "tca-raccoon-tycoon"
      , r.end
      , r
    );

    //Optimistically update the lifted app state.
    setGameResults([
      ...results 
      , r
    ]);
  };

  const saveEmailKey = async () => {
    try {
      await localforage.setItem(
        "emailKey"
        , emailKeyInput
      );

      setEmailKeySaved(emailKeyInput);
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
            value={emailKeyInput}
            onChange={(e) => setEmailKeyInput(e.target.value)} 
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
