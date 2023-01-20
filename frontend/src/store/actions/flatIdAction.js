import { connect } from "react-redux";
import { SET_FLAT_ID, SET_FLAT_INFO } from "../type"



export const storeFlatId = (data) => {
  return({
    type: SET_FLAT_ID,
    data
  })
}

export const storeFlatInfo = (data) => {
  return({
    type: SET_FLAT_INFO,
    data
  })
}

