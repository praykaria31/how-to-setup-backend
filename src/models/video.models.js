import mongoose, { schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschema = new Schema(
    {
        videoFile:{
            type:String,//cloudinary url
            required:true,
        },
        thumbnail:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,//cloudinary
            required:true
        },
        description:{
            type:Number,
            default:true
        },
        ispublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"user"
        },

    },{
        timestamps:true
    });

videoschema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoschema);
