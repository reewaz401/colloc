import { connect } from "react-redux";
import { SET_FLAT_ID } from "../type"



export const storeFlatId = (data) => {
  return({
    type: SET_FLAT_ID,
    data
  })
}


