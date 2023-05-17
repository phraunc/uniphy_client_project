import HistoryCardSocial from "../HistoryCardComponent/HistoryCardSocial";

function HistoryContainer({ item }) {
  return (
    <div class="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div class="container">
            <HistoryCardSocial key={i} prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainer;
