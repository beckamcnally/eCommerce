const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try { 
    const tagEverything = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagEverything);
  } catch (err) {res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagEverything = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagEverything) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagEverything);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log(req.body)
  console.log(req.body['tag_name'])
  try {
    const tagData = await Tag.create({ // is build and save
      tag_name: req.body['tag_name'],                                        
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // Product.create(req.body)
  //   .then((product) => { // dont get a promise back with the try and catch maybe though I Can use the??
  //     // if there's product tags, we need to create pairings to bulk create in the ProductTag model
     
  //     if (req.body.tagIds.length) {
  //       const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //         return {
  //           product_id: product.id,
  //           tag_id,
  //         };
  //       }); 
    // dont think tag would have a bulk create becuse it doesnt have anything that belongs to it but it belongs to others
  //       return ProductTag.bulkCreate(productTagIdArr);
  //     }
  //     // if no product tags, just respond
  //     res.status(200).json(product);
  //   })
  //   .then((productTagIds) => res.status(200).json(productTagIds))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err);
  //   });

});

router.put('/:id',  (req, res) => {
  // update a tag's name by its `id` value
  // literals?? actually sequelize update duh
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
