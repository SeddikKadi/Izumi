import { loginFailure, loginStart, loginSuccess,RegisterFailure, RegisterStart, RegisterSuccess,logoutStart,logoutSuccess,logoutFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const register = async (dispatch, user) => {
  dispatch(RegisterStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(RegisterSuccess(res.data));
  } catch (err) {
    dispatch(RegisterFailure());
  }
};
export const logout = async (dispatch, user) => {//modification du state

  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess(user));
  } catch (err) {
    dispatch(logoutFailure());
  }
};
