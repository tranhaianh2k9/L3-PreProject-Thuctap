import * as EC from "../constants/SalaryIncreaseConstants";
const initialState = {
  salaryIncrease: {},
  listSalaryIncrease: [],
  loading: false,
  error: false,
};

const SalaryIncreaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case EC.GET_LIST_PENDING_SALARY_INCREASE_REQUEST:
    case EC.GET_LIST_SALARY_INCREASE_BY_EMPLOYEE_ID_REQUEST:
    case EC.CREATE_SALARY_INCREASE_REQUEST:
    case EC.DELETE_SALARY_INCREASE_REQUEST:
    case EC.UPDATE_SALARY_INCREASE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case EC.GET_LIST_PENDING_SALARY_INCREASE_SUCCESS:
    case EC.CREATE_SALARY_INCREASE_SUCCESS:
    case EC.DELETE_SALARY_INCREASE_SUCCESS:
    case EC.UPDATE_SALARY_INCREASE_SUCCESS:
      return {
        ...state,
        listSalaryIncrease: action?.payload,
        loading: false,
      };
    case EC.GET_LIST_PENDING_SALARY_INCREASE_FAIL:
    case EC.DELETE_SALARY_INCREASE_FAIL:
    case EC.UPDATE_SALARY_INCREASE_FAIL:
    case EC.CREATE_SALARY_INCREASE_FAIL:
      return {
        ...state,
        error: action?.payload,
        loading: false,
      };
    case EC.GET_LIST_SALARY_INCREASE_BY_EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        listSalaryIncrease: action?.employeeId,
        loading: false,
      };
    case EC.GET_LIST_SALARY_INCREASE_BY_EMPLOYEE_ID_FAIL:
      return {
        ...state,
        error: action?.employeeId,
        loading: false,
      };
    default:
      return state;
  }
};
export default SalaryIncreaseReducer;
