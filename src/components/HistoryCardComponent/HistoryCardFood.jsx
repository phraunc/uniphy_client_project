import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function HistoryCardFood({ prop }) {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="body2">
          <p>Quality: {prop.quality}</p>
          <p>Quantity: {prop.quantity}</p>
          <p>Snack: {prop.snack}</p>
          <p>Water: {prop.water}</p>
          <p>Fasting: {prop.fasting}</p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      <Box sx={{ minWidth: 275}}>
        <Card variant="outlined" sx={{borderColor: 'black'}}>{card}</Card>
      </Box>
    </>
  );
}

export default HistoryCardFood;
