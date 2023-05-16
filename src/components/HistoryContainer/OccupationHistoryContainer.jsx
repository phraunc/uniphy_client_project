import HistoryCardOccupation from "../HistoryCardComponent/HistoryCardOccupation";

function OccupationHistoryContainer({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div className="container" key={i}>
            <HistoryCardOccupation  prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default OccupationHistoryContainer;
