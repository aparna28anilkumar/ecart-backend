//import cartSchema
const { request } = require('express')
const carts=require('../model/cartSchema')

//add to cart
exports.addtocart=async(req,res)=>{
    //get product drtails from request
    const{id,title,price,image,quantity}=req.body

    try{
        //check if product is already in cart then upadate the quantity and price
        const product = await carts.findOne({id})
        if(product){
            //if product is alredy in cart,increment the quantity
            product.quantity+=1
            //upadate grand total
            product.grandTotal=product.price*product.quantity
            //save the change into the client
            product.save()
            //send response back to the client
            res.status(200).json("item updated...")
        }

        else{
            //else add to cart
            const newProduct =new carts({
                id,title,price,image,quantity,grandTotal:price
            })
            //save new product
            await newProduct.save()
            //response send back to the client
            res.status(200).json("item added to ur cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }


    //check if product is already in cart then update the quantity and price


    //else add to cart
}

//cart delete
exports.delete=async(req,res)=>{
    //remove cart items
    //grt product id from parameter
    const{id}=req.params
    try{
        const removecartitems = await carts.deleteOne({id})
        if(removecartitems.deleteCount!=0){
            //get all cart items after removing particular cart item
            const allcartitems = await carts.find()
            res.status(200).json(allcartitems)
        }

    }
    catch(error){
        res.status(401).json(error)

    }
}

//getcart items
exports.getcart=async(req,res)=>{
    //get cart items from cart collection
    try{
        const allcartitems = await carts.find()
        //response sen back
        res.status(200).json(allcartitems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

//increment cart item
exports.incrementCartItems=async(req,res)=>{
    //get product id from request
    const {id}=req.params
    try{
        //if product is present in cart
        const product=await carts.findOne({id})
        if(product){
            //update the quantity and the gandtotal
            product.quantity+=1
            product.grandTotal=product.quantity*product.price
            //save changes to the db
            await product.save()
            //updated details send back to the client
            const allcartitems = await carts.find()
            //response send back to the client
            res.status(200).json(allcartitems)

        }
        else{
            res.status(404).json("product not found")
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}

//decrement

exports.decrementCartItems=async(req,res)=>{
    //get product id from request
    const {id}=req.params
    try{
        //if product is present in cart
        const product=await carts.findOne({id})
        if(product){
            //update the quantity and the gandtotal
            product.quantity-=1
            product.grandTotal=product.quantity*product.price

if(product.quantity==0){
const removecartitems=await carts.deleteOne({id})
const allcartitems = await carts.find()
res.status(200).json(allcartitems)
    
}
else{
    product.grandTotal=product.quantity*product.price
      //save changes to the db
      await product.save()
      //updated details send back to the client
      const allcartitems = await carts.find()
      //response send back to the client
      res.status(200).json(allcartitems)
}
          

        }
       else{
        res.status(404).json("product not found")

       }

    }
    catch(error){
        res.status(404).json(error)
    }
}