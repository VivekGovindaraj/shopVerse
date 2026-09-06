

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
     orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Product"
            }
        }
    ],

    paymentMethod:{
        type:String,
        required:[true, "please select payment method"],
        enum:{
            values:["COD", "CARD"],
            message:"Please select : COD or Card"
        }
    },
    paymentInfo:{
        id:String,
        status:String
    },
    itemsPrice:{
        type:Number,
        required:true
    },
    taxAmount:{
        type:Number,
        required:true
    },
    shippingAmount:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        enum:{
            values:["Pending","Processing", "Shipped", "Delivered"],
            message:"Pending"
        },
        default:"Processing"
    },
        shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        zipcode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    deliveredAt:Date,

}, {
    timestamps:true
});


 const Order = mongoose.model("Order", orderSchema);

 export default Order;