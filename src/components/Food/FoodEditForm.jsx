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



function EditFood() {
    const dispatch = useDispatch();
    const foodItemID = useSelector(store => store.rootFoodReducer.foodReducerSingle)
    const history = useHistory();

    const [addQuality, setAddQuality] = useState(1);
    const [addQuantity, setAddQuantity] = useState(0);
    const [addSnack, setAddSnack] = useState(0);
    const [addWater, setAddWater] = useState(0);
    const [addFasting, setAddFasting] = useState(0);
    

    const cancelFood = () => {
        history.push('/food')
    }

    const saveChanges = () => {
        console.log('This is the foodItem.id that we are sending our payload', foodItemID)
        dispatch({
            type: 'UPDATE_FOOD',
            payload: {
                id: foodItemID[0].id,
                quality: addQuality,
                quantity: addQuantity,
                snack: addSnack,
                water: addWater,
                fasting: addFasting,
            }
        })
        history.push('/food')
    }



    return (<>
        <h1>Food Form</h1>
        <div>
            <form onSubmit={saveChanges}>
                <TextField
                    label="Food Quality"
                    variant="outlined"
                    type="number"
                    placeholder="1-100"
                    min="1"
                    max="100"
                    value={addQuality}
                    onChange={(event) => setAddQuality(event.target.value)}
                />
                <br />
                <br />
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addQuantity}
                            label="quantity"
                            onChange={(event) => setAddQuantity(event.target.value)}
                        >
                            <MenuItem value={-5}>Very Hungry</MenuItem>
                            <MenuItem value={-4}>Moderately Hungry</MenuItem>
                            <MenuItem value={-3}>Somewhat Hungry</MenuItem>
                            <MenuItem value={-2}>Hungry</MenuItem>
                            <MenuItem value={-1}>A Little Hungry</MenuItem>
                            <MenuItem value={0}>Feeling Good</MenuItem>
                            <MenuItem value={1}>A Little Too Much</MenuItem>
                            <MenuItem value={2}>Too Much</MenuItem>
                            <MenuItem value={3}>Somewhat Too Much</MenuItem>
                            <MenuItem value={4}>Moderately Too Much</MenuItem>
                            <MenuItem value={5}>Very Full...AMERICA!!</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Snacks</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addSnack}
                            label="snacks"
                            onChange={(event) => setAddSnack(event.target.value)}
                        >
                            <MenuItem value={0}>No Snacks</MenuItem>
                            <MenuItem value={1}>One Snack</MenuItem>
                            <MenuItem value={2}>Two Snacks</MenuItem>
                            <MenuItem value={3}>Three Snacks</MenuItem>
                            <MenuItem value={4}>Four Snacks</MenuItem>
                            <MenuItem value={5}>Five or More Snacks</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Water</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addWater}
                            label="water"
                            onChange={(event) => setAddWater(event.target.value)}
                        >
                            <MenuItem value={0}>0 Ltr</MenuItem>
                            <MenuItem value={1}>.5 Ltr</MenuItem>
                            <MenuItem value={2}>1 Ltr</MenuItem>
                            <MenuItem value={3}>1.5 Ltr</MenuItem>
                            <MenuItem value={4}>2 Ltr</MenuItem>
                            <MenuItem value={5}>2.5 Ltr</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Fasting</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addFasting}
                            label="fasting"
                            onChange={(event) => setAddFasting(event.target.value)}
                        >
                            <MenuItem value={0}>Fewer Then 12</MenuItem>
                            <MenuItem value={1}>12-14 Hrs</MenuItem>
                            <MenuItem value={2}>14-16 Hrs</MenuItem>
                            <MenuItem value={3}>16-24 Hrs</MenuItem>
                            <MenuItem value={4}>24+ Hrs</MenuItem>
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
                        <Button variant="contained" onClick={cancelFood} >Cancel</Button>
                    </Box>
                </Box>


            </form>
        </div>
    </>)
}

export default EditFood;