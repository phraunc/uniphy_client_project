import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryWorkContainer from "../HistoryContainer/HistoryWorkContainer"
import backIcon from '../img/backIcon.png'
import manualAddWorkBtn from '../img/manualAddWorkBtn.png';
import { CircleSlider } from "react-circle-slider";



function Work() {
    const history = useHistory();
    const dispatch = useDispatch();

    const workStore = useSelector(store => store.rootWorkReducer.workReducer)
    const BS = useSelector((store) => store.balanceScoreReducer);

    const [keyValue, setKeyValue] = useState(0)
    const slider = useRef(null);



    useEffect(() => {
        dispatch({
            type: "GET_WORK"
        })
        dispatch({
            type: "GET_BALANCE_SCORE"
        })

    }, [])

    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const workForm = () => {
        history.push("/workForm");
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
                            {Math.round(Number(BS.score_w))}
                            <div className="minute">Work Score</div>
                        </div>
                        <CircleSlider
                            ref={slider}
                            value={Math.round(Number(BS.score_w))}
                            stepSize={5}
                            // onChange={value => changeValue(value)}
                            size={250}
                            max={100}
                            gradientColorFrom="#ec008c"
                            gradientColorTo="#31356e"
                            knobRadius={20}
                            circleWidth={20}
                            disabled={true}
                        />
                    </div>
                </center>


                <div>
                    <HistoryWorkContainer item={workStore} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={manualAddWorkBtn} alt="addWorkButton" onClick={workForm} width={300} />
                </div>
            </div>
        </>
    );
}

export default Work;
