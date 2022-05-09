import CanvasDraw from "react-canvas-draw";

export default function DrawingBoardView(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '2%', width: '93.6%', display: 'flex', justifyContent: 'space-around', backgroundColor: 'yellow' }}>
                {props.words.map((word, index) => (
                    <h3 key={index}>{word}</h3>
                ))}
            </div>
            <CanvasDraw
                disabled={props.waiting}
                hideGrid={true}
                ref={props.canvasRef}
                onChange={props.onChange}
                canvasWidth={800}
                canvasHeight={500}
                style={{
                    marginTop: '5%'
                }}
            />
        </div>
    )
}