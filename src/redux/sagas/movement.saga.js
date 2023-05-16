import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getMovementId(action) {
  console.log('here is our payload for getMovementID', action.payload)
  try{
    const movementID = yield axios.get(`./api/movement/details/${action.payload}`);
    yield put({ type: 'SET_MOVEMENT_ID', payload: movementID.data})
  } catch (err) {
    console.log("error in get movement id saga.", err)
  }
}

function* getMovement(action) {
  try {
    const movementPillar = yield axios.get("./api/movement", action.payload);
    yield put({ type: "SET_MOVEMENT", payload: movementPillar.data });
    console.log('this is our movement data', movementPillar.data)
  } catch (err) {
    console.log("error in Movement GET_Saga", err);
  }
}

function* postMovement(action) {
  try {
    yield axios.post("./api/movement", action.payload);
    yield put({ type: "GET_MOVEMENT" });
  } catch (err) {
    console.log("error in Movement POST_Saga", err);
  }
}

function* putMovement(action) {
  console.log('here is our data to update movement:', action.payload)
  try {
    yield axios.put(`./api/movement/${action.payload.id}`, action.payload);
    yield put({ type: "GET_FOOD" });
  } catch (err) {
    console.log("error in Movement PUT_Saga", err);
  }
}

function* deleteMovement(action) {
  try {
    yield axios.delete(`./api/movement/${action.payload}`);
    yield put({ type: "GET_MOVEMENT" });
  } catch (err) {
    console.log("error in Movement delete_Saga", err);
  }
}

function* MovementSaga() {
  yield takeEvery("GET_MOVEMENT", getMovement);
  yield takeEvery("POST_MOVEMENT", postMovement);
  yield takeEvery("UPDATE_MOVEMENT", putMovement);
  yield takeEvery("DELETE_MOVEMENT", deleteMovement);
  yield takeLatest("GET_MOVEMENT_ID", getMovementId)
}

export default MovementSaga;