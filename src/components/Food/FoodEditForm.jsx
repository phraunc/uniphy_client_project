import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
    FormControl,
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

function EditFood() {
    const dispatch = useDispatch();
    const foodItemID = useSelector(store => store.rootFoodReducer.foodReducerSingle)
    const history = useHistory();
    const [addQuality, setAddQuality] = useState('');
    const [addQuantity, setAddQuantity] = useState('');
    const [addSnack, setAddSnack] = useState('');
    const [addWater, setAddWater] = useState('');
    const [addFasting, setAddFasting] = useState('');
    const [openAlert, setOpenAlert] = useState(false)
    const BS = useSelector((store) => store.balanceScoreReducer.score_f);

    useEffect(() => {
        if (foodItemID.length > 0) {
            setAddQuality(foodItemID[0]?.quality || '');
            setAddQuantity(foodItemID[0]?.quantity || '');
            setAddSnack(foodItemID[0]?.snack || '');
            setAddWater(foodItemID[0]?.water || '');
            setAddFasting(foodItemID[0]?.fasting || '');
        }
    }, [foodItemID]);

    const cancelFood = () => {
        history.push('/food')
    }

    async function saveChanges() {
        event.preventDefault();
        const calculatedFoodScore = await foodScoreCalc()
        const testScore = calculatedFoodScore.fScore
        const newFoodScore = calculatedFoodScore.fScore - BS
        console.log('this is newFoodScore', newFoodScore)
        dispatch({
            type: 'UPDATE_FOOD',
            payload: {
                id: foodItemID[0].id,
                score_f: testScore,
                quality: addQuality,
                quantity: addQuantity,
                snack: addSnack,
                water: addWater,
                fasting: addFasting,
            }
        })
        dispatch({
            type: 'UPDATE_FOOD_SCORE',
            payload: {
                score_f: newFoodScore,
            }
        })
        history.push('/food')
    }

    async function DeleteFood() {
        event.preventDefault();
        const calculatedFoodScore = await foodScoreCalc()

        dispatch({
            type: 'DELETE_FOOD',
            payload: foodItemID[0].id
        })
        dispatch({
            type: 'CURRENT_FOOD_SCORE',
            payload: {
                score_f: calculatedFoodScore.fScore,
            }
        })
        history.push('/food')
    }

    function foodScoreCalc() {
        let qualityPoints = addQuality
        let quantityPoints = 0
        let snackPoints = 0
        let fastingPoints = 0
        let totalBalancePoints = 0
        switch (addQuantity) {
            case -5:
                quantityPoints = 75
                break;
            case -4:
                quantityPoints = 60
                break;
            case -3:
                quantityPoints = 45
                break;
            case -2:
                quantityPoints = 30
                break;
            case -1:
                quantityPoints = 15
                break;
            case 0:
                quantityPoints = 0
                break;
            case 1:
                quantityPoints = 15
                break;
            case 2:
                quantityoints = 30
                break;
            case 3:
                quantityPoints = 45
                break;
            case 4:
                quantityPoints = 60
                break;
            case 5:
                quantityPoints = 75
                break;
            default:
                quantityPoints = 0
        }
        switch (addSnack) {
            case 0:
                snackPoints = 0
                break;
            case 1:
                snackPoints = 10
                break;
            case 2:
                snackPoints = 20
                break;
            case 3:
                snackPoints = 30
                break;
            case 4:
                snackPoints = 40
                break;
            case 5:
                snackPoints = 50
                break;
            default:
                snackPoints = 0
        }
        switch (addFasting) {
            case 0:
                fastingPoints = 1
                break;
            case 1:
                fastingPoints = 1.22
                break;
            case 2:
                fastingPoints = 1.33
                break;
            case 3:
                fastingPoints = 1.44
                break;
            case 4:
                fastingPoints = 1.5
                break;
            default:
                fastingPoints = 1
        }
        totalBalancePoints = Number(((qualityPoints - snackPoints - quantityPoints) * fastingPoints).toFixed(2))
        let fScore = 0
        if (totalBalancePoints > 100) {
            fScore = 100
        } else if (totalBalancePoints < 0) {
            fScore = 0
        } else {
            fScore = totalBalancePoints
        }
        return (
            {
                fScore,
                totalBalancePoints
            }
        )
    }

    return (<>

        <center>
            <Typography mb={4} mt={3} variant="h4" sx={{ color: '#457B9D' }} >
                Food Form
            </Typography>
        </center>
        <div>
            <center>
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
                        <FormControl sx={{ minWidth: 195 }}>
                            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={addQuantity}
                                label="quantity"
                                onChange={(event) => setAddQuantity(event.target.value)}
                            >
                                <MenuItem value={-5}>Very Hungry</MenuItem>
                                <MenuItem value={-4}>Hungry</MenuItem>
                                <MenuItem value={-3}>Moderately Hungry</MenuItem>
                                <MenuItem value={-2}>Somewhat Hungry</MenuItem>
                                <MenuItem value={-1}>A Little Hungry</MenuItem>
                                <MenuItem value={0}>Feeling Good</MenuItem>
                                <MenuItem value={1}>A Little Too Much</MenuItem>
                                <MenuItem value={2}>Somewhat Too Much</MenuItem>
                                <MenuItem value={3}>Moderately Too Much</MenuItem>
                                <MenuItem value={4}>Too Much</MenuItem>
                                <MenuItem value={5}>Very Full</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl sx={{ minWidth: 195 }}>
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
                        <FormControl sx={{ minWidth: 195 }}>
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
                        <FormControl sx={{ minWidth: 195 }}>
                            <InputLabel id="demo-simple-select-label">Fasting</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={addFasting}
                                label="fasting"
                                onChange={(event) => setAddFasting(event.target.value)}
                            >
                                <MenuItem value={0}>Fewer Than 12</MenuItem>
                                <MenuItem value={1}>12-14 Hrs</MenuItem>
                                <MenuItem value={2}>14-16 Hrs</MenuItem>
                                <MenuItem value={3}>16-24 Hrs</MenuItem>
                                <MenuItem value={4}>24+ Hrs</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <Box
                            m={3}
                            mt={3}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end">
                            <Button variant="outlined" sx={{ mr: 15, color: '#FF4646', borderColor: '#FF4646' }} onClick={() => setOpenAlert(true)}>Delete</Button>
                            <Button variant="contained" type="submit" sx={{ backgroundColor: '#2f5f98' }}>Save</Button>
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
                            <Button variant="outlined" onClick={cancelFood} >Cancel</Button>
                        </Box>
                    </Box>
                    <Dialog
                        open={openAlert}>
                        <DialogContent>
                            Are you sure you want to Delete?
                        </DialogContent>
                        <Button onClick={DeleteFood}>Yes</Button>
                        <Button onClick={() => setOpenAlert(false)}>No</Button>
                    </Dialog>

                </form>
            </center>
        </div>
    </>)
}

export default EditFood;