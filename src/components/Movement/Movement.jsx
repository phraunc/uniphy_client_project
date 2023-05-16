import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryContainerMovement from "../Movement/HistoryContainerMovement";
import backIcon from '../img/backIcon.png'
import manualAddMovement from '../img/manualAddMovementBtn.png' 
import Stopwatch from "../Movement/Stopwatch.jsx";



function Movement() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movementStore = useSelector(store => store.rootMovementReducer.MovementReducer)
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

      <div>
        <img src={backIcon} alt="backButton" onClick={handleHome} />
      </div>
      <div key={keyValue} style={{ backgroundColor: "white" }}></div>
      <div>
        <HistoryContainerMovement item={movementStore} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={manualAddMovement} alt="addMovementButton" onClick={movementForm} width={300} />
      </div>
    </>
  );
}

export default Movement;