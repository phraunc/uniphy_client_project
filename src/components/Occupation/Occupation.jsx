import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OccupationHistoryContainer from "../HistoryContainer/OccupationHistoryContainer";
import backIcon from '../img/backIcon.png'
import manualAddOccupation from '../img/manualAddNewOccBtn.png'
import EditOccupation from "./OccupationEditForm";

function Occupation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const occupationStore = useSelector(store => store.rootOccupationReducer.occupationReducer)
  const [keyValue, setKeyValue] = useState(0)

  useEffect(() => {
    dispatch({
      type: "GET_OCCUPATION"
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
