import backIcon from '../img/backIcon.png';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SleepHistoryContainer from "../HistoryContainer/SleepHistoryContainer";
import manualAddSleep from '../img/manualAddSleepBtn.png';
import { CircleSlider } from "react-circle-slider";
import CircularProgress from '@mui/material/CircularProgress';



function Sleep() {
    const history = useHistory();
    const dispatch = useDispatch();
    const slider = useRef(null);
    const sleepStore = useSelector(store => store.rootSleepReducer.sleepReducer);
    const BS = useSelector((store) => store.balanceScoreReducer);



    useEffect(() => {
        dispatch({
            type: "GET_SLEEP"
        })
        dispatch({
            type: "GET_BALANCE_SCORE"
        })
    }, [])

    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };


    const sleepForm = () => {
        history.push('/sleepform')
    }

    if (!BS) {
        <CircularProgress color="secondary" />
      } else
    return (
        <>
            <div>
                <img src={backIcon} alt="backButton" onClick={handleHome} />
            </div>
            <div key={1} style={{ backgroundColor: "white" }}>

                <center>
                    <div className="App1">
                        <div className="textContainer">
                            {Math.round(Number(BS.score_s))}
                            <div className="minute">Sleep Score</div>
                        </div>
                        <CircleSlider
                            ref={slider}
                            value={Math.round(Number(BS.score_s))}
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
                    <SleepHistoryContainer item={sleepStore} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={manualAddSleep} alt="addSleepButton" onClick={sleepForm} width={200} height={60} className="btnBottom"/>
                </div>

            </div>
        </>
    )
}

export default Sleep;