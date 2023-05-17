import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getSocialId(action) {
  console.log('here is our payload for getSocialID', action.payload)
  try{
    const foodID = yield axios.get(`./api/social/details/${action.payload}`);
    yield put({ type: 'SET_SOCIAL_ID', payload: foodID.data})
  } catch (err) {
    console.log("error in GET Social id saga.", err)
  }
}

function* getSocial(action) {
  try {
    const socialPillar = yield axios.get("./api/social", action.payload);
    yield put({ type: "SET_SOCIAL", payload: socialPillar.data });
    console.log('this is our social data', socialPillar.data)
  } catch (err) {
    console.log("error in Social GET_Saga", err);
  }
}

function* postSocial(action) {
  console.log('TESTTESTTESTTESTTEST')
  try {
    yield axios.post("./api/social", action.payload);
    yield put({ type: "GET_SOCIAL" });
  } catch (err) {
    console.log("error in social POST_Saga", err);
  }
}

function* putSocial(action) {
  console.log('here is our data to update:', action.payload)
  try {
    yield axios.put(`./api/social/${action.payload.id}`, action.payload);
    yield put({ type: "GET_SOCIAL" });
  } catch (err) {
    console.log("error in social PUT_Saga", err);
  }
}

function* deleteSocial(action) {
  try {
    yield axios.delete(`./api/social/${action.payload}`);
    yield put({ type: "GET_SOCIAL" });
  } catch (err) {
    console.log("error in social delete_Saga", err);
  }
}

function* socialSaga() {
  yield takeEvery("GET_SOCIAL", getSocial);
  yield takeEvery("POST_SOCIAL", postSocial);
  yield takeEvery("UPDATE_SOCIAL", putSocial);
  yield takeEvery("DELETE_SOCIAL", deleteSocial);
  yield takeLatest("GET_SOCIAL_ID", getSocialId)
}

export default socialSaga;
