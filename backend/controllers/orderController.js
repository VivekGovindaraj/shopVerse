import Order from "../models/Order.js";
import User from "../models/User.js";

// create new order
// api  post   /api/order

export const createOrder = async(req, res) => {

      try{

         console.log("REQ USER:", req.user);
        console.log("REQ BODY:", req.body);

        const {
          
            orderItems,
            shippingInfo,
            paymentMethod,
            paymentInfo,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
        } = req.body;

        const order = new Order({
            user:req.user._id,
           orderItems,
            shippingInfo,
            paymentMethod,
            paymentInfo,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
        })
       
        if(orderItems && orderItems.length === 0){
            return res.status(400).json({
                messsage:"No Order Items"
            })
        }
        const createOrder = await order.save()

        if(createOrder){
            res.status(201).json({
                success:true,
                message:"Order Created Succesfully",
                createdOrder:createOrder
            })
        }

    }catch(error){

        console.log("CREATE ORDER ERROR:", error);

        res.status(500).json({
            message:error.message
        })
      
    }
}


// get All orders
// api  get api/orders

export const getAllOrders = async(req,res) => {
    try{
        const orders =await Order.find({}).populate("user", "name email").sort({createdAt: -1})

        res.status(200).json({
            success:true,
            message:"Your Orders",
            orders  
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    
}

// get my orders
// api  get api/orders/myorders

export const getMyOrders = async(req,res) => {
    try{
        const orders =await Order.find({user:req.user._id  }).sort({createdAt: -1})

        res.status(200).json({
            success:true,
            message:"My Orders",
            orders  
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    
}


// get orders by id
// api  get api/orders/:id

export const getOrdersById = async(req,res) => {
    try{
        const order =await Order.findById(req.params.id).populate('user', "name email")
        if(order){
             res.status(200).json({
            success:true,
            message:"ODERS BY ID",
            order
        })
        }else{
             res.status(404).json({
            message:"Orders not found"
        })
        }
       
        
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    
}


// update order staus admin only
// api  put api/orders/:id/status

export const updateOrderStatus = async(req,res) => {
    try{

        const {status} = req.body
        const order =await Order.findById(req.params.id).populate('user', "name email")
        if(order){

            order.orderStatus = status

            let updatedProduct = await order.save()
             res.status(200).json({
            success:true,
            message:"Order Updated",
            
            updatedProduct
        })
        }else{
             res.status(404).json({
            message:"Orders not found"
        })
        }
       
        
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    
}