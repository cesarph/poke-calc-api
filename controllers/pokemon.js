const Pokemon = require('../models/Pokemon');

// Display list of all Pokemon.
exports.pokemonList = async function(req, res) {
    const query = Pokemon.find({});
    const pokemonList = await query.exec();
    res.status(200).json({
        data: pokemonList
    });
};

// Display detail page for a specific pokemon.
exports.pokemonDetail = async function(req, res) {
    const query = Pokemon.find({id: req.params.id});
    const pokemon = await query.exec();
    res.status(200).json({
        data: pokemon
    });
};
