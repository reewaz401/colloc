import { accordionActionsClasses } from "@mui/material";
import { SET_FLAT_ID, SET_FLAT_INFO, SET_USER_INFO } from "../type";

/* 
  src/reducers/simpleReducer.js
*/
const initialState = {
  usersInfo: null,
  flatId: null,
  flatInfo: null
}
const authReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        usersInfo: action.data
      }
      case SET_FLAT_ID:
        return {
          ...state,
          flatId: action.data
        }
      case SET_FLAT_INFO:
        return {
        ...state,
        flatInfo: action.data
        }
    default:
      return state
  }

}
export default authReducer;