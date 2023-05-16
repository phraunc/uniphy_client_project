import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditOccupation from "./OccupationEditForm";

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

function OccupationForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [addTitle, setAddTitle] = useState(0);
    const [addDuration, setAddDuration] = useState(0);
    const [addDescription, setAddDescription] = useState(0);


    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const addOccupation = (event) => {
        event.preventDefault();

        dispatch({
            type: 'POST_OCCUPATION',
            payload: {
                title: addTitle,
                duration: addDuration,
                description: addDescription,
            }
        })
        setAddTitle(0)
        setAddDuration(0)
        setAddDescription(0)

        history.push("/occupation");

    };

    const cancelOccupation = () => {
        history.push("/occupation")
    }

    return (
        <>

            <h1>Occupation Form</h1>
            <div>
                <form onSubmit={addOccupation}>
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
                            <Button variant="contained" onClick={cancelOccupation} >Cancel</Button>
                        </Box>
                    </Box>


                </form>
            </div>
        </>
    );
}

export default OccupationForm;
