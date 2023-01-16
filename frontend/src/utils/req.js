import axios from "axios";
import { api_baseUrl } from "./urls";
export async function handlePostReq(api, body, headers) {
  let backResponse;
  // let _token = localStorage.getItem("_token");
  // let config = {
  //   headers: {
  //     Permission: "2021D@T@f@RSt*6&%2-D@T@",
  //   },
  // };
  await axios
    .post(`${api_baseUrl}${api}`, body, )
    .then(async(response) => {
      backResponse = response;
      console.log(response.data);
      }).catch((err) =>{
        backResponse = {
          data: {
            status: 504,
            message: "Something is wrong internally",
          },
        };
      });
  return backResponse;
}
export async function handlePostFormReq(api, body, headers) {
  let backResponse;
  // let _token = localStorage.getItem("_token");
  // let config = {
  //   headers: {
  //     Permission: "2021D@T@f@RSt*6&%2-D@T@",
  //   },
  // };
  var bodyFormData = new FormData();
  let keys = Object.keys(body);
  keys.forEach((key) => {
    bodyFormData.append(key, body[key]);
  })
  await axios
    .post(`${api_baseUrl}${api}`, bodyFormData)
    .then(async(response) => {
      backResponse = response;
      console.log(response.data);
      }).catch((err) =>{
        backResponse = {
          data: {
            status: 504,
            message: "Something is wrong internally",
          },
        };
      });
  return backResponse;
}
export async function handleGetReq(api) {
  let backResponse;
  let _token = localStorage.getItem("_token");
  let config = {
    headers: {
      "x-access-token": `Bearer ${_token}`,
      Permission: "2021D@T@f@RSt*6&%2-D@T@",
    },
  };

  await axios
    .get(`${api_baseUrl}${api}`, config)
    .then((response) => {
      backResponse = response;
    })
    .catch((err) => {
      throw err;
    });
  return backResponse;
}
