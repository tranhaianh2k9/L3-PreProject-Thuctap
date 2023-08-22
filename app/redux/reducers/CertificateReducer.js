import * as CC from "../constants/CertificateConstants";

const initialState = {
  certificates: [],
  error: false,
  loading: false,
};
const CertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CC.ALL_CERTIFICATE_BY_ID_REQUEST:
    case CC.ADD_CERTIFICATE_REQUEST:
    case CC.UPDATE_CERTIFICATE_REQUEST:
    case CC.DELETE_CERTIFICATE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CC.ALL_CERTIFICATE_BY_ID_SUCCESS:
      return {
        ...state,
        certificates: action?.payload,
        loading: false,
      };
    case CC.ADD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CC.ALL_CERTIFICATE_BY_ID_FAIL:
    case CC.ADD_CERTIFICATE_FAIL:
    case CC.UPDATE_CERTIFICATE_FAIL:
    case CC.DELETE_CERTIFICATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CC.UPDATE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        certificates: state.certificates.map((certificates) =>
          certificates.id === action.payload.id ? action.payload : certificates
        ),
        error: null,
        loading: false,
      };
    case CC.DELETE_CERTIFICATE_SUCCESS:
      const itemId = action.payload;
      const updatedItems = state.certificates.filter(
        (item) => item.id !== itemId
      );
      return {
        ...state,
        certificates: updatedItems,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
export default CertificateReducer;
