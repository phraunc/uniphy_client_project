import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
    Typography,
} from "@mui/material";


function EditSleep() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sleepId = useSelector(store => store.rootSleepReducer.sleepReducerSingle)

    const [addQuality, setAddQuality] = useState();
    const [addScreenTime, setScreenTime] = useState();
    const [addStartSleep, setStartSleep] = useState();
    const [addEndSleep, setEndSleep] = useState();
    const [addDuration, setAddDuration] = useState();

    function cancelSleep() {
        history.push("/sleep")
    }

    function saveChanges(event) {
        event.preventDefault()
        dispatch({
            type: 'UPDATE_SLEEP',
            payload: {
                id: sleepId[0].id,
                duration: addDuration,
                quality: addQuality,
                screen_time: addScreenTime,
                start_sleep: addStartSleep,
                end_sleep: addEndSleep,
            }
        })
        history.push('/sleep')
    }

    async function DeleteSleep (event) {
        event.preventDefault();
        const calculatedSleepScore = await sleepScoreCalc();

        dispatch({
            type: 'DELETE_SLEEP',
            payload: sleepId[0].id
        })
        dispatch({
            type: "CURRENT_SLEEP_SCORE",
            payload: {
              score_s:calculatedSleepScore.sScore,
            }
          })
        history.push('/sleep')
    }

    function sleepScoreCalc() {
        let durationPoints = sleepId[0].duration
        let qualityPoints = 0
        let screenPoints = 0
        let totalBalancePoints = 0
        switch (sleepId[0].quality) {
            case 0:
                qualityPoints = .6
                break;
            case 1:
                qualityPoints = .8
                break;
            case 2:
                qualityPoints = 1
                break;
            case 3:
                qualityPoints = 1.11
                break;
            case 4:
                qualityPoints = 1.22
                break;
            case 5:
                qualityPoints = 1.35
                break;
            default:
                qualityPoints = 1
        }
        switch (sleepId[0].screenTime) {
            case 0:
                screenPoints = .8
                break;
            case 1:
                screenPoints = .9
                break;
            case 2:
                screenPoints = 1
                break;
            case 3:
                screenPoints = 1.25
                break;
            default:
                screenPoints = 1
        }

        totalBalancePoints = Number((durationPoints * qualityPoints * screenPoints).toFixed(2))
        let sScore = 0
        if (totalBalancePoints > 100) {
            sScore = 100
        } else if (totalBalancePoints < 0) {
            sScore = 0
        } else {
            sScore = totalBalancePoints
        }
        return (
            {
                sScore,
                totalBalancePoints
            }

        )
    }


    return (<>
    <center>
    <Typography mb={4} mt={3} variant="h4" sx={{color: '#457B9D'}} >
           Sleep Form
      </Typography>
      </center>
        <div>
            <center>
            <form onSubmit={saveChanges}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ minWidth: 195 }}>
                        <InputLabel id="demo-simple-select-label">Screen Time</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addScreenTime}
                            label="quantity"
                            onChange={(event) => setScreenTime(event.target.value)}
                        >
                            <MenuItem value={0}>0 mins</MenuItem>
                            <MenuItem value={1}>15 mins</MenuItem>
                            <MenuItem value={2}>30mins</MenuItem>
                            <MenuItem value={3}>1+ hr</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField
                        label="Start Sleep"
                        variant="outlined"
                        type="number"
                        placeholder="1-100"
                        min="1"
                        max="100"
                        value={addStartSleep}
                        onChange={(event) => setStartSleep(event.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label="End Sleep"
                        variant="outlined"
                        type="number"
                        placeholder="1-100"
                        min="1"
                        max="100"
                        value={addEndSleep}
                        onChange={(event) => setEndSleep(event.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Duration"
                        variant="outlined"
                        type="number"
                        placeholder="1-100"
                        min="1"
                        max="100"
                        value={addDuration}
                        onChange={(event) => setAddDuration(event.target.value)}
                    />
                    <br />
                    <br />
                    <FormControl sx={{ minWidth: 195 }}>
                        <InputLabel id="demo-simple-select-label">Quality</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addQuality}
                            label="quantity"
                            onChange={(event) => setAddQuality(event.target.value)}
                        >
                            <MenuItem value={0}>Horrible</MenuItem>
                            <MenuItem value={1}>Bad</MenuItem>
                            <MenuItem value={2}>Neutral</MenuItem>
                            <MenuItem value={3}>Good</MenuItem>
                            <MenuItem value={4}>Great</MenuItem>
                            <MenuItem value={5}>Excellent</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <Box
                        m={3}
                        mt={3}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="outlined" sx={{ color: '#FF4646', borderColor: '#FF4646', mr: 15 }}  onClick={DeleteSleep}>Delete</Button>
                        <Button variant="contained" type="submit"  sx={{backgroundColor: '#457B9D'}}>Save</Button>
                    </Box>
                    <br />
                    <br />
                    <Box
                        m={3}
                        mt={3}
                        className="bottomSpace"
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="outlined" onClick={cancelSleep} >Cancel</Button>
                    </Box>
                </Box>
            </form>
            </center>
        </div>
    </>)
}

export default EditSleep;