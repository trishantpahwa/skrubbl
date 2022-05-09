import CanvasDraw from "react-canvas-draw";

export default function ViewBoardView(props) {
    return (
        <div>
            <CanvasDraw
                hideGrid={true}
                ref={props.canvasRef}
                saveData={props.data}
                immediateLoading={true}
                canvasWidth={800}
                canvasHeight={500}
                disabled={true}
                style={{
                    marginTop: '5%'
                }}
            />
        </div>
    )
}