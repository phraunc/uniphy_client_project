import backIcon from '../img/backIcon.png';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryContainer from "../HistoryContainer/HistoryContainer";
import manualAddSleep from '../img/manualAddSleepBtn.png'



function Sleep() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sleepStore = useSelector(store => store.rootSleepReducer.sleepReducer)



    useEffect(() => {
        dispatch({
            type: "GET_FOOD"
        })
    }, [])

    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };


    const sleepForm = () => {

    }

    return (
        <>
            <div>
                <img src={backIcon} alt="backButton" onClick={handleHome} />
            </div>
            <div key={1} style={{ backgroundColor: "white" }}>
                <div>
                    <HistoryContainer item={sleepStore} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={manualAddSleep} alt="addSleepButton" onClick={sleepForm} width={300} />
                </div>

            </div>
        </>
    )
}

export default Sleep;