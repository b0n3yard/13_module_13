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
   
    // console.log(cat)
    // console.log(cata[x].category_id)
   
    // temparry2[x] = cat
    // temparry3[x] = temparry2[x] +temparry[x]
    // console.log(temparry3[x])
    temparry[x] += await Product.findAll({
      where:{
        category_id: x
      },
      raw:true
    })
    // temparry[x] += cats[x]
  })
  console.log(temparry)
  
  res.send(cat)
  // res.send(cataa)
  // console.log(temparry)
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
  temparry2[x] = cata[x]

  // console.log(cata)
  cat[0] += cata[0]
  res.send(cat)
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
