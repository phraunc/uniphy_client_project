
import HistoryCardSleep from "../HistoryCardComponent/HistoryCardSleep";

function SleepHistoryContainer({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div className="container" key={i} >
            <HistoryCardSleep  prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default SleepHistoryContainer;