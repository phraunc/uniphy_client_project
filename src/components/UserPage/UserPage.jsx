import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { CircleSlider } from "react-circle-slider";
import Progressbar from './ProgressBar';


// import "./styles.css";

function UserPage({bgcolor,progress,height}) {


  const user = useSelector((store) => store.user);


  const [value, changeValue] = useState(20);
  const slider = useRef(null);

  useEffect(() => {
    // slider.current.setAttribute("width", "280px");
    console.log(value);
  }, [value]);



  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>

      <div className="textContainer">
        {value}
        <div className="minute">MINUTES</div>
      </div>
      <CircleSlider
        ref={slider}
        value={value}
        stepSize={5}
        onChange={value => changeValue(value)}
        size={250}
        max={120}
        gradientColorFrom="#ec008c"
        gradientColorTo="#fc6767"
        knobRadius={20}
        circleWidth={20}
      />
      <h3>components below</h3>

      <div className="App">
     <h3 className="heading">Progress Bar</h3>
      <Progressbar bgcolor="orange" progress='30'  height={30} />
      <Progressbar bgcolor="red" progress='60'  height={30} />
      <Progressbar bgcolor="#99ff66" progress='50'  height={30} />
      <Progressbar bgcolor="#ff00ff" progress='85'  height={30} />
      <Progressbar bgcolor="#99ccff" progress='95'  height={30} />
      <Progressbar bgcolor="#99ccff" progress='95'  height={30} />

   </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
