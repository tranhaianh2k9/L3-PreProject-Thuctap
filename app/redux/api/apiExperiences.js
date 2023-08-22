import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getExperienceById = async (id) => {
  const response = await axios.get(API_PATH + `/experience?employeeId=${id}`);
  return response?.data;
};

export const addExperience = async (id, data) => {
  const response = await axios.post(
    API_PATH + `/experience?employeeId=${id}`,
    data
  );
  return response?.data;
};

export const editExperience = async (data) => {
  const response = await axios.put(API_PATH + `/experience/${data.id}`, data);
  return response?.data;
}

export const deleteExperience = async (id) => {
  const response = await axios.delete(API_PATH + "/experience/" + id);
  return response?.data;
};