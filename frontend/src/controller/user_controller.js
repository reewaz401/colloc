import { handlePostFormReq, handlePostReq } from "../utils/req";
import axios from "axios";
import { api_baseUrl } from "../utils/urls";


export async function postsignIn(body) { 
    console.log("BODY", body);
    handlePostFormReq("/login", body);
 

}
export async function postsignUp(body) { 
    handlePostReq("/signup", body);
}
export async function postSignOut(userInfo) {
    handlePostReq("/logout", userInfo);
}
export async function postRePwd(userInfo) {
    handlePostReq("/logout", userInfo);
}
export async function postLogout(userInfo) {
    
   
}