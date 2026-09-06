import express from "express";
import Product from "../models/Product.js";

// get all product
export const getproducts = async(req,res) => {
    try{

        const products = await Product.find();

        res.status(200).json(
            
           products
        )
     }
     catch(error){
        console.error(`Message : ${error.message}`)
     }
}

// get product by id
export const getProductById = async(req,res) => {
    try{
        
        const product = await Product.findById(req.params.id);

        if(product){
            res.json({
                success:true,
                product
            })
        }else{
            res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
     }
     catch(error){
        console.error(`Message : ${error.message}`)
     }
}


// post porduct only admin

export const createProduct = async(req,res) => {
     console.log(req.body);

    console.log(req.user);

    try{

        const {name,
            price,
            description,
            rating,
            image,
            category,
            seller,
            stock,
            numOfReviews,
            reviews,
            user} = req.body;

            

        const product = new Product({
          name,
            price,
            description,
            rating,
            image,
            category,
            seller,
            stock,
            numOfReviews,
            reviews,
            user:req.user._id
        })
        console.log('passed route middleware')
        const createdProduct = await product.save()

        if(createdProduct){
            res.status(201).json({
                success:true,
                message:"Product Added Succesfully",
                AddedProduct:createdProduct
            })
        }

    }catch(error){
        res.status(500).json({
            message:error.message
        })
      
    }
}

// update product put /product/:id

export const updateProduct = async(req,res) => {

    try{

        

        const {name,
            price,
            description,
            rating,
            image,
            category,
            seller,
            stock,
            numOfReviews,
            reviews,
            user} = req.body;

            const product = await Product.findById(req.params.id)

      
        if(product){

            product.name =  name || product.name;
            product.price =  price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.image = image || product.image
            product.stock = stock || product.stock;
            product.seller = seller || product.seller;

            const updatedProduct = await product.save()
            if(updatedProduct){
                 res.status(200).json({
                success:true,
                message:"Product Updated Succesfully",
                UpdatedProduct:updatedProduct
            })
            }
            
           
        }

    }catch(error){
        res.status(500).json({
            message:error.message
        })
      
    }
}



// delete product put /product/:id

export const deleteProduct = async(req,res) => {

    try{


            const product = await Product.findById(req.params.id)

      
        if(product){

        

            await product.deleteOne()
            
            res.status(200).json({
                success:true,
                message:`Product Deleted or Removed Succesfully`
            })
           
        }

    }catch(error){
        res.status(500).json({
            message:error.message
        })
      
    }
}






