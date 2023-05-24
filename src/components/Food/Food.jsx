import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryContainer from "../HistoryContainer/HistoryContainer";
import backIcon from '../img/backIcon.png'
import manualAddFood from '../img/manualAddFoodBtn.png'
import EditFood from "./FoodEditForm";
import { CircleSlider } from "react-circle-slider";
import CircularProgress from '@mui/material/CircularProgress';


function Food() {
  const slider = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const foodStore = useSelector(store => store.rootFoodReducer.foodReducer);
  const BS = useSelector((store) => store.balanceScoreReducer);
  const [keyValue, setKeyValue] = useState(0)

  useEffect(() => {
    dispatch({
      type: "GET_FOOD"
    })
    dispatch({
      type: "GET_BALANCE_SCORE"
    })
  }, [])

  const handleHome = () => {
    // console.log("history test");
    history.push("/home");
  };

  const foodForm = () => {
    history.push("/foodform");
  }

  if (!BS) {
    <CircularProgress color="secondary" />

  } else

  return (
    <>
      <div>
        <img src={backIcon} alt="backButton" onClick={handleHome} />
      </div>
      <div key={keyValue} style={{ backgroundColor: "white" }}>

        <center>
          <div className="App1">
            <div className="textContainer">
              {Math.round(Number(BS.score_f))}
              <div className="minute">Food Score</div>
            </div>
            <CircleSlider
              ref={slider}
              value={Math.round(Number(BS.score_f))}
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
          <HistoryContainer item={foodStore} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={manualAddFood} alt="addFoodButton" onClick={foodForm} width={200} height={50} className="btnBottom"/>
        </div>

      </div>
    </>
  );
}

export default Food;
