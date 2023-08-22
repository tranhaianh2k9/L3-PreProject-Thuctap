import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getListPendingProposal = async () => {
    const response = await axios.get(API_PATH + `/proposal/current-leader`);
    return response?.data;
  };

  
  export const getListProposalByEmployeeId = async (id) => {
    const response = await axios.get(API_PATH + `/proposal?employeeId=` + id);
    return response?.data;
  };
  
  export const createProposal = async (data, id) => {
    const response = await axios.post(API_PATH + `/proposal?employeeId=` + id , data);
    return response?.data;
  };
  
  export const deleteProposal = async ( id) => {
    const response = await axios.delete(API_PATH + `/proposal/` + id );
    return response?.data;
  };
  
  
  export const updateProposal = async ( id , data) => {
    const response = await axios.put(API_PATH + `/proposal/` + id , data);
    return response?.data;
  };
  