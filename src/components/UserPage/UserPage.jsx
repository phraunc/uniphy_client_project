import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from "react";
import { CircleSlider } from "react-circle-slider";
import Progressbar from './ProgressBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import "./UserPage.css";
import { CurrencyYenTwoTone } from '@mui/icons-material';
import { stringify } from 'json5';
import { async } from 'q';
import movementIcon from '../img/movementIcon.png'
import socialIcon from '../img/socialIcon.png'
import occupationIcon from '../img/occupationsIcon.png'
import foodIcon from '../img/snackIcon.png'
import sleepIcon from '../img/sleepIcon.png'
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

function UserPage({ bgcolor, progress, height, onClick }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#41b8d5',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#31356e',
        contrastText: '#FFFFFF',
        width: '200px'
      },
    },
  });

  const slider = useRef(null);

  const user = useSelector((store) => store.user);
  // console.log('INSIDE user', user);
  const BS = useSelector((store) => store.balanceScoreReducer);

  const [myBalanceScore, setMyBalanceScore] = useState(0)

  const dispatch = useDispatch();
  const history = useHistory();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  // console.log('this is our formatted date: ', formattedDate);

  const [todaysDate, setTodaysDate] = useState();

  // const [value, changeValue] = useState(20);


  useEffect(() => {
    // slider.current.setAttribute("width", "280px");
    dispatch({
      type: "GET_BALANCE_SCORE"
    })
  }, []);


  function startDay() {
    // console.log('this is our BS store Data:', BS)
    // console.log('INSIDE startDay')
    dispatch({
      type: 'IS_STARTED'
    })
  }

  function endDay() {
    dispatch({
      type: 'IS_STARTED'
    })
  }

  function StartYourDay() {
    dispatch({
      type: 'POST_BALANCE_SCORE',
    })
    dispatch({
      type: 'IS_STARTED'
    })
  }

  function goToDetails() {
    dispatch({
      type: "GET_BALANCE_SCORE"
    })
    dispatch({
      type: "GET_MY_AVERAGES"
    })
    history.push('/details')
  }


  if (BS.checkDate !== formattedDate || !BS.date) {
    return (<>
      <center>
        <i className="far fa-sun fa-4x" style={{ color: "orangered", backgroundColor: 'yellow', borderRadius: '75%' }} ></i>
      </center>
      <br />
      <center>
        <Button sx={{ backgroundColor: '#FDB750', color: 'white' }} onClick={StartYourDay}>Lets Get Started</Button>
      </center>
    </>)
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <h2 className='welcome'>Welcome, {user.username}!</h2> */}


        <center>
          <div className="App1">
            <div className="textContainer" onClick={goToDetails}>
              {Math.round(Number(BS.score_f) + Number(BS.score_m) + Number(BS.score_o) + Number(BS.score_s) + Number(BS.score_sa))}
              <div className="minute">Balance Score</div>
            </div>
            <CircleSlider
              ref={slider}
              value={Math.round(Number(BS.score_f) + Number(BS.score_m) + Number(BS.score_o) + Number(BS.score_s) + Number(BS.score_sa))}
              stepSize={5}
              // onChange={value => changeValue(value)}
              size={250}
              max={500}
              gradientColorFrom="#ec008c"
              gradientColorTo="#31356e"
              knobRadius={20}
              circleWidth={20}
              disabled={true}
            />
          </div>
        </center>

        <div className="pillar">
          <div className="App">
            {/* <h3 className="heading">Pillars </h3> */}
            {user.is_started ? <>


              <div className="progress-bar-container">
                <div className="icon">
                  <img src={movementIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                  <Progressbar className="progress-bar" parentBgColor="lightgrey" bgcolor="#31356e" pillarName='Movement:' progress={Math.round(Number(BS.score_m))} height={40} onClick={() => history.push("/movement")} />
                </div>
              </div>


              <div className="progress-bar-container">
                <div className="icon">
                  <img src={socialIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                  <Progressbar parentBgColor="lightgrey" bgcolor="#6ce5e8" pillarName='Social:' progress={Math.round(Number(BS.score_sa))} height={40} onClick={() => history.push("/social")} />
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="icon">
                  <img src={occupationIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="lightgrey" bgcolor="#41b8d5" pillarName='Occupation:' progress={Math.round(Number(BS.score_o))} height={40} onClick={() => history.push("/occupation")} />
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="icon">
                  <img src={foodIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="lightgrey" bgcolor="#2f5f98" pillarName='Food:' progress={Math.round(Number(BS.score_f))} height={40} onClick={() => history.push("/food")} />
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="icon">
                  <img src={sleepIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="lightgrey" bgcolor="#704e85" pillarName='Sleep:' progress={Math.round(Number(BS.score_s))} height={40} onClick={() => history.push("/sleep")} />
                </div>
              </div>
              <hr />

              <div className="progress-bar-container">
                <div className="icon">
                  <WorkOutlineIcon />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="lightgrey" bgcolor="#4169e1" pillarName='Work:' progress={Math.round(Number(BS.score_w))} height={40} onClick={() => history.push("/work")} />
                </div>
              </div>
            </> : <>

            <div className="progress-bar-container">
                <div className="icon">
                  <img src={movementIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                  <Progressbar className="progress-bar" parentBgColor="darkgrey" bgcolor="grey" pillarName='Movement:' progress={Math.round(Number(BS.score_m))} height={40}  />
                </div>
              </div>


              <div className="progress-bar-container">
                <div className="icon">
                  <img src={socialIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                  <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Social:' progress={Math.round(Number(BS.score_sa))} height={40}  />
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="icon">
                  <img src={occupationIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Occupation:' progress={Math.round(Number(BS.score_o))} height={40} />
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="icon">
                  <img src={foodIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Food:' progress={Math.round(Number(BS.score_f))} height={40}  />
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="icon">
                  <img src={sleepIcon} alt="Movement Icon" />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Sleep:' progress={Math.round(Number(BS.score_s))} height={40} />
                </div>
              </div>
              <hr />

              <div className="progress-bar-container">
                <div className="icon">
                  <WorkOutlineIcon />
                </div>
                <div className="progress-bar-wrapper">
                <Progressbar parentBgColor="darkgrey" bgcolor="#grey" pillarName='Work:' progress={Math.round(Number(BS.score_w))} height={40} />
                </div>
              </div>
              {/* <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Movement:' progress={Math.round(Number(BS.score_m))} height={40} />
              <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Social:' progress={Math.round(Number(BS.score_sa))} height={40} />
              <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Occupation:' progress={Math.round(Number(BS.score_o))} height={40} />
              <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Food:' progress={Math.round(Number(BS.score_f))} height={40} />
              <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Sleep:' progress={Math.round(Number(BS.score_s))} height={40} />
              <hr />
              <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Work:' progress={Math.round(Number(BS.score_w))} height={40} /> */}

            </>}
          </div>

          {!user.is_started ?
            <Box
              mr={2}
              mt={8}
              className="bottomSpace"
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button variant='contained'
                onClick={startDay}>Start Day</Button>
            </Box>
            : <>
              <Box mt={8} ml={3} className="bottomSpace">
                <Button
                  variant='contained'
                  onClick={endDay}>End Day</Button>
              </Box>
            </>
          }
        </div>
      </div>

    </ThemeProvider>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
