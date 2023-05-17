import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import WorkEdit from "./WorkEditForm";

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

function WorkForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [addNote, setAddNote] = useState(0)
    const [addWorkload, setAddWorkload] = useState(0)
    const [addFullfillment, setAddFullfillment] = useState(0)
 


    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const addWork = (event) => {
        event.preventDefault();
   console.log('addnote', addNote, 'addWorkload', addWorkload, 'addFullfillment', addFullfillment);
        dispatch({
            type: 'POST_WORK',
            payload: {
                note: addNote,
                workload: addWorkload,
                fullfillment: addFullfillment,
            }
        })
        setAddNote(0)
        setAddWorkload(0)
        setAddFullfillment(0)

        history.push("/work");
    };

    const cancelWork = () => {
        history.push("/work")
    }

    return (
        <>

            <h1>Work Form</h1>
            <div>
                <form onSubmit={addWork}>
                    <TextField
                        label="Work Note"
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
                            label="Work Workload"
                            variant="outlined"
                            type="text"
                            placeholder=""
                            value={addWorkload}
                            onChange={(event) => setAddWorkload(event.target.value)}
                        />
                        <br />
                        <br />
                        <TextField
                            label="Work Fullfillment"
                            variant="outlined"
                            type="text"
                            placeholder=""
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
                            <Button variant="contained" onClick={cancelWork} >Cancel</Button>
                        </Box>
                    </Box>
                </form>
            </div>
        </>
    );
}

export default WorkForm;
