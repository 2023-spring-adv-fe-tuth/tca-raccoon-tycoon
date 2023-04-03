import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const nav = useNavigate();

    return (
        <>
        <Button 
            variant="primary"
            onClick={() => nav("/setup")}    
        >
            Select Players
        </Button>{' '}
        <Card className="mt-3">
            <Card.Header>
                Leaderboard
            </Card.Header>
            <Card.Body>
                Play a game to begin your leaderboard.
            </Card.Body>
        </Card>
        </>
    );
  };