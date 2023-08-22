import { call, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListPendingProposal, getListProposalByEmployeeId,createProposal , deleteProposal ,updateProposal} from "../api/apiProposal";
import {
    getListPendingProposalFail,
    getListPendingProposalSuccess,
    getListProposalByEmployeeIdSuccess,
    getListProposalByEmployeeIdFail,
    createProposalSuccess,
    createProposalFail,
    deleteProposalSuccess,
    deleteProposalFail,
    getListProposalByEmployeeIdRequest,
    updateProposalFail,
    updateProposalSuccess,
    getListPendingProposalRequest
  } from "../actions/ProposalAction";

  import * as EC from "../constants/ProposalConstants";

  function* getListPendingProposalSaga() {
    try {
      const response = yield call(getListPendingProposal);
      if (response?.code === 200) {
        yield put(getListPendingProposalSuccess(response?.data));
      } else {
        yield put(getListPendingProposalFail(response?.message));
        toast.error(response?.message);
      }
    } catch (error) {
      yield put(getListPendingProposalFail("Có lỗi khi lấy API"));
      toast.error("Có lỗi khi lấy API");
    }
  }
  
  function* getListProposalByEmployeeIdSaga(action) {
    try {
      const response = yield call(getListProposalByEmployeeId, action?.employeeId);
      if (response?.code === 200) {
        yield put(getListProposalByEmployeeIdSuccess(response?.data));
      } else {
        yield put(getListProposalByEmployeeIdFail(response?.message));
        toast.error(response?.message);
      }
    } catch (error) {
      yield put(getListProposalByEmployeeIdFail("Có lỗi khi lấy API"));
      toast.error("Có lỗi khi lấy API");
    }
  }
  
  function* createProposalSaga(action) {
    try {
      const response = yield call(createProposal, action?.payload, action?.id);
      if (response?.code === 200) {
        yield put(createProposalSuccess(response?.data));
        toast.success("Thành công");
        yield put(getListProposalByEmployeeIdRequest(action?.id));
      } else {
        yield put(createProposalFail(response?.message));
        toast.error(response?.message);
      }
    } catch (error) {
      yield put(createProposalFail("Có lỗi khi lấy API"));
      toast.error("Có lỗi khi lấy API");
    }
  }
  
  function* deleteProposalSaga(action) {
    try {
      const response = yield call(deleteProposal, action?.payload);
      if (response?.code === 200) {
        yield put(deleteProposalSuccess(response?.data));
        toast.success("Xóa Thành công");
        yield put(getListProposalByEmployeeIdRequest(action?.employeeId));
      } else {
        yield put(deleteProposalFail(response?.message));
        toast.error(response?.message);
      }
    } catch (error) {
      yield put(deleteProposalFail("Có lỗi khi lấy API"));
      toast.error("Có lỗi khi lấy API");
    }
  }
  
  function* updateProposalSaga(action) {
    try {
      const response = yield call(updateProposal, action?.payload?.id, action?.payload);
      if (response?.code === 200) {
        yield put(updateProposalSuccess(response?.data));
        toast.success("Cập nhật Thành công");
        if (action?.employeeId) {
          yield put(getListProposalByEmployeeIdRequest(action?.employeeId));
        } else {
          yield put(getListPendingProposalRequest());
        }
      } else {
        yield put(updateProposalFail(response?.message));
        toast.error(response?.message);
      }
    } catch (error) {
      yield put(updateProposalFail("Có lỗi khi lấy API"));
      toast.error("Có lỗi khi lấy API");
    }
  }

  export default function* ProposalSaga() {
    yield takeEvery(EC.GET_LIST_PROPOSAL_BY_EMPLOYEE_ID_REQUEST , getListProposalByEmployeeIdSaga);
    yield takeEvery(EC.CREATE_PROPOSAL_REQUEST , createProposalSaga);
    yield takeEvery(EC.DELETE_PROPOSAL_REQUEST, deleteProposalSaga);
    yield takeEvery(EC.UPDATE_PROPOSAL_REQUEST, updateProposalSaga);
    yield takeEvery(EC.GET_LIST_PENDING_PROPOSAL_REQUEST, getListPendingProposalSaga);
  }
  