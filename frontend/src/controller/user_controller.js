import { handlePostReq } from "../utils/req";

export async function postsignIn(body) { 
    new Promise((resolve, reject) => {
        handlePostReq("/login", body).then((res) => {
            if (res.status === 200) resolve(res);
            else reject(res);
        });
   })

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