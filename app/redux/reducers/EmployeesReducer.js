import * as EC from "../constants/EmployeeConstants";
const initialState = {
  employees: [],
  employee: {},
  totalElements: 0,
  loading: false,
  error: false,
};
const EmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case EC.ALL_EMPLOYEES_REQUEST:
    case EC.ADD_EMPLOYEE_REQUEST:
    case EC.DELETE_EMPLOYEE_REQUEST:
    case EC.GET_EMPLOYEE_DETAIL_REQUEST:
    case EC.UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case EC.ALL_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action?.payload?.data,
        totalElements: action?.payload?.totalElements,
        loading: false,
      };

    case EC.ALL_EMPLOYEES_FAIL:
    case EC.ADD_EMPLOYEE_FAIL:
    case EC.DELETE_EMPLOYEE_FAIL:
    case EC.GET_EMPLOYEE_DETAIL_FAIL:
    case EC.UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case EC.ADD_EMPLOYEE_SUCCESS:
    case EC.DELETE_EMPLOYEE_SUCCESS:
    case EC.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: action.payload,
        error: null,
      };
    case EC.GET_EMPLOYEE_DETAIL_SUCCESS:
      return {
        ...state,
        employee: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default EmployeesReducer;
