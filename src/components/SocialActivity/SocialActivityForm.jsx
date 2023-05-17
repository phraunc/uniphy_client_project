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
} from "@mui/material";

function SocialActivityForm() {
    const history = useHistory();
    const dispatch = useDispatch();


    const [addWhom, setAddWhom] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [addDuration, setAddDuration] = useState(0);
    const [addOnline, setAddOnline] = useState(true);
    const [addRating, setAddRating] = useState(1)


    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    async function addSocialActivity(event)  {
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
        setAddDuration(0)
        setAddOnline(false)

        console.log('AFTER')


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
                screenPoints = 1
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

            <h1>Social Activity</h1>
            <div>
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={1}
                            label="Rating"
                            onChange={(event) => setAddOnline(event.target.value)}
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Where</InputLabel>
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
                            <Button variant="contained" onClick={cancelSocialActivity} >Cancel</Button>
                        </Box>

                    </Box>


                </form>
            </div>
        </>
    );
}

export default SocialActivityForm;
