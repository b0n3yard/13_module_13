const router = require('express').Router();
const { Category, Product } = require('../../models');
const temparry= []
const temparry2= []
const temparry3= []


// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const cat = await Category.findAll({
    raw:true
  })
  const cata =await Product.findAll({
    raw:true
  })
  cat.forEach(async (cat,x) =>{
   
   const ctgry = Product.findAll({
    where:{
      category_id: x +1
    },
    raw:true
   }).then((data)=>{
    const cato = Object.assign(cat,data)
    temparry[x] = cato
    // console.table(temparry[x])
   })
    temparry2.push(ctgry)
    // console.table(temparry[x])
  })
  await Promise.all(temparry2)

  res.send(cat)
  // res.send(cataa)
  console.log(temparry)
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const hi = req.params.id
 
  const cat = await Category.findByPk(hi,{
    raw:true
  })
  const cata =await Product.findAll({
    where:{
      categoryId: hi
    },
    raw:true
  })
  // console.log(cata)
const cato = Object.assign(cat,cata)
  console.log(cato)
  // cat[hi] += cata[hi]
  res.send(cato)
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create()
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
