import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { CircleSlider } from "react-circle-slider";
import Progressbar from './ProgressBar';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

function UserPage({ bgcolor, progress, height, onClick }) {


  const user = useSelector((store) => store.user);
  const BS = useSelector((store) => store.balanceScoreReducer);

  const dispatch = useDispatch();
  const history = useHistory();



  const [value, changeValue] = useState(20);
  const slider = useRef(null);

  useEffect(() => {
    // slider.current.setAttribute("width", "280px");
    dispatch({
      type: "GET_BALANCE_SCORE"
    })
    console.log(value);
  }, [value]);





  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>

      <div className="textContainer">
        {value}
      </div>
      <center>
        <CircleSlider
          ref={slider}
          value={value}
          stepSize={5}
          onChange={value => changeValue(value)}
          size={250}
          max={500}
          gradientColorFrom="#ec008c"
          gradientColorTo="#fc6767"
          knobRadius={15}
          circleWidth={25}
        />
      </center>

      <h3>components below</h3>

      <div className="App">
        <h3 className="heading">Pillars </h3>
        <Progressbar bgcolor="#31356e" progress={BS.score_m} height={40} onClick={() => history.push("/movement")} />
        <Progressbar bgcolor="#6ce5e8" progress={BS.score_sa} height={40} onClick={() => history.push("/social")} />
        <Progressbar bgcolor="#41b8d5" progress={BS.score_o} height={40} onClick={() => history.push("/occupation")} />
        <Progressbar bgcolor="#2f5f98" progress={BS.score_f} height={40} onClick={() => history.push("/food")} />
        <Progressbar bgcolor="#704e85" progress={BS.score_s} height={40} onClick={() => history.push("/sleep")} />
        {/* <Progressbar bgcolor="purple" progress={BS.score_w} height={40} onClick={() => history.push("/work")} /> */}

      </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
