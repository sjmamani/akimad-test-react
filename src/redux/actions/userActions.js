import axios from "axios";

export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS";
export const FETCH_USER_INFO_BEGIN = "FETCH_USER_INFO_BEGIN";
export const FETCH_USER_INFO_FAILURE = "FETCH_USER_INFO_FAILURE";

export const FETCH_USER_REPO_SUCCESS = "FETCH_USER_REPO_SUCCESS";
export const FETCH_USER_REPO_BEGIN = "FETCH_USER_REPO_BEGIN";
export const FETCH_USER_REPO_FAILURE = "FETCH_USER_REPO_FAILURE";

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUserInfoBegin = () => ({
  type: FETCH_USER_INFO_BEGIN,
});

export const fetchUserInfoSuccess = (user) => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload: user,
});

export const fetchUserInfoFailure = (error) => ({
  type: FETCH_USER_INFO_FAILURE,
  payload: error,
});

export const fetchUserRepoBegin = () => ({
  type: FETCH_USER_REPO_BEGIN,
});

export const fetchUserRepoSuccess = (repositories) => ({
  type: FETCH_USER_REPO_SUCCESS,
  payload: repositories,
});

export const fetchUserRepoFailure = (error) => ({
  type: FETCH_USER_REPO_FAILURE,
  payload: error,
});

export function getUsers(query) {
  return (dispatch) => {
    dispatch(fetchUsersBegin());
    return axios
      .get(`https://api.github.com/search/users?q=${query}`)
      .then((response) => {
        return dispatch(fetchUsersSuccess(response.data.items));
      })
      .catch((error) => dispatch(fetchUsersFailure(null)));
  };
}

export function getUserDetails(username) {
  return (dispatch) => {
    dispatch(fetchUserInfoBegin());
    return axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        return dispatch(fetchUserInfoSuccess(response.data));
      })
      .catch((error) => dispatch(fetchUserInfoFailure(null)));
  };
}

export function getUserRepositories(username) {
  return (dispatch) => {
    dispatch(fetchUserRepoBegin());
    return axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        return dispatch(fetchUserRepoSuccess(response.data));
      })
      .catch((error) => dispatch(fetchUserRepoFailure(null)));
  };
}
