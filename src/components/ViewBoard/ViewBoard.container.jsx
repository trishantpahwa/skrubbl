import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import ViewBoardView from "./ViewBoard.view";

export default function DrawingBoardContainer(props) {

    const [peer, setPeer] = useState(null);
    const canvasRef = useRef(null);
    const [data, setData] = useState({ lines: [], width: 800, height: 500 });
    const [change, setChange] = useState({});

    useEffect(() => {
        setPeer(new Peer('guesser', {
            host: 'localhost',
            port: 9000,
            path: '/myapp'
        }));

        peer.on('connection', function (conn) {
            conn.on('data', function (data) {
                setChange(data);
            });
            conn.on('open', function () {
                console.log("open")
            });
            conn.on('close', function () {
                console.log("close")
            })
        });
    }, []);

    useEffect(() => {
        if (Object.keys(change).length)
            setData(__data => {
                return { ...__data, lines: [...__data.lines, change] };
            });
    }, [change]);

    return (
        <div>
            <ViewBoardView
                canvasRef={canvasRef}
                data={JSON.stringify(data)}
            />
        </div>
    )
}