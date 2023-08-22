import * as EC from "../constants/SalaryIncreaseConstants";


export const getListPendingSalaryIncreaseRequest = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_SALARY_INCREASE_REQUEST,
      payload: payload,
    };
  };
  
  export const getListPendingSalaryIncreaseSuccess = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_SALARY_INCREASE_SUCCESS,
      payload: payload,
    };
  };
  
  export const getListPendingSalaryIncreaseFail = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_SALARY_INCREASE_FAIL,
      payload: payload,
    };
  };
  
  export const getListSalaryIncreaseByEmployeeIdRequest = (employeeId) => {
    return {
      type: EC?.GET_LIST_SALARY_INCREASE_BY_EMPLOYEE_ID_REQUEST,
      employeeId: employeeId,
    };
  };
  
  export const getListSalaryIncreaseByEmployeeIdSuccess = (employeeId) => {
    return {
      type: EC?.GET_LIST_SALARY_INCREASE_BY_EMPLOYEE_ID_SUCCESS,
      employeeId: employeeId,
    };
  };
  
  export const getListSalaryIncreaseByEmployeeIdFail = (employeeId) => {
    return {
      type: EC?.GET_LIST_SALARY_INCREASE_BY_EMPLOYEE_ID_FAIL,
      employeeId: employeeId,
    };
  };
  
   
  export const createSalaryIncreaseRequest = (payload , id) => {
    return {
      type: EC?.CREATE_SALARY_INCREASE_REQUEST,
      payload: payload,
      id : id
    };
  };
  
  export const createSalaryIncreaseSuccess = (payload) => {
    return {
      type: EC?.CREATE_SALARY_INCREASE_SUCCESS,
      payload: payload,
    };
  };
  
  export const createSalaryIncreaseFail = (payload) => {
    return {
      type: EC?.CREATE_SALARY_INCREASE_FAIL,
      payload: payload,
    };
  };

  export const deleteSalaryIncreaseRequest = (payload , employeeId ) => {
    return {
      type: EC?.DELETE_SALARY_INCREASE_REQUEST,
      payload: payload,
      employeeId: employeeId,
     
    };
  };
  
  export const  deleteSalaryIncreaseSuccess = (payload) => {
    return {
      type: EC?.DELETE_SALARY_INCREASE_SUCCESS,
      payload: payload,
    };
  };
  
  export const  deleteSalaryIncreaseFail = (payload) => {
    return {
      type: EC?.DELETE_SALARY_INCREASE_FAIL,
      payload: payload,
    };
  };


  export const updateSalaryIncreaseRequest = (payload , employeeId ) => {
    return {
      type: EC?.UPDATE_SALARY_INCREASE_REQUEST,
      payload: payload,
      employeeId: employeeId
    };
  };
  
  export const  updateSalaryIncreaseSuccess = (payload) => {
    return {
      type: EC?.UPDATE_SALARY_INCREASE_SUCCESS,
      payload: payload,
    };
  };
  
  export const  updateSalaryIncreaseFail = (payload) => {
    return {
      type: EC?.UPDATE_SALARY_INCREASE_FAIL,
      payload: payload,
    };
  };


  