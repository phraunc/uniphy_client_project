import React from 'react'
  
const Progress_bar = ({bgcolor,progress,height, onClick, score}) => {
     
    const Parentdiv = {
        height: height,
        width: '90%',
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        margin: '20px 20px 20px 20px',
        
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
       borderRadius:10,
        textAlign: 'left',
      }
      
      const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 900,
      }
        
    return (
    <div style={Parentdiv} onClick={onClick}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}`}</span>
      </div>
    </div>
    )
}
  
export default Progress_bar;