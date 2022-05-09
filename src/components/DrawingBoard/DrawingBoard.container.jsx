import { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';
import DrawingBoardView from "./DrawingBoard.view";

export default function DrawingBoardContainer(props) {

    const canvasRef = useRef(null);
    const [data, setData] = useState(null);
    const [change, setChange] = useState({});
    const [waiting, setWaiting] = useState(false);

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
        if (props.peer && change) {
            const connections = props.connections.map(_conn => {
                const conn = props.peer.connect(_conn);
                conn.on('open', function () {
                    if (Object.keys(change).length) conn.send(change);
                });
                return conn;
            });
            // console.log(connections);
        }
    }, [change]);

    useEffect(() => {
        if(props.connections.length === 0) setWaiting(true);
        else setWaiting(false);
    }, [waiting]);

    return (
        <div>
            <DrawingBoardView
                waiting={waiting}
                canvasRef={canvasRef}
                onChange={onChange}
                words={props.words}
            />
        </div>
    )
}