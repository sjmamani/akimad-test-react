import {
  FETCH_USER_INFO_BEGIN,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from "../actions/userActions";

const inititalState = {
  user: null,
  loading: false,
  error: null,
};

export default function userDetailsReducer(state = inititalState, action) {
  switch (action.type) {
    case FETCH_USER_INFO_BEGIN:
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    case FETCH_USER_INFO_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
}
