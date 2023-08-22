import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getCertificateById = async (id) => {
  const response = await axios.get(API_PATH + `/certificate?employeeId=${id}`);
  return response?.data;
};

export const addCertificate = async (id, data) => {
  const response = await axios.post(
    API_PATH + `/certificate?employeeId=${id}`,
    data
  );
  return response?.data;
};

export const editCertificate = async (data) => {
  const response = await axios.put(API_PATH + `/certificate/${data.id}`, data);
  return response?.data;
}

export const deleteCertificate = async (id) => {
  const response = await axios.delete(API_PATH + "/certificate/" + id);
  return response?.data;
};