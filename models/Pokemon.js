const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type1: {
    type: String,
    required: true,
  },
  type2: {
    type: String,
  },
  types: {
    type: Array,
    required: true,
  },
  stamina: {
    type: Number,
    unique: true,
  },
  attack: {
    type: Number,
    unique: true,
  },
  defense: {
    type: Number,
    unique: true,
  },
  maxCP: {
    type: Number,
    unique: true,
  },
  generation: {
    type: String,
    required: true,
  },
  isLegendary: {
    type: Boolean,
    required: true,
  },
  

});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;