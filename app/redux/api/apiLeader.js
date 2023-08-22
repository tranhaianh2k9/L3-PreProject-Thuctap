
import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;


export const getAllLeader = async () => {
    const response = await axios.get(
      API_PATH + `/leader`
    );
    return response;
}