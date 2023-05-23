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
} from "@mui/material";

function EditWork() {
    const dispatch = useDispatch();
    const workItemID = useSelector(store => store.rootWorkReducer.workReducerSingle)
    const history = useHistory();
    const [addNote, setAddNote] = useState(0)
    const [addWorkload, setAddWorkload] = useState(0)
    const [addFullfillment, setAddFullfillment] = useState(0)
    const [openAlert, setOpenAlert] = useState(false)


    const cancelWork = () => {
        history.push("/work")
    }

    const saveChanges = () => {
        console.log('This is the workItem.id that we are sending our payload', workItemID)
        dispatch({
            type: 'UPDATE_WORK',
            payload: {
                id: workItemID[0].id,
                note: addNote,
                workload: addWorkload,
                fullfillment: addFullfillment,
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

        switch (workItemID[0].workload) {
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
        switch (workItemID[0].fullfillment) {
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
        } else if (totalBalancePoints < 0) {
            wScore = 0
        } else {
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
        <h1>Work Form</h1>
        <div>
            <form onSubmit={saveChanges}>
                <TextField
                    label="Work/School"
                    variant="outlined"
                    type="text"
                    placeholder=""
                    value={addNote}
                    onChange={(event) => setAddNote(event.target.value)}
                />
                <br />
                <br />
                <Box sx={{ minWidth: 120 }}>
                    <TextField
                        label="workload"
                        variant="outlined"
                        type="text"
                        placeholder="Workload"
                        value={addWorkload}
                        onChange={(event) => setAddWorkload(event.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Work Fullfillment"
                        variant="outlined"
                        type="text"
                        placeholder="Fullfilled?"
                        value={addFullfillment}
                        onChange={(event) => setAddFullfillment(event.target.value)}
                    />
                    <br />
                    <br />
                    <Box
                        m={1}
                        mt={3}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="contained" sx={{ backgroundColor: 'red', mr: 15 }} onClick={() => setOpenAlert(true)}>Delete</Button>
                        <Button variant="contained" type="submit" >Save Changes</Button>
                    </Box>
                    <br />
                    <br />
                    <Box
                        m={1}
                        mt={3}
                        className="bottomSpace"
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="contained" onClick={cancelWork} >Cancel</Button>
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
        </div>
    </>)
}

export default EditWork;