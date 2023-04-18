import { csrfFetch } from "./csrf";

const initalState = {
  user: null,
};
export default function sessionReducer(state = initalState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return newState;
  }
}

const SET_USER = "session/SETUSER";
const REMOVE_USER = "session/REMOVEUSER";

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  const data = await res.json();
  console.log(data);
  dispatch(setUser(data));
  return res;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};
