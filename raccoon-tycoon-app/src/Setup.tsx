import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Setup = () => {

    const nav = useNavigate();

    return (
        <>
            <h2>Setup</h2>
            <p>Add new player/select new player</p>
            <Button 
                variant="primary"
                onClick={() => nav("/finish")}    
            >
                Record Game
            </Button>{' '}
        </>
    );
};