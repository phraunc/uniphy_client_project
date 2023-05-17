
import React from 'react';
import { useState, useEffect } from 'react';


function Stopwatch({addTime, setAddTime}) {

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [stoppedTime, setStoppedTime] = useState(null);

  useEffect(() => {
 let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 100)
      }, 100)
    } else {
      clearInterval(interval);
    //   setStoppedTime(time);
    setAddTime(getFormattedTime(time))
    }

    return () => clearInterval(interval)
  }, [timerOn, time, setAddTime])

//   const handleSubmit = (event) => {
//     const hours = Math.floor(time / 3600000);
//     const minutes = Math.floor(time / 60000);
//     const seconds = ((time % 60000) / 1000).toFixed(0);
//     console.log('HERERERRE', minutes, seconds)
//     setStoppedTime(hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
//     console.log('this is in the handleStop', hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds)

//     setAddTime(hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
//   }

const getFormattedTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}

  return (
    <div className="App">
      <div className="timer">
        <span className="digits">{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
        <span className="digits">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span className="digits">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span className="mili-sec">{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>
        {!timerOn && time === 0 && (
          <button className="btn" onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && (
          <button className="btn" onClick={() => setTimerOn(false)}>Stop</button>
        )}
        {!timerOn && time !== 0 && (
          <button className="btn" onClick={() => setTimerOn(true)}>Resume</button>
        )}
        {!timerOn && time > 0 && (
          <button className="btn" onClick={() => { setTime(0); setStoppedTime(null); }}>Reset</button>
        )}
      </div>
      <div>

        {/* <button className="submitBtn" onClick={handleSubmit}>Submit Time</button> */}
        {stoppedTime && (
            <div>
                Stoppped Time: {stoppedTime}
            </div>
        )}

      </div>
    </div>
  );
}

export default Stopwatch;