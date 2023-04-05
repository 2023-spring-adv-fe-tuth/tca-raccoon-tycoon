import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';

interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
    setupInfo: SetupInfo;
};

export const Finish: React.FC<PlayProps> = ({
    addGameResultFunc
    , setupInfo
}) => {

    console.log(setupInfo);

    const nav = useNavigate();

    const endGame = (winner: string) => {

        addGameResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
            , start: "2023-03-22T20:40:00.000Z"
            , end: "2023-03-22T20:47:00.000Z"
        });

        nav(-2);
    };

    return (
        <>
            <h2>Finish</h2>
            <p>Record winners, losers, and Victory Points</p>
            {
              setupInfo.chosenPlayers.map(x => (
                <Button
                    onClick={() => endGame(x)}
                >{x} is the Raccoon Tycoon!
                </Button>
              ))  
            }
        </>
    );
};