
import HistoryCardSleep from "../HistoryCardComponent/HistoryCardSleep";

function SleepHistoryContainer({ item }) {
  return (
    <div class="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div class="container">
            <HistoryCardSleep key={i} prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default SleepHistoryContainer;