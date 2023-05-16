import * as React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, Paper, Grid, styled } from "@mui/material";
import hourglass from '../img/hourglassIcon.png'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function HistoryCardSocial({ prop }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
    </Box>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "2-digit", day: "2-digit", year: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    height: 30,

  }));

  const RightAlignedItem = styled(Item)({
    justifyContent: 'flex-end', // Align content to the right
  });

  function editSocialItem() {
    dispatch({
      type: "GET_SOCIAL_ID",
      payload: prop.id
    })
    history.push(`/social/details/${prop.id}`)
  }



  const card = (
    <React.Fragment>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ border: "none" }}>
            <Grid item xs={6}>
              <Item>{formatDate(prop.date)}</Item>
            </Grid>
            <Grid item xs={6}>
              <RightAlignedItem>{prop.whom}</RightAlignedItem>
            </Grid>
            <Grid item xs={6}>
              <Item><img src={hourglass}
                alt="socialIcon"
                style={{ width: "20px" }}
              />
                {prop.duration}</Item>
            </Grid>
            <Grid item xs={6}>
              <RightAlignedItem> {prop.description}</RightAlignedItem>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </React.Fragment>
  );




  return (
    <>
      <Box sx={{ minWidth: 275 }} onClick={editSocialItem}>
        <Card variant="outlined"
          sx={{
            cursor: 'grab',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(32, 119, 212, 0.6)',
              boxShadow: '0px 0px 0px 5px rgba(0,0,0,0.5)',
              transform: 'scale(1.05)'
            }
          }}>{card}</Card>
      </Box>
    </>
  );
}

export default HistoryCardSocial;
