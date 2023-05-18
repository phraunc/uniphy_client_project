import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryWorkContainer from "../HistoryContainer/HistoryWorkContainer"
import backIcon from '../img/backIcon.png'
import manualAddWorkBtn from '../img/manualAddWorkBtn.png';
function Work() {
    const history = useHistory();
    const dispatch = useDispatch();

    const workStore = useSelector(store => store.rootWorkReducer.workReducer)
    const [keyValue, setKeyValue] = useState(0)

    useEffect(() => {
        dispatch({
            type: "GET_WORK"
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
