import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getFood(action) {
  try {
    const foodPillar = yield axios.get("./api/food", action.payload);
    yield put({ type: "SET_FOOD", payload: foodPillar.data });
  } catch (err) {
    console.log("error in Food GET_Saga", err);
  }
}

function* postFood(action) {
  try {
    yield axios.post("./api/food", action.payload);
    yield put({ type: "GET_FOOD" });
  } catch (err) {
    console.log("error in Food POST_Saga", err);
  }
}

function* putFood(action) {
  try {
    yield axios.put("./api/food", action.payload);
    yield put({ type: "GET_FOOD" });
  } catch (err) {
    console.log("error in Food PUT_Saga", err);
  }
}

function* deleteFood(action) {
  try {
    yield axios.delete("./api/food", action.payload);
    yield put({ type: "GET_FOOD" });
  } catch (err) {
    console.log("error in Food delete_Saga", err);
  }
}

function* foodSaga() {
  yield takeEvery("GET_FOOD", getFood);
  yield takeEvery("POST_FOOD", postFood);
  yield takeEvery("UPDATE_FOOD", putFood);
  yield takeEvery("DELETE_FOOD", deleteFood);
}

export default foodSaga;
