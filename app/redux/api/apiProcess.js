import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getListPendingProcess = async () => {
    const response = await axios.get(API_PATH + `/process/current-leader`);
    return response?.data;
  };

  export const getListProcessByEmployeeId = async (id) => {
    const response = await axios.get(API_PATH + `/process?employeeId=` + id);
    return response?.data;
  };
  
  export const createProcess = async (data, id) => {
    const response = await axios.post(API_PATH + `/process?employeeId=` + id , data);
    return response?.data;
  };
  
  export const deleteProcess = async ( id) => {
    const response = await axios.delete(API_PATH + `/process/` + id );
    return response?.data;
  };
  
  
  export const updateProcess = async ( id , data) => {
    const response = await axios.put(API_PATH + `/process/` + id , data);
    return response?.data;
  };
  