import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getOccupationId(action) {
  console.log('here is our payload for getOccupationID', action.payload)
  try {
    const occupationID = yield axios.get(`./api/occupation/details/${action.payload}`);
    yield put({ type: 'SET_OCCUPATION_ID', payload: occupationID.data })
  } catch (err) {
    console.log("error in get Occupation ID saga.", err)
  }
}

function* getOccupation(action) {
  try {
    const occupationPillar = yield axios.get("./api/occupation", action.payload);
    yield put({ type: "SET_OCCUPATION", payload: occupationPillar.data });
    console.log('this is our occupation data', occupationPillar.data)
  } catch (err) {
    console.log("error in Occupation GET_Saga", err);
  }
}

function* postOccupation(action) {
  try {
    yield axios.post("./api/occupation", action.payload);
    yield put({ type: "GET_OCCUPATION" });
  } catch (err) {
    console.log("error in Occupation POST_Saga", err);
  }
}

function* putOccupation(action) {
  console.log('here is our Occupation data to update:', action.payload)
  try {
    yield axios.put(`./api/occupation/edit/${action.payload.id}`, action.payload);
    yield put({ type: "GET_OCCUPATION" });
  } catch (err) {
    console.log("error in Occupation PUT_Saga", err);
  }
}

function* deleteOccupation(action) {
  try {
    yield axios.delete(`./api/occupation/${action.payload}`);
    yield put({ type: "GET_OCCUPATION" });
  } catch (err) {
    console.log("error in Occupation delete_Saga", err);
  }
}

function* updateBalanceOccupation(action) {
  console.log('our update balance score saga:', action.payload)
  try{
    yield axios.put(`./api/occupation/update/`, action.payload)
  } catch (err) {
    console.log('error in update occupation balance score saga', err)
  }
}

function* OccupationSaga() {
  yield takeEvery("GET_OCCUPATION", getOccupation);
  yield takeEvery("POST_OCCUPATION", postOccupation);
  yield takeEvery("UPDATE_OCCUPATION", putOccupation);
  yield takeEvery("DELETE_OCCUPATION", deleteOccupation);
  yield takeLatest("GET_OCCUPATION_ID", getOccupationId)
  yield takeLatest("UPDATE_OCCUPATION_SCORE", updateBalanceOccupation);
}

export default OccupationSaga;
