import HistoryCardMovement from "../Movement/HistoryCardMovement";

function HistoryContainerMovement({ item }) {
  return (
    <div class="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div class="container">
            <HistoryCardMovement key={i} prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainerMovement;