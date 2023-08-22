import * as EC from "../constants/ProcessConstants";


export const getListPendingProcessRequest = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_PROCESS_REQUEST,
      payload: payload,
    };
  };
  
  export const getListPendingProcessSuccess = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_PROCESS_SUCCESS,
      payload: payload,
    };
  };
  
  export const getListPendingProcessFail = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_PROCESS_FAIL,
      payload: payload,
    };
  };
  
  export const getListProcessByEmployeeIdRequest = (employeeId) => {
    return {
      type: EC?.GET_LIST_PROCESS_BY_EMPLOYEE_ID_REQUEST,
      employeeId: employeeId,
    };
  };
  
  export const getListProcessByEmployeeIdSuccess = (employeeId) => {
    return {
      type: EC?.GET_LIST_PROCESS_BY_EMPLOYEE_ID_SUCCESS,
      employeeId: employeeId,
    };
  };
  
  export const getListProcessByEmployeeIdFail = (employeeId) => {
    return {
      type: EC?.GET_LIST_PROCESS_BY_EMPLOYEE_ID_FAIL,
      employeeId: employeeId,
    };
  };
  
   
  export const createProcessRequest = (payload , id) => {
    return {
      type: EC?.CREATE_PROCESS_REQUEST,
      payload: payload,
      id : id
    };
  };
  
  export const createProcessSuccess = (payload) => {
    return {
      type: EC?.CREATE_PROCESS_SUCCESS,
      payload: payload,
    };
  };
  
  export const createProcessFail = (payload) => {
    return {
      type: EC?.CREATE_PROCESS_FAIL,
      payload: payload,
    };
  };

  export const deleteProcessRequest = (payload , employeeId ) => {
    return {
      type: EC?.DELETE_PROCESS_REQUEST,
      payload: payload,
      employeeId: employeeId,
     
    };
  };
  
  export const  deleteProcessSuccess = (payload) => {
    return {
      type: EC?.DELETE_PROCESS_SUCCESS,
      payload: payload,
    };
  };
  
  export const  deleteProcessFail = (payload) => {
    return {
      type: EC?.DELETE_PROCESS_FAIL,
      payload: payload,
    };
  };


  export const updateProcessRequest = (payload , employeeId ) => {
    return {
      type: EC?.UPDATE_PROCESS_REQUEST,
      payload: payload,
      employeeId: employeeId
    };
  };
  
  export const  updateProcessSuccess = (payload) => {
    return {
      type: EC?.UPDATE_PROCESS_SUCCESS,
      payload: payload,
    };
  };
  
  export const  updateProcessFail = (payload) => {
    return {
      type: EC?.UPDATE_PROCESS_FAIL,
      payload: payload,
    };
  };
