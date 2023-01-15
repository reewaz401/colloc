import { handleGetReq, handlePostFormReq, handlePostReq } from "../utils/req";

export async function createColloc(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    console.log("createColloc triggered", collocInfo);
}
export async function getColloc(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    handleGetReq("/view")
}
export async function addRoommate(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    handlePostFormReq("/add_roommate", collocInfo);
}