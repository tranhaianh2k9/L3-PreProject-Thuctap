import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getListPendingSalaryIncrease = async () => {
    const response = await axios.get(API_PATH + `/salary-increase/current-leader`);
    return response?.data;
};

export const getListSalaryIncreaseByEmployeeId = async (id) => {
  const response = await axios.get(API_PATH + `/salary-increase?employeeId=` + id);
  return response?.data;
};

export const createSalaryIncrease = async (data, id) => {
  const response = await axios.post(API_PATH + `/salary-increase?employeeId=` + id , data);
  return response?.data;
};

export const deleteSalaryIncrease = async ( id) => {
  const response = await axios.delete(API_PATH + `/salary-increase/` + id );
  return response?.data;
};


export const updateSalaryIncrease = async ( id , data) => {
  const response = await axios.put(API_PATH + `/salary-increase/` + id , data);
  return response?.data;
};
