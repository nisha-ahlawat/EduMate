import { USER_DATA, USER_LOGIN_ID } from "./action";
import { setAccessToken } from "../api/client";

let initialState = {
  userData: {},
  userLoginId: "",
  accessToken: null,
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: { ...(state.userData || {}), ...action.payload },
      };
    case USER_LOGIN_ID:
      return { ...state, userLoginId: action.payload };
    case "AUTH_SET_TOKEN": {
      setAccessToken(action.payload);
      return { ...state, accessToken: action.payload };
    }
    case "AUTH_CLEAR": {
      setAccessToken(null);
      return { ...state, userData: {}, userLoginId: "", accessToken: null };
    }
    default:
      return state;
  }
};
