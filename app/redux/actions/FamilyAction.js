import {
  ADD_FAMILY_FAIL,
  ADD_FAMILY_REQUEST,
  ADD_FAMILY_SUCCESS,
  ALL_FAMILY_BY_ID_FAIL,
  ALL_FAMILY_BY_ID_REQUEST,
  ALL_FAMILY_BY_ID_SUCCESS,
  DELETE_FAMILY_FAIL,
  DELETE_FAMILY_REQUEST,
  DELETE_FAMILY_SUCCESS,
  UPDATE_FAMILY_FAIL,
  UPDATE_FAMILY_REQUEST,
  UPDATE_FAMILY_SUCCESS,
} from "../constants/FamilyConstants";

export const getFamilyByIdRequest = (payload) => {
  return { type: ALL_FAMILY_BY_ID_REQUEST, payload: payload };
};

export const getFamilyByIdSuccess = (payload) => {
  return { type: ALL_FAMILY_BY_ID_SUCCESS, payload: payload };
};

export const getFamilyByIdFail = (error) => {
  return { type: ALL_FAMILY_BY_ID_FAIL, payload: error };
};

export const addFamily = (id, family) => {
  return {
    type: ADD_FAMILY_REQUEST,
    payload: { id: id, family: family },
  };
};

export const addFamilySuccess = (payload) => {
  return { type: ADD_FAMILY_SUCCESS, payload: payload };
};

export const addFamilyFail = (error) => {
  return { type: ADD_FAMILY_FAIL, payload: error };
};

export const updateFamily = (certificate) => {
  return { type: UPDATE_FAMILY_REQUEST, payload: certificate };
};

export const updateFamilySuccess = (payload) => {
  return { type: UPDATE_FAMILY_SUCCESS, payload: payload };
};

export const updateFamilyFail = (error) => {
  return { type: UPDATE_FAMILY_FAIL, payload: error };
};

export const deleteFamily = (certificate) => {
  return { type: DELETE_FAMILY_REQUEST, payload: certificate };
};

export const deleteFamilySuccess = (payload) => {
  return { type: DELETE_FAMILY_SUCCESS, payload: payload };
};

export const deleteFamilyFail = (error) => {
  return { type: DELETE_FAMILY_FAIL, payload: error };
};
