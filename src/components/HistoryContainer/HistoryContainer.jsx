import HistoryCardComponent from "../HistoryCardComponent/HistoryCardComponent";

function HistoryContainer({ item }) {
  return (
    <div class="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div class="col">
            <HistoryCardComponent key={i} prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainer;
