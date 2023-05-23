import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getMovementId(action) {
  // console.log('SAGA GetMovementID', action.payload) getting it here
  try{
    const movementID = yield axios.get(`./api/movement/details/${action.payload}`);
    yield put({ type: 'SET_MOVEMENT_ID', payload: movementID.data})
  } catch (err) {
    console.log("error in get movement id saga.", err)
  }
}

function* getMovement(action) {
    console.log('inside GET saga movement')
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
  // console.log('PUT saga:', action.payload) 
  try {
    yield axios.put(`./api/movement/edit/${action.payload.id}`, action.payload);
    yield put({ type: "GET_MOVEMENT" });
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

function* incrementBalanceMovement(action) {
    // console.log('our update balance score saga:', action.payload)
    try{
      yield axios.put(`./api/movement/increment/`, action.payload)
    } catch (err) {
      console.log('error in update food balance score saga', err)
    }
  }
  
  function* decrementBalanceMovement(action) {
    // console.log('our update balance score saga:', action.payload)
    try{
      yield axios.put(`./api/movement/decrement/`, action.payload)
    } catch (err) {
      console.log('error in update food balance score saga', err)
    }
  }

function* MovementSaga() {
  yield takeEvery("GET_MOVEMENT", getMovement);
  yield takeEvery("POST_MOVEMENT", postMovement);
  yield takeEvery("UPDATE_MOVEMENT", putMovement);
  yield takeEvery("DELETE_MOVEMENT", deleteMovement);
  yield takeLatest("GET_MOVEMENT_ID", getMovementId);
  yield takeLatest("UPDATE_MOVEMENT_SCORE", incrementBalanceMovement);
  yield takeLatest("CURRENT_MOVEMENT_SCORE", decrementBalanceMovement);
}

export default MovementSaga;