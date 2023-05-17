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

function SocialActivityForm() {
    const history = useHistory();
    const dispatch = useDispatch();


    const [addWhom, setAddWhom] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [addDuration, setAddDuration] = useState(0);
    const [addOnline, setAddOnline] = useState(true);


    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
    };

    const addSocialActivity = (event) => {
        event.preventDefault();
        console.log('BEFORE')

        dispatch({
            type: 'POST_SOCIAL',
            payload: {
                whom: addWhom,
                description: addDescription,
                duration: addDuration,
                online: addOnline,
            }
        })
        setAddWhom('')
        setAddDescription('')
        setAddDuration(0)
        setAddOnline(false)

        console.log('AFTER')


        history.push("/social");

    };

    const cancelSocialActivity = () => {
        history.push("/social")
    }

    return (
        <>

            <h1>Social Activity</h1>
            <div>
                <form onSubmit={addSocialActivity}>
                    <TextField
                        label="Whom"
                        variant="outlined"
                        type="text"
                        placeholder="Whom was it with"
                        // min="1"
                        // max="100"
                        value={addWhom}
                        onChange={(event) => setAddWhom(event.target.value) }
                    />
                    <br />
                    <br />

                    <TextField
                        label="Notes"
                        variant="outlined"
                        type="text"
                        placeholder="Notes about it"

                        value={addDescription}
                        onChange={(event) => setAddDescription(event.target.value)}
                    />

                    <br />
                    <br />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Where</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={addOnline}
                                label="In Person"
                                placeholder="Whom was it with"

                                onChange={(event) => setAddOnline(event.target.value)}
                            >
                                <MenuItem value={true}>In Person</MenuItem>
                                <MenuItem value={false}>Online</MenuItem>

                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <TextField
                            label="Duration"
                            variant="outlined"
                            type="number"
                            placeholder="Time in minutes"
                            min="1"
                            max="100"
                            value={addDuration}
                            onChange={(event) => setAddDuration(event.target.value)}
                        />

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
                            <Button variant="contained" onClick={cancelSocialActivity} >Cancel</Button>
                        </Box>
                    </Box>


                </form>
            </div>
        </>
    );
}

export default SocialActivityForm;
