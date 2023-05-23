import React from 'react'

  
const Progress_bar = ({bgcolor,progress, height, onClick, score, pillarName, parentBgColor }) => {
     
    const Parentdiv = {
        height: height,
        width: '90%',
        backgroundColor: parentBgColor,
        borderRadius: 10,
        margin: '20px',
        
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:10,
        textAlign: 'left',
      }
      
      const progresstext = {
        display: 'block',
        width: '90%',
        padding: 10,
        color: 'white',
        fontWeight: 900,
        fontSize: '14px'
      }
        
    return (
    <div style={Parentdiv} onClick={onClick}>
      <div style={Childdiv}>
      <span style={progresstext}>{pillarName}{`${progress}`}</span>
      </div>
    </div>
    )
}
  
export default Progress_bar;