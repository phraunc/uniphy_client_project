import HistoryCardMovement from "../Movement/HistoryCardMovement";

function HistoryContainerMovement({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
         if (i > 2) return null;
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