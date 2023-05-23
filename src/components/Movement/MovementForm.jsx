import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Stopwatch from "../Movement/Stopwatch.jsx";
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Slider,
  Stack,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";

function MovementForm() {

    //     const theme = createTheme({
    //       palette: {
    //         primary: {
    //           main: '#41b8d5',
    //           contrastText: '#FFFFFF',
    //         },
    //         secondary: {
    //           main: '#31356e',
    //           contrastText: '#FFFFFF',
    //         },
    //       },
    //   });

  const history = useHistory();
  const dispatch = useDispatch();

  const [addTitle, setAddTitle] = useState("");
  const [addIntensity, setAddIntensity] = useState(0);
  const [addTime, setAddTime] = useState(0);


  const handleHome = () => {
    // console.log("history test");
    history.push("/home");
  };

  async function addMovement (event) {
    event.preventDefault();
    // console.log('this is the time', addTime)
    const calculatedMovementScore = await movementScoreCalc()
    dispatch({
      type: 'POST_MOVEMENT',
      payload: {
        score_m: calculatedMovementScore.mScore,
        title: addTitle,
        duration: addTime,
        intensity: addIntensity,
        total_points: calculatedMovementScore.totalBalancePoints
      }
    })
    setAddTitle("")
    setAddTime(0)
    setAddIntensity(0)
    dispatch({
      type: "UPDATE_MOVEMENT_SCORE",
      payload: {
        score_m:calculatedMovementScore.mScore,
      }
    })

    history.push("/movement");

  };

  const cancelMovement = () => {
    history.push("/movement")
  }

  async function movementScoreCalc() {
    let totalBalancePoints = 0
    let intensityPoints = 0
    let TimeParts = addTime.split(':')
    let hours = parseInt(TimeParts[0]);
    let minutes = parseInt(TimeParts[1]);
    let seconds = parseInt(TimeParts[2]);
    let addTimeNumber = hours * 3600 + minutes * 60 + seconds;
    let durationPoints = 0 
    if(addTimeNumber/60 > 1) {
      durationPoints = addTimeNumber / 60
    } else {
      durationPoints = 1
    }

    switch (addIntensity) {
      case 0:
        intensityPoints = 1
        break;
      case 1:
        intensityPoints = 1.5
        break;
      case 2:
        intensityPoints = 2
        break;
      case 3:
        intensityPoints = 2.5
        break;
      case 4:
        intensityPoints = 3
        break;
      default:
        qualityPoints = 1
    }
    totalBalancePoints = Number((durationPoints * intensityPoints).toFixed(2))
    let mScore = 0
    if (totalBalancePoints > 100) {
      mScore = 100
    } else if (totalBalancePoints < 0) {
      mScore = 0
    } else {
      mScore = totalBalancePoints
    }
    return (
      {
        mScore,
        totalBalancePoints
      }
    )
  }

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
        <center>
      <Typography mb={4} mt={3} variant="h4" sx={{color: '#457B9D'}} >
        Movement Form
      </Typography>
      </center>
      <div>
        <form onSubmit={addMovement}>
       
        <center>
          <TextField
            label="Activity"
            variant="outlined"
            type="text"
            placeholder="Workout Title"
            value={addTitle}
            onChange={(event) => setAddTitle(event.target.value)} />
        <br/>
        <br/>
         
            <FormControl sx={{minWidth: 195} }>
              {/* <InputLabel>Intensity</InputLabel> */}
              <Select
                value={addIntensity}
                onChange={(event) => setAddIntensity(event.target.value)}>
                <MenuItem value={0}>Low Intensity</MenuItem>
                <MenuItem value={1}>Medium Intensity</MenuItem>
                <MenuItem value={2}>Medium/High Intensity</MenuItem>
                <MenuItem value={3}>High Intensity</MenuItem>
                <MenuItem value={4}>Extreme Intensity</MenuItem>
              </Select>
            </FormControl>
           
            </center>
          <center>
          <Stopwatch addTime={addTime} setAddTime={setAddTime} /> {/* Pass addTime and setAddTime as props */}
          </center>
            <Box
              m={2}
              mt={6}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end">
              <Button variant="contained" type="submit" sx={{backgroundColor: '#457B9D'}}>Submit</Button>
            </Box>

            <Box
              m={2}
              mt={5}
              className="bottomSpace"
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end">
              <Button variant="outlined" onClick={cancelMovement}>Cancel</Button>
            </Box>
        </form>
      </div>
      {/* </ThemeProvider> */}
    </>
   
  );
}

export default MovementForm;