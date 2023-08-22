import { call, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addFamily,
  deleteFamily,
  editFamily,
  getFamilyById,
} from "../api/apiFamily";
import {
  addFamilyFail,
  addFamilySuccess,
  deleteFamilyFail,
  deleteFamilySuccess,
  getFamilyByIdRequest,
  getFamilyByIdFail,
  getFamilyByIdSuccess,
  updateFamilyFail,
  updateFamilySuccess,
} from "../actions/FamilyAction";
import {
  ADD_FAMILY_REQUEST,
  ALL_FAMILY_BY_ID_REQUEST,
  DELETE_FAMILY_REQUEST,
  UPDATE_FAMILY_REQUEST,
} from "../constants/FamilyConstants";

// Get by id
function* getFamilyByIdSaga(action) {
  try {
    const response = yield call(getFamilyById, action.payload);

    if (response?.code === 200) {
      yield put(getFamilyByIdSuccess(response?.data));
    } else {
      yield put(getFamilyByIdFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(getFamilyByIdFail(error.message));
  }
}
// Thêm
function* addFamilySaga(action) {
  try {
    const response = yield call(
      addFamily,
      action.payload.id,
      action.payload.family
    );

    if (response?.code === 200) {
      yield put(addFamilySuccess(response?.data));
      yield put(getFamilyByIdRequest(action.payload.id));
      toast.success("Thêm thành công!");
    } else {
      yield put(addFamilyFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(addFamilyFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}
// Sửa
function* updateFamilySaga(action) {
  try {
    const response = yield call(editFamily, action.payload);

    if (response?.code === 200) {
      yield put(updateFamilySuccess(response?.data));
      toast.success("Cập nhật thành công!");
    } else {
      yield put(updateFamilyFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(updateFamilyFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}
function* deleteFamilySaga(action) {
  try {
    yield call(deleteFamily, action.payload);
    yield put(deleteFamilySuccess(action.payload));
    toast.success("Xóa thành công!");
  } catch (error) {
    yield put(deleteFamilyFail(error));
    toast.error("Xóa không thành công");
  }
}
export default function* familySaga() {
  yield takeEvery(ADD_FAMILY_REQUEST, addFamilySaga);
  yield takeEvery(ALL_FAMILY_BY_ID_REQUEST, getFamilyByIdSaga);
  yield takeEvery(UPDATE_FAMILY_REQUEST, updateFamilySaga);
  yield takeEvery(DELETE_FAMILY_REQUEST, deleteFamilySaga);
}
