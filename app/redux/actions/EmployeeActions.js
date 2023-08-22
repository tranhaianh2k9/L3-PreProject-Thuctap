import {
  ALL_EMPLOYEES_FAIL,
  ALL_EMPLOYEES_REQUEST,
  ALL_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  GET_EMPLOYEE_DETAIL_REQUEST,
  GET_EMPLOYEE_DETAIL_SUCCESS,
  GET_EMPLOYEE_DETAIL_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL
} from "../constants/EmployeeConstants";

// GET ALL EMPLOYEES
export const getAllEmployeeRequest = (payload) => {
  return {
    type: ALL_EMPLOYEES_REQUEST,
    payload: payload,
  };
};

export const getAllEmployeeSuccess = (payload) => {
  return {
    type: ALL_EMPLOYEES_SUCCESS,
    payload: payload,
  };
};

export const getAllEmployeeFail = (payload) => {
  return {
    type: ALL_EMPLOYEES_FAIL,
    payload: payload,
  };
};

// Thêm mới
export const addEmployees = (employee) => {
  return { type: ADD_EMPLOYEE_REQUEST, payload: employee };
};

export const addEmployeesSuccess = (employee) => {
  return { type: ADD_EMPLOYEE_SUCCESS, payload: employee };
};

export const addEmployeesFail = (error) => {
  return { type: ADD_EMPLOYEE_FAIL, payload: error };
};

// Xóa
export const deleteEmployees = (id) => {
  return { type: DELETE_EMPLOYEE_REQUEST, payload: id };
};

export const deleteEmployeesSuccess = (id) => {
  return { type: DELETE_EMPLOYEE_SUCCESS, payload: id };
};

export const deleteEmployeesFail = (error) => {
  return { type: DELETE_EMPLOYEE_FAIL, payload: error };
};

// Get employee by id
export const getEmployeeByIdRequest = (payload) => {
  return {
    type: GET_EMPLOYEE_DETAIL_REQUEST,
    payload: payload,
  };
};

export const getEmployeeByIdSuccess = (payload) => {
  return {
    type: GET_EMPLOYEE_DETAIL_SUCCESS,
    payload: payload,
  };
};

export const getEmployeeByIdFail = (payload) => {
  return {
    type: GET_EMPLOYEE_DETAIL_FAIL,
    payload: payload,
  };
};

// Sửa
export const updateEmployees = (payload, status) => {
  return {
    type: UPDATE_EMPLOYEE_REQUEST,
    payload: payload,
    status: status
  };
};

export const updateEmployeesSuccess = (payload) => {
  return { type: UPDATE_EMPLOYEE_SUCCESS, payload: payload };
};

export const updateEmployeesFail = (error) => {
  return { type: UPDATE_EMPLOYEE_FAIL, payload: error };
};