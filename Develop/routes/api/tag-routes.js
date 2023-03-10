const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// 
// Req Express router
//

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  
  // find tag by its `id`
  
  try {
    const tagData = await Tag.findByPk({
      include: [{model: Product}],
    });
    if (!tagData) {
      res.status(400).json({ message: "No tag found with that id!"})
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  //
  // Take tag id to update name
  //
  try {
    const updatedTag = await Tag.update(req.body, {
     where: {
      id: req.params.id,
     }
    });
    
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteData) {
      res.status(404).json({ message: 'No Tag with this id!'});
      return;
    }
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
