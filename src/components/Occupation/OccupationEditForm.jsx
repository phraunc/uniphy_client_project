import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from '@mui/material/Modal';
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

function EditOccupation() {
    const dispatch = useDispatch();
    const occupationItemID = useSelector(store => store.rootOccupationReducer.occupationReducerSingle)
    const history = useHistory();
    const [addTitle, setAddTitle] = useState('');
    const [addDuration, setAddDuration] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [openAlert, setOpenAlert] = useState(false)


    useEffect(() => {
        // Update the component state when foodItemID changes
        if (occupationItemID.length > 0) {
            setAddTitle(occupationItemID[0]?.title || '');
            setAddDuration(occupationItemID[0]?.duration || '');
            setAddDescription(occupationItemID[0]?.description || '');

        }
    }, [occupationItemID]);


    const cancelOccupation = () => {
        history.push("/occupation")
    }

    const saveChanges = () => {
        //console.log('This is the occupationItem.id that we are sending our payload', occupationItemID)
        dispatch({
            type: 'UPDATE_OCCUPATION',
            payload: {
                id: occupationItemID[0].id,
                title: addTitle,
                duration: addDuration,
                description: addDescription,
            }
        })
        history.push('/occupation')
    }

    async function DeleteOccupation(event) {
        event.preventDefault();
        const calculatedOccupationScore = await occupationScoreCalc()
        dispatch({
            type: 'DELETE_OCCUPATION',
            payload: occupationItemID[0].id
        })
        dispatch({
            type: "CURRENT_OCCUPATION_SCORE",
            payload: {
                score_o: calculatedOccupationScore.oScore,
            }
        })
        history.push('/occupation')
    }

    function occupationScoreCalc() {
        let totalBalancePoints = 0
        let durationPoints = occupationItemID[0].duration * .75
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

    return (<>
        <center>
            <Typography mb={4} mt={3} variant="h4" sx={{ color: '#457B9D' }} >
                Occupation Form
            </Typography>
        </center>

        <div>
            <center>
                <form onSubmit={saveChanges}>
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
                            type="text"
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
                            m={3}
                            mt={3}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end">
                            <Button variant="outlined" sx={{ mr: 15, color: '#FF4646', borderColor: '#FF4646' }} onClick={() => setOpenAlert(true)}>Delete</Button>
                            <Button variant="contained" type="submit" sx={{ backgroundColor: '#457B9D' }}>Save</Button>
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
                    <Dialog
                        open={openAlert}>
                        <DialogContent>
                            Are you sure you want to Delete?
                        </DialogContent>
                        <Button onClick={DeleteOccupation}>Yes</Button>
                        <Button onClick={() => setOpenAlert(false)}>No</Button>
                    </Dialog>
                </form>
            </center>
        </div>
    </>)
}

export default EditOccupation;