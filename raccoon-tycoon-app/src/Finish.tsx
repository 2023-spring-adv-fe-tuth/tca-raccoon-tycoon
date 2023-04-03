import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Finish = () => {

    const nav = useNavigate();

    return (
        <>
            <h2>Finish</h2>
            <p>Record winners, losers, and Victory Points</p>
            <Button 
                variant="primary"
                onClick={() => nav(-2)}    
            >
                Complete Game
            </Button>{' '}
        </>
    );
};