
import HistoryCardComponent from "../HistoryCardComponent/HistoryCardComponent";


function HistoryContainer ({item}) {


    return (
        <HistoryCardComponent prop1={item.quality}/>
    )
}

export default HistoryContainer;