import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryContainer from "../HistoryContainer/HistoryContainer";
import backIcon from '../img/backIcon.png'
import manualAddFood from '../img/manualAddFoodBtn.png'

function Food() {
  const history = useHistory();
  const dispatch = useDispatch();
  const foodStore = useSelector(store => store.foodReducer)

  useEffect(() => {
    dispatch({
      type: "GET_FOOD"
    })
  }, [])

  const handleHome = () => {
    // console.log("history test");
    history.push("/home");
  };

  const foodForm = () => {
    history.push("/foodform");
  }

  return (
    <>
      <div>
        <img src={backIcon} alt="backButton" onClick={handleHome} />
      </div>
      <div style={{ backgroundColor: "white" }}>
        <HistoryContainer item={foodStore} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={manualAddFood} alt="addFoodButton" onClick={foodForm} width={300} />
      </div>
    </>
  );
}

export default Food;
