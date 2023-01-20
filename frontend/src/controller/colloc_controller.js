import { handleGetReq, handlePostFormReq, handlePostReq } from "../utils/req";

export async function createColloc(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    console.log("createColloc triggered", collocInfo);
}
export async function getColloc(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    handlePostFormReq("/view", collocInfo);
}
export async function addRoommate(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    handlePostFormReq("/add_roommate", collocInfo);
}
export async function getRoomate(collocInfo) { 
    //handlePostReq("/create_colloc", collocInfo );
    return handlePostFormReq("/select_all_roommate", collocInfo);
}
export async function kickRoomate(body) { 
    //handlePostReq("/create_colloc", collocInfo );
    return handlePostFormReq("/kick_roommate", body);
}