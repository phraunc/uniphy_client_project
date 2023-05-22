import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { CircleSlider } from "react-circle-slider";
import Progressbar from './ProgressBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import "./UserPage.css";

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
      },
    },
});

  const slider = useRef(null);

  const user = useSelector((store) => store.user);
  // console.log('INSIDE user', user);
  const BS = useSelector((store) => store.balanceScoreReducer);

  const manageDay = useSelector((store) => store.dayReducer);
  const { day, showPillar } = manageDay;
  const [myBalanceScore, setMyBalanceScore] = useState(0)

  const dispatch = useDispatch();
  const history = useHistory();

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
      type: 'START_DAY'
    })
    dispatch({
      type: 'IS_STARTED'
    })
  }

  function endDay() {
    dispatch({
      type: 'END_DAY'
    })
    dispatch({
      type: 'IS_STARTED'
    })
  }

  function StartYourDay() {
    dispatch({
      type: 'POST_BALANCE_SCORE',
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
  


  if (!BS) {
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
          <Progressbar parentBgColor="lightgrey" bgcolor="#31356e" pillarName='Movement:' progress={Math.round(Number(BS.score_m))} height={40} onClick={() => history.push("/movement")} />
          <Progressbar parentBgColor="lightgrey" bgcolor="#6ce5e8" pillarName='Social:' progress={Math.round(Number(BS.score_sa))} height={40} onClick={() => history.push("/social")} />
          <Progressbar parentBgColor="lightgrey" bgcolor="#41b8d5" pillarName='Occupation:' progress={Math.round(Number(BS.score_o))} height={40} onClick={() => history.push("/occupation")} />
          <Progressbar parentBgColor="lightgrey" bgcolor="#2f5f98" pillarName='Food:' progress={Math.round(Number(BS.score_f))} height={40} onClick={() => history.push("/food")} />
          <Progressbar parentBgColor="lightgrey" bgcolor="#704e85" pillarName='Sleep:' progress={Math.round(Number(BS.score_s))} height={40} onClick={() => history.push("/sleep")} />
          <hr />
          <Progressbar parentBgColor="lightgrey" bgcolor="#4169e1" pillarName='Work:' progress={Math.round(Number(BS.score_w))} height={40} onClick={() => history.push("/work")} />

         
        </> : <>
          <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Movement:' progress={Math.round(Number(BS.score_m))} height={40} />
          <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Social:' progress={Math.round(Number(BS.score_sa))} height={40} />
          <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Occupation:' progress={Math.round(Number(BS.score_o))} height={40} />
          <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Food:' progress={Math.round(Number(BS.score_f))} height={40} />
          <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Sleep:' progress={Math.round(Number(BS.score_s))} height={40} />
          <hr />
          <Progressbar parentBgColor="darkgrey" bgcolor="grey" pillarName='Work:' progress={Math.round(Number(BS.score_w))} height={40} />

        </>}
      </div>

     {!user.is_started ?
      <Box
        mr={3}
        mt={8}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        >
      <Button variant='contained'
      onClick={startDay}>Start Day</Button>
      </Box>
      : <>
      <Box mt={8} ml={4}>
      <Button
      variant='contained'
      onClick={endDay}>End Day</Button>
      </Box>
      </>
     }
      {/* <LogOutButton className="btn" /> */}

      {!user.is_started ?
        <Box
          m={1}
          mt={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end">
          <Button variant='contained'
            onClick={startDay}>Start Day</Button>
        </Box>
        :
        <Button
          variant='contained'
          onClick={endDay}>End Day</Button>
      }
      <br />
      <br />
      <LogOutButton className="btn" />

    </div>
    </ThemeProvider>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
