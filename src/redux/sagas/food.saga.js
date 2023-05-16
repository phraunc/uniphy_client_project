import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getFoodId(action) {
  // console.log('here is our payload for getfoodID', action.payload)
  try{
    const foodID = yield axios.get(`./api/food/details/${action.payload}`);
    yield put({ type: 'SET_FOOD_ID', payload: foodID.data})
  } catch (err) {
    console.log("error in get food id saga.", err)
  }
}

function* getFood(action) {
  try {
    const foodPillar = yield axios.get("./api/food", action.payload);
    yield put({ type: "SET_FOOD", payload: foodPillar.data });
    console.log('this is our food data', foodPillar.data)
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
  // console.log('here is our data to update:', action.payload)
  try {
    yield axios.put(`./api/food/${action.payload.id}`, action.payload);
    yield put({ type: "GET_FOOD" });
  } catch (err) {
    console.log("error in Food PUT_Saga", err);
  }
}

function* deleteFood(action) {
  try {
    yield axios.delete(`./api/food/${action.payload}`);
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
  yield takeLatest("GET_FOOD_ID", getFoodId)
}

export default foodSaga;
