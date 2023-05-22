import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryContainerMovement from "../Movement/HistoryContainerMovement";
import backIcon from '../img/backIcon.png'
import manualAddMovement from '../img/manualAddMovementBtn.png'
import Stopwatch from "../Movement/Stopwatch.jsx";
import { CircleSlider } from "react-circle-slider";



function Movement() {
    const slider = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const movementStore = useSelector(store => store.rootMovementReducer.MovementReducer)
    const BS = useSelector((store) => store.balanceScoreReducer);
    const [keyValue, setKeyValue] = useState(0);


    useEffect(() => {
        dispatch({
            type: "GET_MOVEMENT"
        })
    }, [])

    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const movementForm = () => {
        history.push("/movementform");
    }

    return (
        <>
            {movementStore.length ?
                <>
                    <div>
                        <img src={backIcon} alt="backButton" onClick={handleHome} />
                    </div>
                    <div key={keyValue} style={{ backgroundColor: "white" }}></div>

                    <center>
                        <div className="App1">
                            <div className="textContainer">
                                {Math.round(Number(BS.score_m))}
                                <div className="minute">Balance Score</div>
                            </div>
                            <CircleSlider
                                ref={slider}
                                value={Math.round(Number(BS.score_m))}
                                stepSize={5}
                                size={250}
                                max={500}
                                gradientColorFrom="#ec008c"
                                gradientColorTo="#31356e"
                                knobRadius={20}
                                circleWidth={20}
                                disabled={true} />
                        </div>
                    </center>

                    <div>
                        <HistoryContainerMovement item={movementStore} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={manualAddMovement} alt="addMovementButton" onClick={movementForm} width={300} />
                    </div>
                </>
                : <p>waiting for movement data</p>}
        </>
    );

}


export default Movement;