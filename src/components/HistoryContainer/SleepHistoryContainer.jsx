
import HistoryCardSleep from "../HistoryCardComponent/HistoryCardSleep";

function SleepHistoryContainer({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
         if (i > 2) return null;
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