const router = require('express').Router();
const { Category, Product } = require('../../models');

// `/api/categories` endpoint

//
// get route for all categories and thier products
//

router.get('/', async (req, res) => {
  try {
      const categoryData = await Category.findAll({
        include: [{ model: Product}]
      });
      res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
   
  };
});

//
// get route for sing catergory by id
//

router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.param.id, {
      include: [{model: Product}]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory); //http 201 created suscess status
  }catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// delete route by 'id'
//

router.delete('/:id', async (req, res) => {
  try {
    const deletedData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(deletedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
