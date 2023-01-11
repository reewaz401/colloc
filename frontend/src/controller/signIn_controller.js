import { handlePostReq } from "../utils/req";

export async function postsignIn(body) { 
    handlePostReq("/login", body);
}