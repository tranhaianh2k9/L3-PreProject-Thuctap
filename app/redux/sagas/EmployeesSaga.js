import { call, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  searchEmployees,
  addEmployees,
  deleteEmployees,
  getEmployeeById,
  updateEmployee,
} from "../api/apiEmployees";
import {
  addEmployeesFail,
  addEmployeesSuccess,
  deleteEmployeesFail,
  deleteEmployeesSuccess,
  getAllEmployeeFail,
  getAllEmployeeRequest,
  getAllEmployeeSuccess,
  getEmployeeByIdFail,
  getEmployeeByIdSuccess,
  updateEmployeesFail,
  updateEmployeesSuccess,
} from "../actions/EmployeeActions";
import {
  ADD_EMPLOYEE_REQUEST,
  ALL_EMPLOYEES_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_DETAIL_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
} from "../constants/EmployeeConstants";
import { STATUS_OF_EMPLOYEE } from "app/Constants/ListStatus";

// Get all
function* getAllEmployeesSaga(action) {
  try {
    const response = yield call(
      searchEmployees,
      action?.payload?.status,
      action?.payload?.page,
      action?.payload?.rowPerPage,
      action?.payload?.keyword
    );
    if (response?.data?.code === 200) {
      yield put(getAllEmployeeSuccess(response?.data));
    } else {
      yield put(getAllEmployeeFail(response?.message));
      toast.error("Lỗi khi lấy dữ liệu");
    }
  } catch (error) {
    yield put(getAllEmployeeFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}
// Thêm
function* addEmployeesSaga(action) {
  try {
    const response = yield call(addEmployees, action.payload);
    if (response?.code === 200) {
      yield put(addEmployeesSuccess(response?.data));
      toast.success("Thêm nhân viên thành công!");
      yield put(
        getAllEmployeeRequest({
          status: STATUS_OF_EMPLOYEE,
          page: 1,
          rowPerPage: 10,
          keyword: "",
        })
      );
    } else {
      yield put(addEmployeesFail(response?.message));
      toast.error(response?.message);
    }
  } catch (error) {
    yield put(addEmployeesFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}
// Xóa
function* deleteEmployeeSaga(action) {
  try {
    yield call(deleteEmployees, action.payload);
    toast.success("Xóa nhân viên thành công!");
    yield put(deleteEmployeesSuccess(action.payload));
    yield put(
      getAllEmployeeRequest({
        status: STATUS_OF_EMPLOYEE,
        page: 1,
        rowPerPage: 10,
        keyword: "",
      })
    );
  } catch (error) {
    yield put(deleteEmployeesFail(error));
    toast.error("Xóa Nhân viên không thành công");
  }
}
// Get by id
function* getEmployeeDetailSaga(action) {
  try {
    const response = yield call(getEmployeeById, action.payload);
    if (response?.code === 200) {
      yield put(getEmployeeByIdSuccess(response?.data));
    } else {
      yield put(getEmployeeByIdFail(response?.message));
    }
  } catch (error) {
    yield put(getEmployeeByIdFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}

// Sửa
function* updateEmployeeSaga(action) {
  try {
    const response = yield call(updateEmployee, action.payload);
    if (response?.code === 200) {
      yield put(updateEmployeesSuccess(response?.data));
      toast.success("Cập nhật thành công");
      yield put(
        getAllEmployeeRequest({
          status: action.status,
          page: 1,
          rowPerPage: 10,
          keyword: "",
        })
      );
    } else {
      yield put(updateEmployeesFail(response?.message));
      toast.error("Sửa không thành công!");
    }
  } catch (error) {
    yield put(updateEmployeesFail("Có lỗi xảy ra khi gọi API"));
    toast.error("Có lỗi xảy ra khi gọi API");
  }
}
export default function* employeesSaga() {
  yield takeEvery(ALL_EMPLOYEES_REQUEST, getAllEmployeesSaga);
  yield takeEvery(ADD_EMPLOYEE_REQUEST, addEmployeesSaga);
  yield takeEvery(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
  yield takeEvery(GET_EMPLOYEE_DETAIL_REQUEST, getEmployeeDetailSaga);
  yield takeEvery(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
}
