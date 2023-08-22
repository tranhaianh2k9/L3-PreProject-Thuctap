import {
  ADD_CERTIFICATE_FAIL,
  ADD_CERTIFICATE_REQUEST,
  ADD_CERTIFICATE_SUCCESS,
  ALL_CERTIFICATE_BY_ID_FAIL,
  ALL_CERTIFICATE_BY_ID_REQUEST,
  ALL_CERTIFICATE_BY_ID_SUCCESS,
  DELETE_CERTIFICATE_FAIL,
  DELETE_CERTIFICATE_REQUEST,
  DELETE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_FAIL,
  UPDATE_CERTIFICATE_REQUEST,
  UPDATE_CERTIFICATE_SUCCESS,
} from "../constants/CertificateConstants";

export const getCertificateByIdRequest = (payload) => {
  return { type: ALL_CERTIFICATE_BY_ID_REQUEST, payload: payload };
};

export const getCertificateByIdSuccess = (payload) => {
  return { type: ALL_CERTIFICATE_BY_ID_SUCCESS, payload: payload };
};

export const getCertificateByIdFail = (error) => {
  return { type: ALL_CERTIFICATE_BY_ID_FAIL, payload: error };
};

export const addCertificate = (id, certificate) => {
  return {
    type: ADD_CERTIFICATE_REQUEST,
    payload: { id: id, certificate: certificate },
  };
};

export const addCertificateSuccess = (payload) => {
  return { type: ADD_CERTIFICATE_SUCCESS, payload: payload };
};

export const addCertificateFail = (error) => {
  return { type: ADD_CERTIFICATE_FAIL, payload: error };
};

export const updateCertificate = (certificate) => {
  return { type: UPDATE_CERTIFICATE_REQUEST, payload: certificate };
};

export const updateCertificateSuccess = (payload) => {
  return { type: UPDATE_CERTIFICATE_SUCCESS, payload: payload };
};

export const updateCertificateFail = (error) => {
  return { type: UPDATE_CERTIFICATE_FAIL, payload: error };
};

export const deleteCertificate = (certificate) => {
  return { type: DELETE_CERTIFICATE_REQUEST, payload: certificate };
};

export const deleteCertificateSuccess = (payload) => {
  return { type: DELETE_CERTIFICATE_SUCCESS, payload: payload };
};

export const deleteCertificateFail = (error) => {
  return { type: DELETE_CERTIFICATE_FAIL, payload: error };
};
