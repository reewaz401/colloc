import axios from "axios";
import { api_baseUrl } from "./urls";
export async function handlePostReq(api, body, headers) {
  let backResponse;
    let config = {
      headers: {
        "Content-Type": "application/json",

    },
  };
  await axios
    .post(`${api_baseUrl}${api}`, body,config )
    .then(async (response) => {
      console.log("DATA", response);
      backResponse = response;
      }).catch((err) =>{
        backResponse = {
            status: 504,
            message: "Something is wrong internally",
        };
      });
  return backResponse;
}
export async function handlePostFormReq(api, body, headers) {
  let backResponse;
  var bodyFormData = new FormData();
  let keys = Object.keys(body);
  keys.forEach((key) => {
    bodyFormData.append(key, body[key]);
  })
  console.log("ff", bodyFormData);
  await axios
    .post(`${api_baseUrl}${api}`, bodyFormData)
    .then(async(response) => {
      backResponse = response;
      console.log(response.data);
      }).catch((err) =>{
        backResponse = {
          data: {
            status: 504,
            data: "Something is wrong internally",
          },
        };
      });
  return backResponse.data;
}
export async function handleGetReq(api) {
  let backResponse;

  await axios
    .get(`${api_baseUrl}${api}`)
    .then((response) => {
      backResponse = response;
    })
    .catch((err) => {
      throw err;
    });
  return backResponse;
}
