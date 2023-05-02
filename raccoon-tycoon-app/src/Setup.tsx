import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SetupInfo } from './front-end-model';

export interface SetupProps {
    previousPlayers: string[];
    setSetupInfo: (info: SetupInfo) => void;
};

export const Setup: React.FC<SetupProps> = ({
    previousPlayers
    , setSetupInfo
}) => {

    const nav = useNavigate();

    const [chosenPlayers, setChosenPlayers] = useState(
        previousPlayers.map(x => ({
            name: x
            , checked: false
        }))
    );

    const [newPlayerName, setNewPlayerName] = useState("");

    const togglePlayer = (name: string) => setChosenPlayers(
        chosenPlayers.map(x => ({
            ...x 
            , checked: x.name == name ? !x.checked : x.checked
        }))
    );

    const recordGame = () => {
        setSetupInfo({
            start: new Date().toISOString()
            , chosenPlayers: chosenPlayers
                .filter(x => x.checked)
                .map(x => x.name)
        });
        nav("/finish");
    };

    const validateAndAddNewPlayer = () => {
        if (
            newPlayerName.length == 0
            || chosenPlayers.some(x => x.name.localeCompare(newPlayerName) == 0)
        ) {
            return;
        }

        setChosenPlayers(
            [
                ...chosenPlayers
                , {
                    name: newPlayerName
                    , checked: true
                }
            ]
        );

        setNewPlayerName("");
    };

    return (
        <>
            <h2>Players</h2>
            <p>Add new player/select player</p>

            <Form className = "mt-5">
                <Form.Group className="mb-3">
                    <Form.Label>Add New Player</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Player name"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)} 
                    />
                    <Button
                        onClick={validateAndAddNewPlayer}
                    >
                        Confirm
                    </Button>
                </Form.Group>               
                {
                    chosenPlayers.map(x =>(
                        <Form.Check
                            label={x.name}
                            checked={x.checked}
                            onChange={() => togglePlayer(x.name)} 
                        />
                    ))
                }
            </Form>

            <Button 
                variant="primary"
                onClick={recordGame}    
            >
                Record Game
            </Button>{' '}
        </>
    );
};