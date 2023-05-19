import HistoryCardMovement from "../Movement/HistoryCardMovement";

function HistoryContainerMovement({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div className="container" key={i}>
            <HistoryCardMovement  prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainerMovement;