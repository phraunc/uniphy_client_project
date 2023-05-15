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
} from "@mui/material";

function FoodForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [addQuality, setAddQuality] = useState(1);
  const [addQuantity, setAddQuantity] = useState(0);

  const handleHome = () => {
    // console.log("history test");
    history.push("/home");
  };

  const addFood = () => {
    console.log("adFood");
  };
  const handleChange = (event) => {
    setAddQuantity(event.target.value);
    console.log("handeChange");
  };

  return (
    <>
      <h1>Food Form</h1>
      <div>
        <form onSubmit={addFood}>
          <input
            type="number"
            placeholder="1-100"
            min="1"
            max="100"
            value={addQuality}
            onChange={(event) => setAddQuality(event.target.value)}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addQuantity}
                label="quantity"
                onChange={handleChange}
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
          </Box>
     
        </form>
      </div>
    </>
  );
}

export default FoodForm;
