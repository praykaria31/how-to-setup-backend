import { asynchandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apierror.js"; 
import { user } from "../models/user.models.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { apiresponse } from "../utils/apiresponse.js";

const registeruser= asynchandler(async(req,res)=>{
    //get user details from frontend 
    //validation - not empty
    //check if user already exists by email , username
    //check for images,avatar
    //upload them to cloudinary
    //create user object -create entry in db
    //remove password and refresh token feed from response
    //check for user creation 
    //return response

    const{fullname,email,username,password}=req.body
    console.log("email: ",email);
    // if(fullname===""){
    //     throw new apiError(400,"fullname is required")
    // }

    if(
        [fullname,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new apiError(400,"ALL FIELDS ARE COMPULSORY")
    }

    const existeduser=user.findOne({
        $or:[{username},{email}]
    })
    if(existeduser){
        throw new apiError(409, "user with email or username already exists")
    }

    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverimagelocalpath = req.file?.coverimage[0]?.path;

    if(!avatarlocalpath){
        throw new apiError(400,"avatar file is required")
    }

    const avatar = await uploadoncloudinary(avatarlocalpath)
    const coverimage = await uploadoncloudinary(coverimagelocalpath)

    if(!avatar){
        throw new apiError(400,"avatar file is required")
    }

    const user = await user.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage?.url||"",
        email,
        password,
        username:username.toLowercase()
    })

    const createduser = await user.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!createduser){
        throw new apiError(500,"something went wronf while registering user")
    }

    return res.status(201).json(
        new apiresponse(200,createduser,"user registered")
    )
})
export {registeruser}