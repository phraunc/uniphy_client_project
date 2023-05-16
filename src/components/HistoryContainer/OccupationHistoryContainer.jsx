import HistoryCardOccupation from "../HistoryCardComponent/HistoryCardOccupation";

function OccupationHistoryContainer({ item }) {
  return (
    <div class="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div class="container">
            <HistoryCardOccupation key={i} prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default OccupationHistoryContainer;
