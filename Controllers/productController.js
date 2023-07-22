//logic to resolve




//get all products

//importm product controller
const products=require('../model/productSchema')

//import wishlist collection
const wishlists=require('../model/wishlistSchema')

//get all products
exports.getallproducts = async (req,res)=>{
    //logic
    try{
//get all products from products collection in mongodb
       const allProducts = await products.find()
       res.status(200).json(allProducts)//response send back to client
    }
    catch(err){
        res.status(401).json(err)//error sending back 

    }
}

//vieww particular project details
exports.viewproduct=async(req,res)=>{
    //logic
    //get particular product id
    const id=req.params.id //2
    //get details of particular product
    try{
const product = await products.findOne({id})
if(product){
    res.status(200).json(product)//product send back to client
    
}
else{
    res.status(401).json("product not found")
}
    }
    catch(err){
        res.status(401).json(err)//error sending back to the

    }
}







// //logic for wishlist
// //add product to wishlist
// exports.addtowishlist=async(req,res)=>{
//     //get specific product details from the reqest
//     // req.body={
//     //     "id":"123",
//     //     "title":"Backpack",
//     //     "price":"123"
//     // }
//     const{id,title,price,image}=req.body

//     //logic for wishlist
//     try{
// //chek the product is alredy in wishlist
// const item = await wishlists.findOne({id})
//         if(item){
//             res.status(401).json("item slredy in wishlist")
//         }
//         else{
//             //product is added to wishlist
//             const newProduct = await wishlists({id,title,price,image})
//             //to store in db
//             await newProduct.save()
//         }
//     }
//     catch(err){
//         res.status(404).json(error)
//     }
// }