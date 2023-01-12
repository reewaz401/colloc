import { handlePostReq } from "../utils/req";

export async function postsignIn(body) { 
    handlePostReq("/login", body);
}
export async function postsignUp(body) { 
    handlePostReq("/signup", body);
}
export async function postSignOut(userInfo) { 
    console.log("SignOut triggered", userInfo);
}