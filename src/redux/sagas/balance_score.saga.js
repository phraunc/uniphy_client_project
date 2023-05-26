import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getBalanceScore(action) {
  // console.log('inside GET Balance_score Saga saga', action.payload)
  try {
    const balancePillar = yield axios.get("./api/balancescore", action.payload);
    yield put({ type: 'SET_BALANCE_SCORE', payload: balancePillar.data });
    // console.log('this is our balanceScore data', balancePillar.data)
  } catch (err) {
    console.log("error in balanceScore GET_Saga", err);
  }
}

function* getAverageBalanceScore(action) {
  try {
    const averageBalance = yield axios.get("./api/balancescore/average", action.payload);
    yield put({ type: "SET_AVERAGE_BALANCE_SCORE", payload: averageBalance.data })
  } catch (err) {
    console.log('error in get averages balance score', err)
  }
}

function* postBalanceScore(action) {
  // console.log('this is our post balanceScore payload in balanceScore saga', action.payload)
  try {
    yield axios.post("./api/balancescore");
    yield put({ type: "GET_BALANCE_SCORE" });
  } catch (err) {
    console.log("error in balanceScore POST_Saga", err);
  }
}

function* balanceScoreSaga() {
  yield takeEvery("GET_BALANCE_SCORE", getBalanceScore);
  yield takeEvery("POST_BALANCE_SCORE", postBalanceScore);
  yield takeEvery("GET_MY_AVERAGES", getAverageBalanceScore)
}

export default balanceScoreSaga;