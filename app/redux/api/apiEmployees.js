// Gell all
import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getImage = async (name) => {
  const response = await axios.get(API_PATH + `/public/image/${name}`);
  return response;
};
export const uploadImage = async (file) => {
  const response = await axios.post(API_PATH + `/employee/upload-image`, file);
  return response;
};
export const searchEmployees = async (status, page, rowPerPage, keyword) => {
  const response = await axios.get(
    API_PATH +
      `/employee/search?pageIndex=${page}&pageSize=${rowPerPage}&keyword=${keyword}&listStatus=${status}`
  );
  return response;
};
export const addEmployees = async (data) => {
  const response = await axios.post(API_PATH + "/employee", data);
  return response?.data;
};

export const deleteEmployees = async (id) => {
  const response = await axios.delete(API_PATH + "/employee/" + id);
  return response?.data;
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(API_PATH + `/employee/` + id);
  return response?.data;
}

export const updateEmployee = async (data) => {
  const response = await axios.put(API_PATH + `/employee/${data.id}`, data );
  return response?.data;
}