import * as LC from "../constants/LeaderConstants";

const initialState = {
  leader: {},
  leadersItem: [],
  error: false,
  loading: false,
};
const LeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LC.ALL_LEADERS_REQUEST:
    case LC.GET_LEADERS_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LC.ALL_LEADERS_SUCCESS:
      return {
        ...state,
        leadersItem: action?.payload,
        loading: false,
      };
    case LC.GET_LEADERS_BY_ID_FAIL:
    case LC.ALL_LEADERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LC.GET_LEADERS_BY_ID_SUCCESS:
      return {
        ...state,
        leader: action?.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default LeaderReducer;
