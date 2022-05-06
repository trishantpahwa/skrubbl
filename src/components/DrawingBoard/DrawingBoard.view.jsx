import CanvasDraw from "react-canvas-draw";

export default function DrawingBoardView(props) {
    return (
        <div>
            <CanvasDraw
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