import '../Movement/Stopwatch.css'
import React from 'react';
import { useState, useEffect } from 'react';


function Stopwatch({ addTime, setAddTime }) {

    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 100)
            }, 100)
        } else {
            clearInterval(interval);
            setAddTime(getFormattedTime(time))
        }

        return () => clearInterval(interval)
    }, [timerOn, time, setAddTime])

    const getFormattedTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        return hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    return (
        <div className="stopWatch">
            <div className="timer">
                <span className="digits">{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
                <span className="digits">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span className="digits">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span className="mili-sec">{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="watch">
                {!timerOn && time === 0 && (
                    <button className="btn1" onClick={() => setTimerOn(true)}><i className="far fa-play-circle fa-4x"></i></button>
                )}
                {timerOn && (
                    <button className="btn1" onClick={() => setTimerOn(false)}><i className="far fa-stop-circle fa-4x"></i></button>
                )}
                {!timerOn && time !== 0 && (
                    <button className="btn1" onClick={() => setTimerOn(true)}><i className="far fa-play-circle fa-2x"></i></button>
                )}
                {!timerOn && time > 0 && (
                    <button className="btn1" onClick={() => setTime(0)}><i className="fas fa-history fa-2x"></i></button>
                )}
            </div>
            <div>

            </div>
        </div>
    );
}

export default Stopwatch;