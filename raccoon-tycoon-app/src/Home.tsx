import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { LeaderboardPlayer } from './front-end-model';

interface HomeProps {
    leaderboardData: LeaderboardPlayer[];
};

export const Home: React.FC<HomeProps> = ({leaderboardData}) => {

    console.log(leaderboardData);

    const nav = useNavigate();

    return (
        <>

        <Card className="mt-3 overflow-hidden">
            <Card.Header>
                Leaderboard
            </Card.Header>
            <Card.Body>
                {
                    leaderboardData.length == 0 &&
                    <p>Play a game to begin your leaderboard.</p>
                }
                {
                    leaderboardData.length > 0 &&
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            leaderboardData.map(x => (
                                    <tr>
                                        <td>{x.name}</td>
                                        <td>{x.wins}</td>
                                        <td>{x.losses}</td>
                                        <td>{x.avg}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                  </Table>
                }
            </Card.Body>
        </Card>
        <Button 
            variant="primary"
            onClick={() => nav("/setup")}
            className="mt-3"    
        >
            Select Players
        </Button>{' '}
        </>
    );
  };