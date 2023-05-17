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
    duration,
} from "@mui/material";


function FoodForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [addQuality, setAddQuality] = useState(2);
    const [addScreenTime, setScreenTime] = useState(0);
    const [addStartSleep, setStartSleep] = useState();
    const [addEndSleep, setEndSleep] = useState();
    const [addDuration, setAddDuration] = useState();


    function cancelSleep() {
        history.push("/sleep")
    }

    async function addSleep(event) {
        event.preventDefault();
        const calculatedSleepScore = await sleepScoreCalc()
        dispatch({
            type: 'POST_SLEEP',
            payload: {
                score_s: calculatedSleepScore.sScore,
                duration: addDuration,
                quality: addQuality,
                screen_time: addScreenTime,
                start_sleep: addStartSleep,
                end_sleep: addEndSleep,
                total_points: calculatedSleepScore.totalBalancePoints
            }
        });
        setAddQuality(2)
        setScreenTime(0)
        setEndSleep(0)
        setStartSleep(0)
        history.push('/sleep')

    }

    async function sleepScoreCalc() {
        let durationPoints = addDuration
        let qualityPoints = 0
        let screenPoints = 0
        let totalBalancePoints = 0
        switch (addQuality) {
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
        switch (addScreenTime) {
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
        <h1>Sleep Form</h1>
        <div>
            <form onSubmit={addSleep}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
                        m={1}
                        mt={3}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="contained" type="submit" >Submit</Button>
                    </Box>
                    <br />
                    <br />
                    <Box
                        m={1}
                        mt={3}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="contained" onClick={cancelSleep} >Cancel</Button>
                    </Box>
                </Box>
            </form>
        </div>
        <button onClick={sleepScoreCalc}>test score calc</button>
    </>)
}

export default FoodForm;