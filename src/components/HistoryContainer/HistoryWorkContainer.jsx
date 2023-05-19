import HistoryCardWork from "../HistoryCardComponent/HistoryCardWork";

function HistoryWorkContainer({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div className="container"key={i} >
            <HistoryCardWork  prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryWorkContainer;