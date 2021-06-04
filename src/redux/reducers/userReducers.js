import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actions/userActions";

const inititalState = {
  users: [],
  loading: false,
  error: null,
};

export default function userReducer(state = inititalState, action) {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        users: [],
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    default:
      return state;
  }
}
