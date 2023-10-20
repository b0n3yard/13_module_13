const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const temparry= []
const temparry2= []
const temparry3= []

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  const cat = await Product.findAll({
    raw:true
  }) 
  cat.forEach(async(cat, x)=>{
    const ctgry = ProductTag.findAll({
      where:{
        product_id: x +1
      },
      raw:true
    }).then((data)=>{
      // Tag.tags = data
      data.forEach((data, x)=>{
        console.log(data)

      })
      const tagid = Object.assign(cat,data)
      temparry[x] = tagid
      // console.log(Tag)
    })
    temparry2.push(ctgry)
  })
  await Promise.all(temparry2)
  // console.log(cat)
  res.send(cat)
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  const hi = req.params.id
 
  const cat = await Product.findByPk(hi,{
    raw:true
  })
  res.send(cat)
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
