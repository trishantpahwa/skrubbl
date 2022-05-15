import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import DashboardView from './Dashboard.view';
import { SessionService } from '../../services';
import './Dashboard.css';

export default function DashboardContainer(props) {
    const [roomID, setRoomID] = useState(`${uuid().split('-').join('').substring(0, 9).substring(0, 3)}-${uuid().split('-').join('').substring(0, 9).substring(0, 3)}-${uuid().split('-').join('').substring(0, 9).substring(0, 3)}`);
    const [name, setName] = useState(null);

    const roomIDChange = (e) => {
        setRoomID(e.target.value);
    };

    const createGame = () => {
        if (roomID.length > 0) window.location = `/room/${roomID}`;
        else alert('Enter roomID');
    }

    const getPublicGames = async () => {
        const data = await ApiService.get('/games/public');
        console.log(data);
    }

    const joinPublicGame = () => {
        // getPublicGames();
        // window.location = '/room/' + roomID;
    }

    const logout = async () => {
        await SessionService.remove('user');
        window.location = '/';
    }

    const getName = async () => {
        const user = await SessionService.get('user');
        setName(JSON.parse(user).name);
    }

    useEffect(getName, []);

    return (
        <div className="dashboard-container">
            <DashboardView
                name={name}
                roomID={roomID}
                roomIDChange={roomIDChange}
                logout={logout}
                createGame={createGame}
                joinPublicGame={joinPublicGame}
            />
        </div>
    )
};