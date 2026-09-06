import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

   name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    maxlength: [200, "Product name can't exceed 200 characters"]
    },

    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        required:true
    },
    // images:[
    //     {
    //         public_id:{
    //             type:String,
    //             required:false
    //         },
    //         url:{
    //             type:String,
    //             required:false
    //         }
    //     }
    // ],
    category:{
        type:String,
        required:[true, 'Please enter product category'],
        enum:{
            values:[
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Sports",
                "Books",
                "Home",
                "Outdoor"  
            ]
        }
    },
    seller:{
        type:String,
        required:[true,"Please enter product seller"]
    },
    stock:{
            type:Number,
            default:0
        },
        numOfReviews:{
            type:Number,
            default:0
        },
        reviews:[
            {
                 user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required:false
                },
                rating:{
                    type:Number,
                    required:true
                },
                comment:{
                    type:String,
                    required:true
                }
            }
        ],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    
},{timestamps:true});

const Product = new mongoose.model("Product", productSchema)
export default Product;
