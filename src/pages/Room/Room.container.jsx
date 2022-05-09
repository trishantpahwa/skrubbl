import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';
import RoomView from './Room.view';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

export default function RoomContainer(props) {

    const [interval, _setInterval] = useState(null);
    const [id, setID] = useState(uuid().split('-').join('').substring(0, 10));
    const { roomID } = useParams();
    const [peer, setPeer] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [role, setRole] = useState('');
    const [connections, setConnections] = useState([]);
    const [makeGuessVisible, setMakeGuessVisible] = useState(null);
    const [words, setWords] = useState([]);
    const [activeWord, setActiveWord] = useState();

    const getConnections = async () => {
        const { data } = await axios.get(`http://192.168.1.38:8002/connection?roomID=${roomID}`);
        if (data?.connections.length) {
            setConnections(data.connections.filter(conn => conn !== `${roomID}-${id}`));
        }
    }

    const getWaitingList = () => {
        _setInterval(setInterval(getConnections, 500));
    }

    const startGame = async () => {
        sendGameStartNotification();
        setActiveWord(0);
        setGameStarted(true);
        setRole('DRAWER');
    }

    const connectToPeerServer = () => {
        console.log(import.meta.env)
        setPeer(new Peer(`${roomID}-${id}`, {
            host: import.meta.env.VITE_PEER_SERVER_IP,
            port: import.meta.env.VITE_PEER_SERVER_PORT,
            path: import.meta.env.VITE_PEER_SERVER_PATH
        }));
    }

    const sendGameStartNotification = () => {
        connections.map(conn => {
            const connection = peer.connect(conn);
            connection.on('open', function () {
                connection.send({
                    type: 'GAME_START',
                    words: words
                });
            });
        });
    }

    const makeGuess = (guess) => {
        // console.log(guess, words, activeWord)
        if (guess && words && words[activeWord] === guess.data) alert(`${guess.id === id ? 'You' : guess.id} won!`)
        setMakeGuessVisible(guess);
    }

    const changeWords = (e) => {
        e.preventDefault();
        setWords(e.target.value.split(','));
    }

    useEffect(() => {
        getWaitingList();
        connectToPeerServer();
    }, []);

    useEffect(() => {
        if (peer)
            peer.on('connection', function (conn) {
                conn.on('data', function (data) {
                    if (data.type === 'GAME_START') {
                        setWords(data.words);
                        setActiveWord(0);
                        setGameStarted(true);
                        setRole('GUESSER');
                    } else if (data.type === 'GUESS') {
                        makeGuess(data);
                        setTimeout(() => makeGuess(null), 5000);
                    }
                    // else {
                    // }
                });
                conn.on('open', function () {
                    console.log("open")
                });
                conn.on('close', function () {
                    console.log("close")
                })
            });
    }, [peer]);

    useEffect(() => console.log(words), [words]);

    return (
        <div style={{ width: '100%' }}>
            <RoomView
                id={id}
                roomID={roomID}
                gameStarted={gameStarted}
                role={role}
                connections={connections}
                startGame={startGame}
                peer={peer}
                makeGuess={makeGuess}
                makeGuessVisible={makeGuessVisible}
                changeWords={changeWords}
                words={words}
            />
        </div>
    )
}