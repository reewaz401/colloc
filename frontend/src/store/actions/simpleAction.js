import { connect } from "react-redux";
import { SET_USER_INFO } from "../type"

/* 
  src/actions/simpleAction.js
*/
// export const login = () =>{
//   return async dispatch => {
//     try {
//       let response = await handlePostFormReq("/login", userInfo);
//       if (response.statut !== 200) {
//         console.log(response);
//         setShowSanck(true);
//         setErrMessage(response.message);
//       } else {
//         navigate("/home");
//       }
//     } catch (err) {
//       // setShowSanck(true);
//       // setErrMessage("Something is wrong");
//     }
//   }
// }

export const storeUserInfo = (data) => {
  return({
    type: SET_USER_INFO,
    data
  })
}

