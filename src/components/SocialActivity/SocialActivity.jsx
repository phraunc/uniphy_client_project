import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import backIcon from '../img/backIcon.png'
import manualAddFood from '../img/manualAddFoodBtn.png'
import manualAddSocial from '../img/manualAddSocialBtn.png'
import SocialActivityEditForm from "./SocialActivityEditForm.jsx";
import HistoryContainerSocial from '../HistoryContainer/HistoryContainerSocial'
import { CircleSlider } from "react-circle-slider";



function SocialActivity() {
  const history = useHistory();
  const dispatch = useDispatch();
  const socialStore = useSelector(store => store.rootSocialReducer.socialReducer);
  const BS = useSelector((store) => store.balanceScoreReducer);
  const [keyValue, setKeyValue] = useState(0);
  const slider = useRef(null);

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

        <center>
          <div className="App1">
            <div className="textContainer">
              {Math.round(Number(BS.score_sa))}
              <div className="minute">Balance Score</div>
            </div>
            <CircleSlider
              ref={slider}
              value={Math.round(Number(BS.score_sa))}
              stepSize={5}
              size={250}
              max={500}
              gradientColorFrom="#ec008c"
              gradientColorTo="#31356e"
              knobRadius={20}
              circleWidth={20}
              disabled={true} />
          </div>
        </center>

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
