import {
  FETCH_USER_REPO_BEGIN,
  FETCH_USER_REPO_SUCCESS,
  FETCH_USER_REPO_FAILURE,
} from "../actions/userActions";

const inititalState = {
  repositories: [],
  loading: false,
  error: null,
};

export default function userRepositoriesReducer(state = inititalState, action) {
  switch (action.type) {
    case FETCH_USER_REPO_BEGIN:
      return {
        ...state,
        loading: true,
        repositories: [],
        error: null,
      };
    case FETCH_USER_REPO_FAILURE:
      return {
        repositories: [],
        loading: false,
        error: action.payload,
      };
    case FETCH_USER_REPO_SUCCESS:
      return {
        ...state,
        loading: false,
        repositories: action.payload,
      };
    default:
      return state;
  }
}
