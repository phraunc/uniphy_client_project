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

function EditOccupation() {
    const dispatch = useDispatch();
    const occupationItemID = useSelector(store => store.rootOccupationReducer.occupationReducerSingle)
    const history = useHistory();
    const [addTitle, setAddTitle] = useState(0);
    const [addDuration, setAddDuration] = useState(0);
    const [addDescription, setAddDescription] = useState(0);


    const cancelOccupation = () => {
        history.push("/occupation")
    }

    const saveChanges = () => {
        console.log('This is the occupationItem.id that we are sending our payload', occupationItemID)
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

    function DeleteOccupation() {
        dispatch({
            type: 'DELETE_OCCUPATION',
            payload: occupationItemID[0].id
        })
        history.push('/occupation')
    }

    return (<>
        <h1>Occupation Form</h1>
        <div>
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
                        m={1}
                        mt={3}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Button variant="contained" sx={{ backgroundColor: 'red', mr: 15 }} onClick={DeleteOccupation}>Delete</Button>
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
                        <Button variant="contained" onClick={cancelOccupation} >Cancel</Button>
                    </Box>
                </Box>
            </form>
        </div>
    </>)
}

export default EditOccupation;