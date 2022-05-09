import { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';
import ViewBoardView from "./ViewBoard.view";

export default function ViewBoardContainer(props) {

    // const [peer, setPeer] = useState(null);
    const canvasRef = useRef(null);
    const [data, setData] = useState({ lines: [], width: 800, height: 500 });
    const [change, setChange] = useState({});
    const [setupConn, setSetupConn] = useState(true);
    const [guess, setGuess] = useState('');

    const onAnswerTyped = (e) => {
        e.preventDefault();
        setGuess(e.target.value);
    }

    const checkSubmit = (e) => {
        if (e.key === 'Enter') {
            props.connections.map(conn => {
                const connection = props.peer.connect(conn);
                connection.on('open', function () {
                    connection.send({ type: 'GUESS', data: guess, id: props.id });
                });
            });
            props.makeGuess({ type: 'GUESS', data: guess, id: props.id });
            e.target.value = '';
        }
    }

    useEffect(() => {
        if (setupConn) {
            props.peer.on('connection', function (conn) {
                conn.on('data', function (data) {
                    if (data.type === 'GUESS') {
                        props.makeGuess(data);
                    }
                    else setChange(data);
                });
                conn.on('open', function () {
                    console.log("open")
                });
                conn.on('close', function () {
                    console.log("close")
                })
            });
            setSetupConn(false);
        }
    }, [])

    useEffect(() => {
        if (Object.keys(change).length)
            setData(__data => {
                return { ...__data, lines: [...__data.lines, change] };
            });
    }, [change]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ViewBoardView
                canvasRef={canvasRef}
                data={JSON.stringify(data)}
            />
            <div style={{ width: '90%', marginTop: '1.5%' }}>
                <input onKeyDown={checkSubmit} onChange={onAnswerTyped} type="text" style={{ width: '98%', borderRadius: '5px', height: '60px' }} />
            </div>
        </div>
    )
}