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

function EditWork() {
    const dispatch = useDispatch();
    const workItemID = useSelector(store => store.rootWorkReducer.workReducerSingle)
    const history = useHistory();
    const [addNote, setAddNote] = useState('')
    const [addWorkload, setAddWorkload] = useState('')
    const [addFullfillment, setAddFullfillment] = useState('')
    const [openAlert, setOpenAlert] = useState(false)
    const BS = useSelector((store) => store.balanceScoreReducer.score_w);

    useEffect(() => {
        if (workItemID.length > 0) {
            setAddNote(workItemID[0]?.note || '');
            setAddWorkload(workItemID[0]?.workload || '');
            setAddFullfillment(workItemID[0]?.fullfillment || '');
        }
    }, [workItemID]);

    const cancelWork = () => {
        history.push("/work")
    }

    async function saveChanges() {
        event.preventDefault();
        let calculatedWorkScore = await workScoreCalc()
        const testScore = calculatedWorkScore.wScore

        const newWorkScore = calculatedWorkScore.wScore - BS
        console.log('this is newWorkScore', newWorkScore)

        dispatch({
            type: 'UPDATE_WORK',
            payload: {
                id: workItemID[0].id,
                score_w: testScore,
                note: addNote,
                workload: addWorkload,
                fullfillment: addFullfillment,
            }
        })

        dispatch({
            type: 'UPDATE_WORK_SCORE',
            payload: {
                score_w: newWorkScore,
            }
        })
        history.push('/work')
    }

    async function DeleteWork() {
        const calculatedWorkScore = await workScoreCalc()

        dispatch({
            type: 'DELETE_WORK',
            payload: workItemID[0].id
        })
        dispatch({
            type: 'CURRENT_WORK_SCORE',
            payload: {
                score_w: calculatedWorkScore.wScore,
            }
        })
        history.push('/work')
    }

    async function workScoreCalc() {
        let fulfillmentPoints = 0
        let workLoadPoints = 0
        let totalBalancePoints = 0

        switch (addWorkload) {
            case -5:
                workLoadPoints = 0
                break;
            case -4:
                workLoadPoints = 10
                break;
            case -3:
                workLoadPoints = 20
                break;
            case -2:
                workLoadPoints = 30
                break;
            case -1:
                workLoadPoints = 40
                break;
            case 0:
                workLoadPoints = 50
                break;
            case 1:
                workLoadPoints = 60
                break;
            case 2:
                workLoadPoints = 70
                break;
            case 3:
                workLoadPoints = 80
                break;
            case 4:
                workLoadPoints = 90
                break;
            case 5:
                workLoadPoints = 100
                break;
            default:
                workLoadPoints = 0
        }
        switch (addFullfillment) {
            case 0:
                fulfillmentPoints = 1
                break;
            case 1:
                fulfillmentPoints = 1.1
                break;
            case 2:
                fulfillmentPoints = 1.2
                break;
            case 3:
                fulfillmentPoints = 1.3
                break;
            case 4:
                fulfillmentPoints = 1.4
                break;
            case 5:
                fulfillmentPoints = 1.5
                break;
            case 6:
                fulfillmentPoints = 1.6
                break;
            case 7:
                fulfillmentPoints = 1.7
                break;
            case 8:
                fulfillmentPoints = 1.8
                break;
            case 9:
                fulfillmentPoints = 1.9
                break;
            case 10:
                fulfillmentPoints = 2
                break;

            default:
                fulfillmentPoints = 1
        }

        totalBalancePoints = Number((workLoadPoints * fulfillmentPoints).toFixed(2))
        let wScore = 0
        if (totalBalancePoints > 100) {
            wScore = 100
        } 
        // else if (totalBalancePoints < 0) {
        //     wScore = 0
        // }
         else {
            wScore = totalBalancePoints
        }
        return (
            {
                wScore,
                totalBalancePoints
            }

        )
    }

    return (<>
        <center>
            <Typography mb={4} mt={3} variant="h4" sx={{ color: '#457B9D' }} >
                Work Form
            </Typography>
        </center>
        <div>
            <center>
                <form onSubmit={saveChanges}>
                  
                    <br />
                    <br />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl sx={{ minWidth: 195 }}>
                            <InputLabel id="demo-simple-select-label">Workload</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={addWorkload}
                                label="quantity"
                                onChange={(event) => setAddWorkload(event.target.value)}
                            >
                                <MenuItem value={-5}>Feeling Buried</MenuItem>
                                <MenuItem value={-4}>Drowning In Tasks</MenuItem>
                                <MenuItem value={-3}>Feeling Exhausted</MenuItem>
                                <MenuItem value={-2}>Running On Empty</MenuItem>
                                <MenuItem value={-1}>Treading Water</MenuItem>
                                <MenuItem value={0}>Staying Afloat</MenuItem>
                                <MenuItem value={1}>Finding Balance</MenuItem>
                                <MenuItem value={2}>In The Groove</MenuItem>
                                <MenuItem value={3}>Smooth Sailing</MenuItem>
                                <MenuItem value={4}>Master Of The Craft</MenuItem>
                                <MenuItem value={5}>Overdrive</MenuItem>

                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <TextField
                            label="Work Fullfillment"
                            variant="outlined"
                            type="number"
                            placeholder="1 - 10"
                            min="1"
                            max="10"
                            value={addFullfillment}
                            onChange={(event) => setAddFullfillment(event.target.value)}
                        />
                        <br />
                        <br />
                        <TextField
                                label="Notes"
                                variant="outlined"
                                type="text"
                                placeholder="Notes"

                                value={addNote}
                                onChange={(event) => setAddNote(event.target.value)}
                            />
                        <Box
                            m={3}
                            mt={3}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end">
                            <Button variant="outlined" sx={{ color: '#FF4646', borderColor: '#FF4646', mr: 20 }} onClick={() => setOpenAlert(true)}>Delete</Button>
                            <Button variant="contained" type="submit" sx={{ backgroundColor: '#457B9D' }}>Save </Button>
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
                            <Button variant="outlined" onClick={cancelWork} >Cancel</Button>
                        </Box>
                    </Box>
                    <Dialog
                        open={openAlert}>
                        <DialogContent>
                            Are you sure you want to Delete?
                        </DialogContent>
                        <Button onClick={DeleteWork}>Yes</Button>
                        <Button onClick={() => setOpenAlert(false)}>No</Button>
                    </Dialog>
                </form>
            </center>
        </div>
    </>)
}

export default EditWork;