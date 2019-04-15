const router = require('express-promise-router')();

const pokemonController = require('../../controllers/pokemon');

router.get('/', pokemonController.pokemonList);
router.get('/:id', pokemonController.pokemonDetail);

module.exports = router;

//O_o