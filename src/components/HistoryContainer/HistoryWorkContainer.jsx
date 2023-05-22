import HistoryCardWork from "../HistoryCardComponent/HistoryCardWork";

function HistoryWorkContainer({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
         if (i > 2) return null;
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