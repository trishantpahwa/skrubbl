export default function DashboardView(props) {
    return (
        <div className="dashboard-view">
            <div>Hi {props.name}!</div>
            <div className="room-id-div">
                <input value={props.roomID} onChange={props.roomIDChange} className="dashboard-txt-box" type="text" placeholder="RoomID" />
                <button onClick={props.createGame} className="dashboard-btn">Create Room!</button>
            </div>
            <button onClick={props.joinPublicGame} className="dashboard-btn">Join a public game</button>
            <button onClick={props.startTutorial} className="dashboard-btn">Learn how to play</button>
            <button onClick={props.logout} className="dashboard-btn">Logout</button>
        </div>
    )
}