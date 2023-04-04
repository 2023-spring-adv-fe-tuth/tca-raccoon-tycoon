import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult } from './front-end-model';

interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
};

export const Finish: React.FC<PlayProps> = ({addGameResultFunc}) => {

    const nav = useNavigate();

    const endGame = () => {

        addGameResultFunc({
            winner: "Nadja"
            , players: ["Nadja", "Guillermo", "Stephanie"]
            , start: "2023-03-22T20:40:00.000Z"
            , end: "2023-03-22T20:47:00.000Z"
        });

        nav(-2);
    };

    return (
        <>
            <h2>Finish</h2>
            <p>Record winners, losers, and Victory Points</p>
            <Button 
                variant="primary"
                onClick={endGame}    
            >
                Complete Game
            </Button>{' '}
        </>
    );
};