import * as LC from "../constants/LeaderConstants";

export const getAllLeadersRequest = () => {
  return {
    type:LC.ALL_LEADERS_REQUEST,
  };
};

export const getAllLeadersSuccess = (payload) => {
  return {type:LC.ALL_LEADERS_SUCCESS, payload: payload};
};

export const getAllLeadersFail = (error) => {
  return {type: LC.ALL_LEADERS_FAIL, payload: error};
};

export const getLeaderByIdRequest = (id) => {
  return {
    type: LC.GET_LEADERS_BY_ID_REQUEST,
    payload: id
  };
};

export const getLeaderByIdSuccess = (payload) => {
  return {type: LC.GET_LEADERS_BY_ID_SUCCESS, payload: payload};
};

export const getLeaderByIdFail = (error) => {
  return {type: LC.GET_LEADERS_BY_ID_FAIL, payload: error};
};