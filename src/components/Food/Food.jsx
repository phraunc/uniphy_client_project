import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryContainer from "../HistoryContainer/HistoryContainer";
import backIcon from '../img/backIcon.png'
import manualAddFood from '../img/manualAddFoodBtn.png'
import EditFood from "./FoodEditForm";

function Food() {
  const history = useHistory();
  const dispatch = useDispatch();
  const foodStore = useSelector(store => store.foodReducer)
  const [toggleEdit, setToggleEdit] = useState(false)
  const [keyValue, setKeyValue] = useState(0)

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

  const ToEditForm = (event) => {
    event.preventDefault()
    setToggleEdit(true)
    let value = keyValue + 1
    setKeyValue(value)
  }



  return (
    <>
      <div>
        <img src={backIcon} alt="backButton" onClick={handleHome} />
      </div>
      <div key={keyValue} style={{ backgroundColor: "white" }}>
        {toggleEdit ?
        <div onClick={()=> setToggleEdit(false)}>
        <EditFood />
        </div> :
          <div onClick={ToEditForm}>
            <HistoryContainer  item={foodStore} />
          </div>
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={manualAddFood} alt="addFoodButton" onClick={foodForm} width={300} />
      </div>
    </>
  );
}

export default Food;
