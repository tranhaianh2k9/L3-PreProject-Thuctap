import * as EC from "../constants/ProposalConstants";
const initialState = {
  listProposal: [],
  loading: false,
  error: false,
};

const ProposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EC.GET_LIST_PENDING_PROPOSAL_REQUEST:
    case EC.GET_LIST_PROPOSAL_BY_EMPLOYEE_ID_REQUEST:
    case EC.CREATE_PROPOSAL_REQUEST:
    case EC.DELETE_PROPOSAL_REQUEST:
    case EC.UPDATE_PROPOSAL_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case EC.GET_LIST_PENDING_PROPOSAL_SUCCESS:
    case EC.CREATE_PROPOSAL_SUCCESS:
    case EC.DELETE_PROPOSAL_SUCCESS:
    case EC.UPDATE_PROPOSAL_SUCCESS:
      return {
        ...state,
        listProposal: action?.payload,
        loading: false,
      };
    case EC.GET_LIST_PENDING_PROPOSAL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case EC.GET_LIST_PROPOSAL_BY_EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        listProposal: action?.employeeId,
        loading: false,
      };
    case EC.GET_LIST_PROPOSAL_BY_EMPLOYEE_ID_FAIL:
      return {
        ...state,
        error: action?.employeeId,
        loading: false,
      };
    case EC.CREATE_PROPOSAL_FAIL:
    case EC.DELETE_PROPOSAL_FAIL:
    case EC.UPDATE_PROPOSAL_FAIL:
      return {
        ...state,
        error: action?.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default ProposalReducer;
