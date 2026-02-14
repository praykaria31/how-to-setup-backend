import { asynchandler } from "../utils/asynchandler.js";
const registeruser= asynchandler(async(req,res)=>{
    return response.status(200).json({
        message:"ok"
    })
})
export {registeruser}