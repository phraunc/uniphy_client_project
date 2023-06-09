import { useContext } from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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

function SocialActivityForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [addWhom, setAddWhom] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [addDuration, setAddDuration] = useState('');
    const [addOnline, setAddOnline] = useState('');
    const [addRating, setAddRating] = useState('');

    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const { openSnackbar } = useContext(SnackbarContext);

    const handleClick = () => {
      openSnackbar('Snackbar message!');
    };

    async function addSocialActivity(event) {
        event.preventDefault();
        const calculatedSocialScore = await socialPointsCalc()
        dispatch({
            type: 'POST_SOCIAL',
            payload: {
                score_sa: calculatedSocialScore.saScore,
                whom: addWhom,
                rating: addRating,
                description: addDescription,
                duration: addDuration,
                online: addOnline,
                total_points: calculatedSocialScore.totalBalancePoints
            }
        })
        setAddWhom('')
        setAddDescription('')
        setAddDuration('')
        setAddOnline('')
        // console.log('AFTER')
        dispatch({
            type: "UPDATE_SOCIAL_SCORE",
            payload: {
                score_sa: calculatedSocialScore.saScore,
            }
        })
        handleClick();
        history.push("/social");
    };
    const cancelSocialActivity = () => {
        history.push("/social")
    }
    async function socialPointsCalc() {
        let durationPoints = addDuration
        let ratingPoints = 0
        let totalBalancePoints = 0
        switch (addRating) {
            case 0:
                ratingPoints = .9
                break;
            case 1:
                ratingPoints = 1
                break;
            case 2:
                ratingPoints = 1.1
                break;
            case 3:
                ratingPoints = 1.2
                break;
            case 4:
                ratingPoints = 1.3
                break;
            default:
                ratingPoints = 1
        }
        totalBalancePoints = Number((durationPoints * ratingPoints).toFixed(2))
        let saScore = 0
        if (totalBalancePoints > 100) {
            saScore = 100
        } else if (totalBalancePoints < 0) {
            saScore = 0
        } else {
            saScore = totalBalancePoints
        }
        return (
            {
                saScore,
                totalBalancePoints
            }
        )
    }
    return (
        <>
            <center>
                <Typography mb={4} mt={3} variant="h4" sx={{ color: '#457B9D' }} >
                    Social Activity Form
                </Typography>
            </center>
            <div>
                <center>
                    <form onSubmit={addSocialActivity}>
                        <TextField
                            label="Whom"
                            variant="outlined"
                            type="text"
                            placeholder="Whom was it with"
                            // min="1"
                            // max="100"
                            value={addWhom}
                            onChange={(event) => setAddWhom(event.target.value)}
                        />
                        <br />
                        <br />
                        <FormControl sx={{ minWidth: 195 }}>
                            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={addRating}
                                label="Rating"
                                onChange={(event) => setAddRating(event.target.value)}
                            >
                                <MenuItem value={0}>Meh</MenuItem>
                                <MenuItem value={1}>Ok</MenuItem>
                                <MenuItem value={2}>Good</MenuItem>
                                <MenuItem value={3}>Great</MenuItem>
                                <MenuItem value={4}>Amazing</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ minWidth: 195 }}>
                                <InputLabel id="demo-simple-select-label">How</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={addOnline}
                                    label="In Person"
                                    placeholder="Whom was it with"
                                    onChange={(event) => setAddOnline(event.target.value)}
                                >
                                    <MenuItem value={true}>In Person</MenuItem>
                                    <MenuItem value={false}>Online</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <br />
                            <TextField
                                label="Duration"
                                variant="outlined"
                                type="number"
                                placeholder="Time in minutes"
                                min="1"
                                max="1000"
                                value={addDuration}
                                onChange={(event) => setAddDuration(event.target.value)}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Notes"
                                variant="outlined"
                                type="text"
                                placeholder="Notes about it"
                                value={addDescription}
                                onChange={(event) => setAddDescription(event.target.value)}
                            />
                            <Box
                                m={3}
                                mt={3}
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="flex-end">
                                <Button variant="contained" type="submit" sx={{ backgroundColor: '#457B9D' }} >Submit</Button>
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
                                <Button variant="outlined" onClick={cancelSocialActivity} >Cancel</Button>
                            </Box>
                        </Box>
                    </form>
                </center>
            </div>
        </>
    );
}
export default SocialActivityForm;










