import * as EC from "../constants/ProcessConstants";
const initialState = {
  listProcess: [],
  loading: false,
  error: false,
};

const ProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case EC.GET_LIST_PENDING_PROCESS_REQUEST:
    case EC.GET_LIST_PROCESS_BY_EMPLOYEE_ID_REQUEST:
    case EC.CREATE_PROCESS_REQUEST:
    case EC.DELETE_PROCESS_REQUEST:
    case EC.UPDATE_PROCESS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case EC.GET_LIST_PENDING_PROCESS_SUCCESS:
    case EC.CREATE_PROCESS_SUCCESS:
    case EC.DELETE_PROCESS_SUCCESS:
    case EC.UPDATE_PROCESS_SUCCESS:
      return {
        ...state,
        listProcess: action?.payload,
        loading: false,
      };
    case EC.GET_LIST_PENDING_PROCESS_FAIL:
    case EC.CREATE_PROCESS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case EC.GET_LIST_PROCESS_BY_EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        listProcess: action?.employeeId,
        loading: false,
      };
    case EC.GET_LIST_PROCESS_BY_EMPLOYEE_ID_FAIL:
      return {
        ...state,
        error: action?.employeeId,
        loading: false,
      };
    case EC.DELETE_PROCESS_FAIL:
    case EC.UPDATE_PROCESS_FAIL:
      return {
        ...state,
        error: action?.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default ProcessReducer;
