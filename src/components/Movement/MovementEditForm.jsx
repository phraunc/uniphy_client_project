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

    function DeleteMovement() {
        dispatch({
            type: 'DELETE_MOVEMENT',
            payload: movementItemID[0].id
        })
        history.push('/movement')
    }



    return (<>
        <h1>Movement Form</h1>
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
                <Stopwatch addTime={addTime} setAddTime={setAddTime} /> {/* Pass addTime and setAddTime as props */}
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
        </div>
    </>)
}

export default EditMovement;