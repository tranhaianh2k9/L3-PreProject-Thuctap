import { call, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLeader, getLeaderById } from "../api/apiLeaders";
import {
  getAllLeadersFail,
  getAllLeadersSuccess,
  getLeaderByIdFail,
  getLeaderByIdSuccess,
} from "../actions/LeaderAction";
import {
  ALL_LEADERS_REQUEST,
  GET_LEADERS_BY_ID_REQUEST,
} from "../constants/LeaderConstants";

function* getAllLeadersSaga() {
  try {
    const response = yield call(getLeader);

    if (response?.code === 200) {
      yield put(getAllLeadersSuccess(response?.data));
    } else {
      yield put(getAllLeadersFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(getAllLeadersFail(error.message));
  }
}

function* getLeaderByIdSaga(action) {
  try {
    const response = yield call(getLeaderById, action.payload);
    if (response?.code === 200) {
      yield put(getLeaderByIdSuccess(response?.data));
    } else {
      yield put(getLeaderByIdFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(getLeaderByIdFail(error.message));
  }
}

export default function* leadersSaga() {
  yield takeEvery(ALL_LEADERS_REQUEST, getAllLeadersSaga);
  yield takeEvery(GET_LEADERS_BY_ID_REQUEST, getLeaderByIdSaga);
}
