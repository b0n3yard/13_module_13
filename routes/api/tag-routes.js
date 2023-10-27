const router = require('express').Router();
const { raw } = require('express');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: Product
  })
  // console.log(tags)
  res.send(tags)
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  const hi = req.params.id

  const tags = await Tag.findByPk(hi, {
    include: Product
  })
  res.send(tags)
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create(req.body)
  res.send('tag created')
});

router.put('/:id', async (req, res) => {
  const hi = req.params.id
  await Tag.update(req.body,{
    where: {
      id: req.params.id
    }
  })
  res.send('tag updated')
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  const hi = req.params.id
  await Tag.destroy({
    where: {
      id: hi
    }
  })
  res.send('tag destroyed')
  // delete on tag by its `id` value
});

module.exports = router;
