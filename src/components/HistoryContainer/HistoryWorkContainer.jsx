import HistoryCardWork from "../HistoryCardComponent/HistoryCardWork";

function HistoryWorkContainer({ item }) {
  return (
    <div class="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div class="container">
            <HistoryCardWork key={i} prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryWorkContainer;