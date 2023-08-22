import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getLeader = async () => {
    const response = await axios.get(API_PATH + `/leader`);
    return response?.data;
  };

  export const getLeaderById = async (id) => {
    const response = await axios.get(API_PATH + `/leader/${id}`);
    return response?.data;
  };