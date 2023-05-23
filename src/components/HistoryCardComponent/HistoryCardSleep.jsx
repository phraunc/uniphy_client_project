import * as React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, Paper, Grid, styled } from "@mui/material";
import hourglassIcon from '../img/hourglassIcon.png'
import faceSmileIcon from "../img/faceSmileIcon.png"
import faceNeutralIcon from "../img/faceNeutralIcon.png"
import faceFrownIcon from "../img/faceFrownIcon.png"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelect } from "@mui/base";
import { useEffect } from "react";
import { ConstructionOutlined } from "@mui/icons-material";

function HistoryCardSleep({ prop }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [sleepImg, setSleepImg] = useState()
  const sleepStore = useSelector(store => store.rootSleepReducer.sleepReducer)

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

  console.log('uhadfskjhadsf', prop)

  useEffect(() => {
    switch(prop.quality) {
      case 0:
          setSleepImg(faceFrownIcon)
          break;
      case 1:
          setSleepImg(faceFrownIcon)
          break;
      case 2:
        setSleepImg(faceNeutralIcon)
          break;
      case 3:
        setSleepImg(faceSmileIcon)
          break;
      case 4:
        setSleepImg(faceSmileIcon)
          break;
      case 5:
        setSleepImg(faceSmileIcon)
          break;
      default:
        setSleepImg(faceNeutralIcon)
    };
  }, [prop.quality]);

  function editSleepItem() {
    dispatch({
      type: "GET_SLEEP_ID",
      payload: prop.id
    })
    history.push(`/sleep/details/${prop.id}`)
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
            <Item><img src={sleepImg}
                alt="foodIcon"
                style={{ width: "25px" }}
              />
                {prop.quality}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item><img src={hourglassIcon}
                alt="foodIcon"
                style={{ width: "25px" }}
              />
                {prop.duration}</Item>
            </Grid>
            <Grid item xs={6}>
              <RightAlignedItem>Screen Time: {prop.screen_time}</RightAlignedItem>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </React.Fragment>
  );




  return (
    <>
      <Box sx={{ minWidth: 275 }} onClick={editSleepItem}>
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

export default HistoryCardSleep;