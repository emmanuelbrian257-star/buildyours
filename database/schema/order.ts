import mongoose from "mongoose"

const {Schema, model, models}=mongoose;


const OrderSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type: String,
            required: true
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)


export default models.Order || model("Order", OrderSchema)