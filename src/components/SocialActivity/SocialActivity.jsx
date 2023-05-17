import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HistoryContainerSocial from "../HistoryContainer/HistoryContainerSocial";
import backIcon from '../img/backIcon.png'
import manualAddFood from '../img/manualAddFoodBtn.png'
import manualAddSocial from '../img/manualAddSocialBtn.png'
import SocialActivityEditForm from "./SocialActivityEditForm.jsx";

function SocialActivity() {
  const history = useHistory();
  const dispatch = useDispatch();
  const socialStore = useSelector(store => store.rootSocialReducer.socialReducer)
  const [keyValue, setKeyValue] = useState(0)

  useEffect(() => {
    dispatch({
      type: "GET_SOCIAL"
    })
  }, [])

  const handleHome = () => {
    // console.log("history test");
    history.push("/home");
  };

  const socialForm = () => {
    history.push("/socialform");
  }




  return (
    <>
      <div>
        <img src={backIcon} alt="backButton" onClick={handleHome} />
      </div>
      <div key={keyValue} style={{ backgroundColor: "white" }}>
        <div>
          <HistoryContainerSocial item={socialStore} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={manualAddSocial} alt="addFoodButton" onClick={socialForm} width={300} />
        </div>

      </div>
    </>
  );
}

export default SocialActivity;
