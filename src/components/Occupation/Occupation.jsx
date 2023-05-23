import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OccupationHistoryContainer from "../HistoryContainer/OccupationHistoryContainer";
import backIcon from '../img/backIcon.png'
import manualAddOccupation from '../img/manualAddNewOccBtn.png';
import { CircleSlider } from "react-circle-slider";

function Occupation() {
    const slider = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const occupationStore = useSelector(store => store.rootOccupationReducer.occupationReducer);
    const BS = useSelector((store) => store.balanceScoreReducer);

    const [keyValue, setKeyValue] = useState(0)

    useEffect(() => {
        dispatch({
            type: "GET_OCCUPATION"
        })
        dispatch({
            type: "GET_BALANCE_SCORE"
        })
    }, [])

    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const occupationForm = () => {
        history.push("/occupationform");
    }

    return (
        <>
                <div>
                    <img src={backIcon} alt="backButton" onClick={handleHome} />
                </div>
                <div key={keyValue} style={{ backgroundColor: "white" }}>

                    <center>
                        <div className="App1">
                            <div className="textContainer">
                                {Math.round(Number(BS.score_o))}
                                <div className="minute">Occupation Score</div>
                            </div>
                            <CircleSlider
                                ref={slider}
                                value={Math.round(Number(BS.score_o))}
                                stepSize={5}
                                size={250}
                                max={100}
                                gradientColorFrom="#ec008c"
                                gradientColorTo="#31356e"
                                knobRadius={20}
                                circleWidth={20}
                                disabled={true} />
                        </div>
                    </center>

                    <div>
                        <OccupationHistoryContainer item={occupationStore} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={manualAddOccupation} alt="addOccupationButton" onClick={occupationForm} width={300} />
                    </div>
                </div>
        
        </>
    );
}

export default Occupation;
