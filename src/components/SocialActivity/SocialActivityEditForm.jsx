import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
    const [openAlert, setOpenAlert] = useState(false)
    const BS = useSelector((store) => store.balanceScoreReducer.score_sa);


    useEffect(() => {
        // Update the component state when foodItemID changes
        console.log('SOCIALSSTOREID', socialStoreID)
        if (socialStoreID.length > 0) {
            setAddWhom(socialStoreID[0]?.whom || '');
            setAddDescription(socialStoreID[0]?.description || '');
            setAddDuration(socialStoreID[0]?.duration || '');
            setAddOnline(socialStoreID[0]?.online || '');
            setAddRating(socialStoreID[0]?.rating || '');
        }
    }, [socialStoreID]);

    const cancelFood = () => {
        history.push('/social')
    }

    async function saveChanges() {
        event.preventDefault();
        const calculatedSocialScore = await socialPointsCalc()
        const testScore = calculatedSocialScore.saScore
        const newSocialScore = calculatedSocialScore.saScore - BS
        console.log('this is newSocialScore', newSocialScore)

        dispatch({
            type: 'UPDATE_SOCIAL',
            payload: {
                id: socialStoreID[0].id,
                score_sa: testScore,
                whom: addWhom,
                description: addDescription,
                duration: addDuration,
                online: addOnline,
                rating: addRating,
            }
        })

         dispatch({
            type: "UPDATE_SOCIAL_SCORE",
            payload: {
                score_sa: newSocialScore,
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
        } 
        // else if (totalBalancePoints < 0) {
        //     saScore = 0
        // }
         else {
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
            <Typography mb={4} mt={3} variant="h4" sx={{ color: '#457B9D' }}>
                Social Activity Form
            </Typography>

        </center>
        <div>
            <form onSubmit={saveChanges}>
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
                        <InputLabel id="demo-simple-select-label">How</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addOnline}
                            label="In Person"
                            placeholder="Whom was it with"

                            onChange={(event) => setAddOnline(event.target.value)}>
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


                <Box
                    m={3}
                    mt={3}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                    <Button variant="outlined" sx={{ mr: 15, color: '#FF4646', borderColor: '#FF4646' }} onClick={() => setOpenAlert(true)}>Delete</Button>
                    <Button variant="contained" type="submit" sx={{ backgroundColor: '#457B9D' }} >Save</Button>
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


                <Dialog
                    open={openAlert}>
                    <DialogContent>
                        Are you sure you want to Delete?
                    </DialogContent>
                    <Button onClick={DeleteSocialActivity}>Yes</Button>
                    <Button onClick={() => setOpenAlert(false)}>No</Button>
                </Dialog>
            </form>
        </div>
    </>)
}

export default EditSocialActivity;