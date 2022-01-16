const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
 // console.log(req.body)
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {

  const qNew = req.query.new;
  let qCategory = req.query.category;

  console.log("categories",qCategory)
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    console.log(products)
    let categories=[]
    products.map((element)=>{
     if(!categories.includes(element.sousCategorie)){
        categories.push(element.sousCategorie);
     } 
      //categories[element.categories]=element.categories
    })
   
      let productsList={products,categories}

    res.status(200).json(productsList);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/composition", async (req, res) => {
  try{

    let products=null;
    let compositionList=[]
    products = await Product.find();

    products.map((p)=>{
      p.composition.map((compo)=>{
        if(!compositionList.includes(compo)){
          compositionList.push(compo);
       } 
      })
     
    })

    console.log(compositionList)
    res.status(200).json(compositionList);
  }catch (err) {
    res.status(500).json(err);
  }

})
module.exports = router;
