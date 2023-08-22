import * as EC from "../constants/ProposalConstants";


export const getListPendingProposalRequest = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_PROPOSAL_REQUEST,
      payload: payload,
    };
  };
  
  export const getListPendingProposalSuccess = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_PROPOSAL_SUCCESS,
      payload: payload,
    };
  };
  
  export const getListPendingProposalFail = (payload) => {
    return {
      type: EC?.GET_LIST_PENDING_PROPOSAL_FAIL,
      payload: payload,
    };
  };
  
  export const getListProposalByEmployeeIdRequest = (employeeId) => {
    return {
      type: EC?.GET_LIST_PROPOSAL_BY_EMPLOYEE_ID_REQUEST,
      employeeId: employeeId,
    };
  };
  
  export const getListProposalByEmployeeIdSuccess = (employeeId) => {
    return {
      type: EC?.GET_LIST_PROPOSAL_BY_EMPLOYEE_ID_SUCCESS,
      employeeId: employeeId,
    };
  };
  
  export const getListProposalByEmployeeIdFail = (employeeId) => {
    return {
      type: EC?.GET_LIST_PROPOSAL_BY_EMPLOYEE_ID_FAIL,
      employeeId: employeeId,
    };
  };
  
   
  export const createProposalRequest = (payload , id) => {
    return {
      type: EC?.CREATE_PROPOSAL_REQUEST,
      payload: payload,
      id : id
    };
  };
  
  export const createProposalSuccess = (payload) => {
    return {
      type: EC?.CREATE_PROPOSAL_SUCCESS,
      payload: payload,
    };
  };
  
  export const createProposalFail = (payload) => {
    return {
      type: EC?.CREATE_PROPOSAL_FAIL,
      payload: payload,
    };
  };

  export const deleteProposalRequest = (payload , employeeId ) => {
    return {
      type: EC?.DELETE_PROPOSAL_REQUEST,
      payload: payload,
      employeeId: employeeId,
     
    };
  };
  
  export const  deleteProposalSuccess = (payload) => {
    return {
      type: EC?.DELETE_PROPOSAL_SUCCESS,
      payload: payload,
    };
  };
  
  export const  deleteProposalFail = (payload) => {
    return {
      type: EC?.DELETE_PROPOSAL_FAIL,
      payload: payload,
    };
  };


  export const updateProposalRequest = (payload , employeeId ) => {
    return {
      type: EC?.UPDATE_PROPOSAL_REQUEST,
      payload: payload,
      employeeId: employeeId
    };
  };
  
  export const  updateProposalSuccess = (payload) => {
    return {
      type: EC?.UPDATE_PROPOSAL_SUCCESS,
      payload: payload,
    };
  };
  
  export const  updateProposalFail = (payload) => {
    return {
      type: EC?.UPDATE_PROPOSAL_FAIL,
      payload: payload,
    };
  };

  