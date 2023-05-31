import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import {
    Box,
    Button,
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
    const BS = useSelector((store) => store.balanceScoreReducer.score_o);

    useEffect(() => {
        if (occupationItemID.length > 0) {
            setAddTitle(occupationItemID[0]?.title || '');
            setAddDuration(occupationItemID[0]?.duration || '');
            setAddDescription(occupationItemID[0]?.description || '');
        }
    }, [occupationItemID]);

    const cancelOccupation = () => {
        history.push("/occupation")
    }

    async function saveChanges() {
        event.preventDefault();
        const calculatedOccupationScore = await occupationScoreCalc()
        const testScore = calculatedOccupationScore.oScore
        const newOccupationScore = calculatedOccupationScore.oScore - BS
        console.log('this is newOccupationScore', newOccupationScore)
        dispatch({
            type: 'UPDATE_OCCUPATION',
            payload: {
                id: occupationItemID[0].id,
                score_o: testScore,
                title: addTitle,
                duration: addDuration,
                description: addDescription,
            }
        })

        dispatch({
            type: "UPDATE_OCCUPATION_SCORE",
            payload: {
                score_o: newOccupationScore,
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
                            type="text"
                            placeholder=""
                            value={addDuration}
                            onChange={(event) => setAddDuration(event.target.value)}
                        />
                        <br />
                        <br />
                        <TextField
                            label="Description"
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