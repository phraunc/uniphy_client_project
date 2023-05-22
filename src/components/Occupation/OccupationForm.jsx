import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditOccupation from "./OccupationEditForm";

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

function OccupationForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [addTitle, setAddTitle] = useState('');
    const [addDuration, setAddDuration] = useState(0);
    const [addDescription, setAddDescription] = useState('');


    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    async function addOccupation  (event)  {
        event.preventDefault();
        const calculatedOccupationScore = await occupationScoreCalc()
        dispatch({
            type: 'POST_OCCUPATION',
            payload: {
                score_o: calculatedOccupationScore.oScore,
                title: addTitle,
                duration: addDuration,
                description: addDescription,
                total_points: calculatedOccupationScore.totalBalancePoints
            }
        })
        setAddTitle(0)
        setAddDuration(0)
        setAddDescription(0)
        dispatch({
            type: "UPDATE_OCCUPATION_SCORE",
            payload: {
              score_o: calculatedOccupationScore.oScore,
            }
          })

        history.push("/occupation");
    };

    const cancelOccupation = () => {
        history.push("/occupation")
    }

    async function occupationScoreCalc () {
        let totalBalancePoints = 0
        let durationPoints = addDuration * .75
        totalBalancePoints = Number((durationPoints).toFixed(2))
        let oScore = 0
        if (totalBalancePoints > 100) {
            oScore = 100
        } else if (totalBalancePoints < 0) {
            oScore = 0
        } else {
            oScore = totalBalancePoints
        }
        return (
            {
                oScore,
                totalBalancePoints
            }

        )

    }

    return (
        <>

            <h1>Occupation Form</h1>
            <div>
                <form onSubmit={addOccupation}>
                    <TextField
                        label="Occupation title"
                        variant="outlined"
                        type="text"
                        placeholder=""
                        value={addTitle}
                        onChange={(event) => setAddTitle(event.target.value)}
                    />
                    <br />
                    <br />
                    <Box sx={{ minWidth: 120 }}>
                        <TextField
                            label="Occupation duration"
                            variant="outlined"
                            type="number"
                            min='1'
                            max='10'
                            placeholder=""
                            value={addDuration}
                            onChange={(event) => setAddDuration(event.target.value)}
                        />
                        <br />
                        <br />
                        <TextField
                            label="Occupation description"
                            variant="outlined"
                            type="text"
                            placeholder=""
                            value={addDescription}
                            onChange={(event) => setAddDescription(event.target.value)}
                        />
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
                            <Button variant="contained" onClick={cancelOccupation} >Cancel</Button>
                        </Box>
                    </Box>
                </form>
            </div>
        </>
    );
}

export default OccupationForm;
