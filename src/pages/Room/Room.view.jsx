import { DrawingBoard, ViewBoard } from '../../components';

export default function RoomView(props) {
    return (
        <div style={{ display: 'flex', top: '0', left: '0', right: '0', bottom: '0', position: 'absolute' }}>
            <div style={{ backgroundColor: 'red', display: 'flex', flexDirection: 'column', textAlign: 'left', width: '40%', marginTop: '1%', marginLeft: '1%' }}>
                <h2>RoomID: {props.roomID}</h2>
                <h2>PlayerID: {`${props.id}`}</h2>
                {props.gameStarted && (
                    <div>
                        {props.connections.map((conn, index) => (
                            <div key={index} style={{ display: 'flex', gap: '1px' }}>
                                <h4>{conn}</h4>
                                <div style={{ marginLeft: '5%' }}>
                                    {(props.makeGuessVisible && props.makeGuessVisible?.id === conn.split('-')[1]) ? (
                                        <div>
                                            <h4>{props.makeGuessVisible.data}</h4>
                                        </div>
                                    ) : (<h4>Waiting...</h4>)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ width: '80%', textAlign: 'left', backgroundColor: 'green' }}>
                {props.gameStarted ?
                    (
                        <div style={{ marginLeft: '5%' }}>
                            {props.role === 'DRAWER' && <DrawingBoard peer={props.peer} id={props.id} roomID={props.roomID} connections={props.connections} words={props.words} />}
                            {props.role === 'GUESSER' && <ViewBoard peer={props.peer} id={props.id} roomID={props.roomID} connections={props.connections} makeGuess={props.makeGuess} />}
                        </div>
                    ) :
                    (
                        <div style={{ width: '100%', marginLeft: '5%' }}>
                            <h1>Waiting for game to start</h1>
                            <input value={props.words.join(',')} onChange={props.changeWords} type="text" style={{ width: '80%', height: '40px', borderRadius: '5px' }} placeholder="Enter any number of words. Split them using ','." />
                            {props.connections.map((conn, index) => (
                                <div key={index}>
                                    <h2>{conn}</h2>
                                </div>
                            ))}
                            <button style={{ float: 'right', marginRight: '15%', borderRadius: '10px', height: '42px', background: 'rgba(255,255,255,0.25)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)', backdropFilter: 'blur(3px)', border: '0px' }} onClick={props.startGame}>Start Game</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}