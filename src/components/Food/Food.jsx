import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Food() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleHome = () => {
    // console.log("history test");
    history.push("/home");
  };

  return (
    <>
      <h1>Food</h1>
      <div>
        <button onClick={handleHome}>back</button>
      </div>
      <div>
        <p>History</p>
      </div>
      <div>
        <button>Add Food</button>
      </div>
    </>
  );
}

export default Food;
