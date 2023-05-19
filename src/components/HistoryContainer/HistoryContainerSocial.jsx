import HistoryCardSocial from "../HistoryCardComponent/HistoryCardSocial";

function HistoryContainer({ item }) {
  return (
    <div className="flex-grid-quarters">
      {item.map((single, i) => {
        return (
          <div className="container" key={i}>
            <HistoryCardSocial  prop={single} />
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainer;
