import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getFamilyById = async (id) => {
  const response = await axios.get(API_PATH + `/employee-family?employeeId=${id}`);
  return response?.data;
};

export const addFamily = async (id, data) => {
  const response = await axios.post(
    API_PATH + `/employee-family?employeeId=${id}`,
    data
  );
  return response?.data;
};

export const editFamily = async (data) => {
  const response = await axios.put(API_PATH + `/employee-family/${data.id}`, data);
  return response?.data;
}

export const deleteFamily = async (id) => {
  const response = await axios.delete(API_PATH + "/employee-family/" + id);
  return response?.data;
};