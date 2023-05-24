import { useContext } from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditOccupation from "./OccupationEditForm";
import { SnackbarContext } from '../SnackbarProvider/SnackbarProvider';
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

function OccupationForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [addTitle, setAddTitle] = useState('');
    const [addDuration, setAddDuration] = useState('');
    const [addDescription, setAddDescription] = useState('');


    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const { openSnackbar } = useContext(SnackbarContext);

    const handleClick = () => {
      openSnackbar('Snackbar message!');
    };

    async function addOccupation(event) {
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
        setAddTitle('')
        setAddDuration('')
        setAddDescription('')
        dispatch({
            type: "UPDATE_OCCUPATION_SCORE",
            payload: {
                score_o: calculatedOccupationScore.oScore,
            }
        })
        handleClick();
        history.push("/occupation");
    };

    const cancelOccupation = () => {
        history.push("/occupation")
    }

    async function occupationScoreCalc() {
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
            <center>
                <Typography mb={4} mt={3} variant="h4" sx={{ color: '#457B9D' }} >
                    Occupation Form
                </Typography>
            </center>
            <div>
                <center>
                    <form onSubmit={addOccupation}>
                        <TextField
                            label="Occupation Title"
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
                                label="Duration"
                                variant="outlined"
                                type="number"
                                min='1'
                                max='10'
                                placeholder="Time in minutes"
                                value={addDuration}
                                onChange={(event) => setAddDuration(event.target.value)} />
                            <br />
                            <br />
                            <TextField
                                label="Description"
                                variant="outlined"
                                type="text"
                                placeholder="Decription"
                                value={addDescription}
                                onChange={(event) => setAddDescription(event.target.value)} />
                            <br />
                            <br />
                            <Box
                                m={3}
                                mt={3}
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="flex-end">
                                <Button variant="contained" type="submit" sx={{ backgroundColor: '#457B9D' }}>Submit</Button>
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
                                <Button variant="outlined" onClick={cancelOccupation} >Cancel</Button>
                            </Box>
                        </Box>
                    </form>
                </center>
            </div>
        </>
    );
}

export default OccupationForm;
