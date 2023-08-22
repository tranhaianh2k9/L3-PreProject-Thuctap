import * as FC from "../constants/FamilyConstants";

const initialState = {
  listFamily: [],
  error: false,
  loading: false,
};
const FamilyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FC.ALL_FAMILY_BY_ID_REQUEST:
    case FC.ADD_FAMILY_REQUEST:
    case FC.UPDATE_FAMILY_REQUEST:
    case FC.DELETE_FAMILY_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FC.ALL_FAMILY_BY_ID_SUCCESS:
      return {
        ...state,
        listFamily: action?.payload,
        loading: false,
      };
    case FC.ADD_FAMILY_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case FC.ALL_FAMILY_BY_ID_FAIL:
    case FC.ADD_FAMILY_FAIL:
    case FC.UPDATE_FAMILY_FAIL:
    case FC.DELETE_FAMILY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FC.UPDATE_FAMILY_SUCCESS:
      return {
        ...state,
        listFamily: state.listFamily.map((family) =>
          family.id === action.payload.id ? action.payload : family
        ),
        error: null,
        loading: false,
      };
    case FC.DELETE_FAMILY_SUCCESS:
      const itemId = action.payload;
      const updatedItems = state.listFamily.filter(
        (item) => item.id !== itemId
      );
      return {
        ...state,
        listFamily: updatedItems,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};
export default FamilyReducer;
