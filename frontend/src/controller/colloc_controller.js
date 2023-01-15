import { handleGetReq, handlePostReq } from "../utils/req";

export async function createColloc(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    console.log("createColloc triggered", collocInfo);
}
export async function getColloc(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    handleGetReq("/view")
}