import HistoryCardFood from "../HistoryCardComponent/HistoryCardFood";

function HistoryContainer({ item }) {
  return (
    <div class="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div class="col">
            <HistoryCardFood key={i} prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainer;
