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

function EditWork() {
    const dispatch = useDispatch();
    const workItemID = useSelector(store => store.rootWorkReducer.workReducerSingle)
    const history = useHistory();
   const [addNote, setAddNote] = useState(0)
   const [addWorkload, setAddWorkload] = useState(0)
   const [addFullfillment, setAddFullfillment] = useState(0)


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

    function DeleteWork() {
        dispatch({
            type: 'DELETE_WORK',
            payload: workItemID[0].id
        })
        history.push('/work')
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
                        <Button variant="contained" sx={{ backgroundColor: 'red', mr: 15 }} onClick={DeleteWork}>Delete</Button>
                        <Button variant="contained" type="submit" >Save Changes</Button>
                    </Box>
                    <br />
                    <br />
                    <Box
                        m={1}
                        mt={3}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="contained" onClick={cancelWork} >Cancel</Button>
                    </Box>
                </Box>
            </form>
        </div>
    </>)
}

export default EditWork;