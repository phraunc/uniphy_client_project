import HistoryCardFood from "../HistoryCardComponent/HistoryCardFood";

function HistoryContainer({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div className="container" key={i} >
            <HistoryCardFood  prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainer;
