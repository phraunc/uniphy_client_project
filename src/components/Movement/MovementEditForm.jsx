import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Stopwatch from "./Stopwatch";
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



function EditMovement() {
    const dispatch = useDispatch();
    const movementItemID = useSelector(store => store.rootMovementReducer.MovementReducerSingle)
    const history = useHistory();

    const [addTitle, setAddTitle] = useState("");
    const [addIntensity, setAddIntensity] = useState(0);
    const [addTime, setAddTime] = useState("");


    const cancelMovement = () => {
        history.push('/movement')
    }

    const saveChanges = (event) => {
        event.preventDefault();
        //console.log('movementItem.id in edit movement', movementItemID)
        // console.log('movementItem.id in edit movement', movementItemID)
        dispatch({
            type: 'UPDATE_MOVEMENT',
            payload: {
                id: movementItemID[0].id,
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

    async function DeleteMovement(event) {
        event.preventDefault();
        const calculatedMovementScore = await movementScoreCalc();
        dispatch({
            type: 'DELETE_MOVEMENT',
            payload: movementItemID[0].id
        })
        dispatch({
            type: "CURRENT_MOVEMENT_SCORE",
            payload: {
              score_m:calculatedMovementScore.mScore,
            }
          })
        history.push('/movement')
    }

    async function movementScoreCalc() {
        let totalBalancePoints = 0
        let intensityPoints = 0
        let TimeParts = movementItemID[0].duration.split(':')
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
    
        switch (movementItemID[0].intensity) {
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


    return (<>
    <center>
        <h1>Movement Form</h1>
    </center>
        <div>
            <form onSubmit={saveChanges}>
                <TextField
                    label="Activity"
                    variant="outlined"
                    type="text"
                    placeholder="Workout Title"
                    value={addTitle}
                    onChange={(event) => setAddTitle(event.target.value)} />
                <br />
                <br />
                <TextField
                    label="Duration"
                    variant="outlined"
                    type="text"
                    placeholder="Time"
                    value={addTime}
                    onChange={(event) => setAddTime(event.target.value)} />
                <br />
                <br />
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Intensity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addIntensity}
                            label="snacks"
                            onChange={(event) => setAddIntensity(event.target.value)}
                        > <MenuItem value={0}>Intensity</MenuItem>
                            <MenuItem value={1}>Low Intensity</MenuItem>
                            <MenuItem value={2}>Medium Intensity</MenuItem>
                            <MenuItem value={3}>Medium/High Intensity</MenuItem>
                            <MenuItem value={4}>High Intensity</MenuItem>
                            <MenuItem value={5}>Extrem Intensity</MenuItem>
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
                        <Button variant="contained" sx={{ backgroundColor: 'red', mr: 15 }} onClick={DeleteMovement}>Delete</Button>
                        <Button variant="contained" type="submit">Save Changes</Button>
                    </Box>
                    <br />
                    <br />
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
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    </>)
}

export default EditMovement;