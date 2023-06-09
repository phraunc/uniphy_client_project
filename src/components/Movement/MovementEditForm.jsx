import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    FormControl,
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import Modal from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function EditMovement() {
    const dispatch = useDispatch();
    const movementItemID = useSelector(store => store.rootMovementReducer.MovementReducerSingle)
    const history = useHistory();
    const [openAlert, setOpenAlert] = useState(false)
    const [addTitle, setAddTitle] = useState("");
    const [addIntensity, setAddIntensity] = useState('');
    const [addTime, setAddTime] = useState("");
    const BS = useSelector((store) => store.balanceScoreReducer.score_m);

    useEffect(() => {
        // Update the component state when foodItemID changes
        if (movementItemID.length > 0) {
            setAddTitle(movementItemID[0]?.title || '');
            setAddIntensity(movementItemID[0]?.intensity || '');
            setAddTime(movementItemID[0]?.duration || '');
        }
    }, [movementItemID]);


    const cancelMovement = () => {
        history.push('/movement')
    }

   async function saveChanges (){
        event.preventDefault();
        const calculatedMovementScore = await movementScoreCalc();
        const testScore = calculatedMovementScore.mScore
        const newMovementScore = calculatedMovementScore.mScore - BS
        console.log('this is newMovementScore', newMovementScore)
        dispatch({
            type: 'UPDATE_MOVEMENT',
            payload: {
                id: movementItemID[0].id,
                score_m: testScore,
                title: addTitle,
                duration: addTime,
                intensity: addIntensity,
            }
        })

        dispatch({
            type: "UPDATE_MOVEMENT_SCORE",
            payload: {
                score_m: newMovementScore,
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
                score_m: calculatedMovementScore.mScore,
            }
        })
        history.push('/movement')
    }

    async function movementScoreCalc() {
        let totalBalancePoints = 0
        let intensityPoints = 0
        let TimeParts = addTime.split(':')
        let hours = parseInt(TimeParts[0]);
        let minutes = parseInt(TimeParts[1]);
        let seconds = parseInt(TimeParts[2]);
        let addTimeNumber = hours * 3600 + minutes * 60 + seconds;
        let durationPoints = 0
        if (addTimeNumber / 60 > 1) {
            durationPoints = addTimeNumber / 60
        } else {
            durationPoints = 1
        }

        switch (addIntensity) {
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
                intensityPoints = 1
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
            <Typography mb={4} mt={3} variant="h4" sx={{ color: '#457B9D' }}>
                Movement Form
            </Typography>
        </center>
        <div>
            <form onSubmit={saveChanges}>
                <center>
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
                        placeholder="Time 00:00:00"
                        value={addTime}
                        onChange={(event) => setAddTime(event.target.value)} />
                    <br />
                    <br />
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Intensity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addIntensity}
                            label="Intensity"
                            onChange={(event) => setAddIntensity(event.target.value)}
                        > <MenuItem value={0}>Intensity</MenuItem>
                            <MenuItem value={1}>Low Intensity</MenuItem>
                            <MenuItem value={2}>Medium Intensity</MenuItem>
                            <MenuItem value={3}>Medium/High Intensity</MenuItem>
                            <MenuItem value={4}>High Intensity</MenuItem>
                            <MenuItem value={5}>Extrem Intensity</MenuItem>
                        </Select>
                    </FormControl>
                </center>
                <br />
                <br />
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
                    <Button variant="outlined" onClick={cancelMovement} >Cancel</Button>
                </Box>
                <Dialog
                        open={openAlert}>
                        <DialogContent>
                            Are you sure you want to Delete?
                        </DialogContent>
                        <Button onClick={DeleteMovement}>Yes</Button>
                        <Button onClick={() => setOpenAlert(false)}>No</Button>
                    </Dialog>
            </form>
        </div>
    </>)

}

export default EditMovement;