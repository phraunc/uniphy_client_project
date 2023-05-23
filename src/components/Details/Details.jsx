import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import backIcon from '../img/backIcon.png'
import Progressbar from '../UserPage/ProgressBar'
import { Line } from "react-chartjs-2";
import React from "react";
import Chart from 'chart.js/auto';



function DetailsPage ({ bgcolor, progress, height, onClick }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const BS = useSelector((store) => store.balanceScoreReducer);
    const BSaverages = useSelector((store) => store.averageBalanceScoreReducer)
    let [thisThing, setThisThing] = useState(0)

    useEffect(() => {
      // slider.current.setAttribute("width", "280px");
      dispatch({
        type: "GET_MY_AVERAGES"
      })
     dispatch({
        type: "GET_BALANCE_SCORE"
      })

      setThisThing(thisThing+=1)
    }, []);

    const DataforPieChart = [
        {
          title: "Movement",
          balanceScore: BS?.score_m
        },
        {
          title: "Sleep",
          balanceScore: BS?.score_s
        }, 
        {
          title: "Food",
          balanceScore: BS?.score_f
        },
        {
          title: "Occupation",
          balanceScore: BS?.score_o
        },
        {
          title: "Activity",
          balanceScore: BS?.score_sa
        },
      ]
      const AverageDataforPieChart = [
        {
          title: "Movement",
          balanceScore: BSaverages?.movement_score
        },
        {
          title: "Sleep",
          balanceScore: BSaverages?.sleep_score
        }, 
        {
          title: "Food",
          balanceScore: BSaverages?.food_score
        },
        {
          title: "Occupation",
          balanceScore: BSaverages?.occupation_score
        },
        {
          title: "Activity",
          balanceScore: BSaverages?.social_score
        },
      ]
    
        const lineChartData = {
          labels: DataforPieChart.map(data => data.title),
          datasets: [
            {
              label: "Today's Balance Score",
              data: DataforPieChart.map(data => data.balanceScore),
              backgroundColor: [
                "#31356e",
                "#6ce5e8",
                "#41b8d5",
                "#2f5f98 ",
                "#704e85"
      
              ],
              borderColor: "black",
              borderWidth: 1
            }, {
              label: "Your Average Score",
              data: AverageDataforPieChart.map(data => data.balanceScore),
              backgroundColor: [
                "orange",
                "orange",
                "orange",
                "orange",
                "orange"
      
              ],
              borderColor: "orange",
              borderWidth: 1
            }
          ]
    
        }



    const handleHome = () => {
        // console.log("history test");
        history.push("/home");
      };


    if(BSaverages === null) {
      return (
        <p>loading</p>
      )
    } else 
    return ( <>
        <div key={thisThing}>
        <img src={backIcon} alt="backButton" onClick={handleHome} />
      </div>
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>Balance Score Averages</h2>
        <Line
          data={lineChartData}
        />
      </div>
        <Progressbar parentBgColor="lightgrey" bgcolor="#31356e" pillarName= 'Movement:' progress={Math.round(Number(BS.score_m))} height={30}/>
        <Progressbar parentBgColor="lightgrey" bgcolor="orange" pillarName= 'Movement Average:' progress={Math.round(Number(BSaverages.movement_score))} height={30}/>
        <Progressbar parentBgColor="lightgrey" bgcolor="#6ce5e8" pillarName= 'Social:' progress={Math.round(Number(BS.score_sa))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="orange" pillarName= 'Social Average:' progress={Math.round(Number(BSaverages.social_score))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#41b8d5" pillarName= 'Occupation:' progress={Math.round(Number(BS.score_o))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="orange" pillarName= 'Occupation Average:' progress={Math.round(Number(BSaverages.occupation_score))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#2f5f98" pillarName= 'Food:' progress={Math.round(Number(BS.score_f))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="orange" pillarName= 'Food Average:' progress={Math.round(Number(BSaverages.food_score))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#704e85" pillarName= 'Sleep:' progress={Math.round(Number(BS.score_s))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="orange" pillarName= 'Sleep Average:' progress={Math.round(Number(BSaverages.sleep_score))} height={30} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#31356e" pillarName= 'Movement:' progress={Math.round(Number(BS.score_m))} height={40} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#6ce5e8" pillarName= 'Social:' progress={Math.round(Number(BS.score_sa))} height={40} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#41b8d5" pillarName= 'Occupation:' progress={Math.round(Number(BS.score_o))} height={40} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#2f5f98" pillarName= 'Food:' progress={Math.round(Number(BS.score_f))} height={40} />
        <Progressbar parentBgColor="lightgrey" bgcolor="#704e85" pillarName= 'Sleep:' progress={Math.round(Number(BS.score_s))} height={40} />
        {/* <Progressbar bgcolor="purple" progress={BS.score_w} height={40} onClick={() => history.push("/work")} /> */}
      </>)
}

export default DetailsPage