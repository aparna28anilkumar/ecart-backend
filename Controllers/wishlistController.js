

// //import wishlist
// const wishlists=require('../model/wishlistSchema')

// //get all products
// exports.getallproducts = async (req,res)=>{
//     //logic
//     try{
// //get all products from products collection in mongodb
//        const allProducts = await products.find()
//        res.status(200).json(allProducts)//response send back to client
//     }
//     catch(err){
//         res.status(401).json(err)//error sending back 

//     }
// }

// //vieww particular project details
// exports.viewproduct=async(req,res)=>{
//     //logic
//     //get particular product id
//     const id=req.params.id //2
//     //get details of particular product
//     try{
// const product = await products.findOne({id})
// if(product){
//     res.status(200).json(product)//product send back to client
    
// }
// else{
//     res.status(401).json("product not found")
// }
//     }
//     catch(err){
//         res.status(401).json(err)//error sending back to the

//     }
// }

// //elogic for wishlist
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
//             res.status(200).json("item added to wishlist")//response send back to client
//         }
//     }
//     catch(err){
//         res.status(404).json(error)
//     }
// }





//import whislistSchema
const wishlists=require('../model/wishlistSchema')


//logic for wishlist
//add product to wishlist
exports.addtowishlist=async(req,res)=>{
    //get specific product details from the reqest
    // req.body={
    //     "id":"123",
    //     "title":"Backpack",
    //     "price":"123"
    // }
    const{id,title,price,image}=req.body

    //logic for wishlist
    try{
//chek the product is alredy in wishlist
const item = await wishlists.findOne({id})
        if(item){
            res.status(401).json("item alredy in wishlist")
        }
        else{
            //product is added to wishlist
            const newProduct = await wishlists({id,title,price,image})
            //to store in db
            await newProduct.save()
            res.status(200).json("item added to wishlist")//response send back to client
        }
    }
    catch(err){
        res.status(404).json(error)
    }
}



//get wishlist product from db
exports.getwishlist=async(req,res)=>{
    try{
        //logic
        //get allproduts from wishlist collecton
        const allwishlist=await wishlists.find()
        res.status(200).json(allwishlist)//response send back to client

    }
    catch(error){
        res.status(404).json(error)
    }
}

//delet wishlist product from db
exports.deletewishlist=async(req,res)=>{
    //get particular product id
    const{id}=req.params
    try{
        //logic
        //delete wishlist products
        const removewishlist=await wishlists.deleteOne({id})
        if(removewishlist){
            //get all wishlist product afet removing particular product
            const remainingwishlist=await wishlists.find()
            res.status(200).json(remainingwishlist)//response send back to client
        }

    }
    catch(error){
        res.status(404).json(error)//error response
        console.log(error);
    }
}
