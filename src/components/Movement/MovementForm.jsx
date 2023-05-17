import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Stopwatch from "../Movement/Stopwatch.jsx";

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
} from "@mui/material";

function MovementForm() {
  const history = useHistory();
  const dispatch = useDispatch();

const [addTitle, setAddTitle] = useState("");
const [addIntensity, setAddIntensity] = useState(0);
const [addTime, setAddTime] = useState(0);


  const handleHome = () => {
    // console.log("history test");
    history.push("/home");
  };

  const addMovement = (event) => {
    event.preventDefault();

    dispatch({
        type:'POST_MOVEMENT',
        payload: {
            title: addTitle,
            duration: addTime,
            intensity: addIntensity,
        }
    })
    setAddTitle("")
    setAddTime(0)
    setAddIntensity(0)

    history.push("/movement");

  };

  const cancelMovement = ()=>{
    history.push("/movement")
  }

  async function movementScoreCalc() {
    let intensityPoints = 0
    let activityPoints = addtime
  }
 
  return (
    <>
      <h1>Movement Form</h1>
      <div>
        <form onSubmit={addMovement}>
          <TextField
          label="Activity"
          variant="outlined"
            type="text"
            placeholder="Workout Title"
            // min="1"
            // max="100"
            value={addTitle}
            onChange={(event) => setAddTitle(event.target.value)}/>
          <br/>
          <br/>
            <Stopwatch addTime={addTime} setAddTime={setAddTime}/> {/* Pass addTime and setAddTime as props */}
            <br/>
            <br/>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Intensity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addIntensity}
                label="snacks"
                onChange={(event)=>setAddIntensity(event.target.value)}
              >
                <MenuItem value={1}>Low Intensity</MenuItem>
                <MenuItem value={2}>Medium Intensity</MenuItem>
                <MenuItem value={3}>Medium/High Intensity</MenuItem>
                <MenuItem value={4}>High Intensity</MenuItem>
                <MenuItem value={5}>Extreme Intensity</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Box
                m={1}
                mt={3}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
            <Button variant="contained"  type="submit" >Submit</Button>
            </Box>
      
            <Box
                m={1}
                mt={3}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
            <Button variant="contained" onClick={cancelMovement} >Cancel</Button>
            </Box>
          </Box>
      

        </form>
      </div>
    </>
  );
}

export default MovementForm;