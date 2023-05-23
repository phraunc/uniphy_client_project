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



function EditSocialActivity() {
    const dispatch = useDispatch();
    const socialStoreID = useSelector(store => store.rootSocialReducer.socialReducer)
    const history = useHistory();

    const [addWhom, setAddWhom] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [addDuration, setAddDuration] = useState(0);
    const [addOnline, setAddOnline] = useState(true);
    const [addRating, setAddRating] = useState(1)




    const cancelFood = () => {
        history.push('/social')
    }

    const saveChanges = () => {
        //console.log('This is the SocialActivity.id that we are sending our payload', socialStoreID)
        dispatch({
            type: 'UPDATE_SOCIAL',
            payload: {
                id: socialStoreID[0].id,
                whom: addWhom,
                description: addDescription,
                duration: addDuration,
                online: addOnline,
                rating: addRating,
            }

        })
        history.push('/social')
    }

    async function DeleteSocialActivity() {
        const calculatedSocialScore = await socialPointsCalc()
        dispatch({
            type: 'DELETE_SOCIAL',
            payload: socialStoreID[0].id
        })
        dispatch({
            type: "CURRENT_SOCIAL_SCORE",
            payload: {
                score_sa: calculatedSocialScore.saScore,
            }
        })
        history.push('/social')
    }

    function socialPointsCalc() {
        let durationPoints = socialStoreID[0].duration
        let ratingPoints = 0
        let totalBalancePoints = 0
        switch (socialStoreID[0].rating) {
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



    return (<>

        <center>
            <Typography mb={4} mt={3} variant="h4" sx={{ color: '#6ce5e8' }}>
                Social Activity Edit Form
            </Typography>

        </center>
        <div>
            <FormControl onSubmit={saveChanges}>
                <center>
                 
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
                    <FormControl sx={{ minWidth: 200 }}>
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
                    <FormControl sx={{ minWidth: 200 }}>
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
                        max="100"
                        value={addDuration}
                        onChange={(event) => setAddDuration(event.target.value)}
                    />
                    <br />
                    <br />

                    <TextField
                        label="Notes"
                        variant="outlined"
                        type="text"
                        placeholder="Whom was it with"

                        value={addDescription}
                        onChange={(event) => setAddDescription(event.target.value)}
                    />
                </center>



                <br />
                <br />

                <Box
                    m={3}
                    mt={3}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                    <Button variant="outlined" sx={{ mr: 20, color: '#FF4646', borderColor: '#FF4646' }}onClick={DeleteSocialActivity}>Delete</Button>
                    <Button variant="contained" type="submit" sx={{ backgroundColor: '#6ce5e8' }} >Save</Button>
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
                    <Button variant="outlined" onClick={cancelFood} >Cancel</Button>
                </Box>
            </FormControl>
        </div>
    </>)
}

export default EditSocialActivity;