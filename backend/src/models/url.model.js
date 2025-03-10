import mongoose from "mongoose"

const urlSchema=mongoose.Schema(
    {
        actualurl:{
            // long url
            type: String,
            required: true
        },
        shortid:{
            type: String,
            required: true,
            unique: true
        },
        clicks:{
            type:Number,
            default:0
        },
        expiresAt:{
            type:Number,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) //24 hours
        }
    },
    {
        timestamps:true
    }
);


// TTL(time to live) index - MongoDB will auto-delete expired documents
urlSchema.index(
    { expiresAt: 1 }, 
    { expireAfterSeconds: 0 }
);

export const url=mongoose.model("url",urlSchema)