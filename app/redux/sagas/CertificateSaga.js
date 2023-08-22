import { call, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCertificate,
  deleteCertificate,
  editCertificate,
  getCertificateById,
} from "../api/apiCertificate";
import {
  addCertificateFail,
  addCertificateSuccess,
  deleteCertificateFail,
  deleteCertificateSuccess,
  getCertificateByIdFail,
  getCertificateByIdRequest,
  getCertificateByIdSuccess,
  updateCertificateFail,
  updateCertificateSuccess,
} from "../actions/CertificateAction";
import {
  ADD_CERTIFICATE_REQUEST,
  ALL_CERTIFICATE_BY_ID_REQUEST,
  DELETE_CERTIFICATE_REQUEST,
  UPDATE_CERTIFICATE_REQUEST,
} from "../constants/CertificateConstants";

// Get by id
function* getCertificateByIdSaga(action) {
  try {
    const response = yield call(getCertificateById, action.payload);

    if (response?.code === 200) {
      yield put(getCertificateByIdSuccess(response?.data));
    } else {
      yield put(getCertificateByIdFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(getCertificateByIdFail(error.message));
  }
}
// Thêm
function* addCertificateSaga(action) {
  try {
    const response = yield call(
      addCertificate,
      action.payload.id,
      action.payload.certificate
    );

    if (response?.code === 200) {
      yield put(addCertificateSuccess(response?.data));
      yield put(getCertificateByIdRequest(action.payload.id));
      toast.success("Thêm văn bằng thành công!");
    } else {
      yield put(addCertificateFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(addCertificateFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}
// Sửa
function* updateCertificateSaga(action) {
  try {
    const response = yield call(editCertificate, action.payload);

    if (response?.code === 200) {
      yield put(updateCertificateSuccess(response?.data));
      toast.success("Cập nhật thành công!");
    } else {
      yield put(updateCertificateFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(updateCertificateFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}
function* deleteCertificateSaga(action) {
  try {
    yield call(deleteCertificate, action.payload);
    toast.success("Xóa văn bằng thành công!");
    yield put(deleteCertificateSuccess(action.payload));
  } catch (error) {
    yield put(deleteCertificateFail(error));
    toast.error("Xóa Văn bằng không thành công");
  }
}
export default function* certificateSaga() {
  yield takeEvery(ADD_CERTIFICATE_REQUEST, addCertificateSaga);
  yield takeEvery(ALL_CERTIFICATE_BY_ID_REQUEST, getCertificateByIdSaga);
  yield takeEvery(UPDATE_CERTIFICATE_REQUEST, updateCertificateSaga);
  yield takeEvery(DELETE_CERTIFICATE_REQUEST, deleteCertificateSaga);
}
