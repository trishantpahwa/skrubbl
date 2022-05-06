import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import DrawingBoardView from "./DrawingBoard.view";

export default function DrawingBoardContainer(props) {

    const [peer, setPeer] = useState(null);
    const canvasRef = useRef(null);
    const [data, setData] = useState(null);
    const [change, setChange] = useState({});

    const onChange = (e) => {
        if (canvasRef.current) {
            const _data = JSON.parse(canvasRef.current.getSaveData());
            setData(__data => {
                setChange(_data.lines.slice(-1)[0]);
                return _data;
            });
        }
    }

    useEffect(() => {
        setPeer(new Peer('drawer', {
            host: 'localhost',
            port: 9000,
            path: '/myapp'
        }));
    }, []);

    useEffect(() => {
        if (peer && change) {
            const conn = peer.connect('guesser');
            conn.on('open', function () {
                if (Object.keys(change).length) conn.send(change);
            });
        }
    }, [change]);

    return (
        <div>
            <DrawingBoardView
                canvasRef={canvasRef}
                onChange={onChange}
            />
        </div>
    )
}