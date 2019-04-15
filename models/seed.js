const Pokemon = require('./Pokemon');
const mongoose = require('mongoose');
const fs = require('fs');
// const pokemonData = require('./pokemon.json');
 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line global-require
}

const createPokemonCollection = async () => {
  try {
    const pokemonRaw = fs.readFileSync('pokemon.json', 'utf8');
    const pokemonJSON = JSON.parse(pokemonRaw);
    const pokemonPromises = pokemonJSON
                        .map((pokemon) => new Pokemon(pokemon))
                        .map((pokemon) => pokemon.save());
    await Promise.all(pokemonPromises);
  } catch (error) {
    console.log(error);
  }
}

const seedDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {useNewUrlParser: true})
    .then(() => {
      createPokemonCollection();
    });
}

module.exports = seedDB;

seedDB();
const getBaseStat = (higherConversion, lowerConversion) => (normalStat, specialStat, speed) => {
    const speedMod = 1 + ((speed - 75) / 500);
    const scaledStat = Math.round(2*((higherConversion)*Math.max(normalStat, specialStat) + (lowerConversion)*Math.min(normalStat, specialStat)))
    const baseStat = Math.round(scaledStat * speedMod);
  return baseStat
}
const getBaseAtt = getBaseStat(7/8, 1/8);
const getBaseDef = getBaseStat(5/8, 3/8);

const calculateCP = ({ baseStats, level, ivs }) => {
  const levelMod = 0.79030001;
  const Attack = baseStats.att + ivs.att;
  const Defense = Math.sqrt(baseStats.def + ivs.def);
  const Stamina = Math.sqrt(baseStats.sta + ivs.sta);

  const cp = Math.floor(Attack * Defense * Stamina * levelMod*levelMod / 10)
  
  return Math.max(cp, 10)
}

const parseJSON = () => {
  const pokemonRaw = fs.readFileSync('pokemon-original.json', 'utf8');
  const pokemonJSON = JSON.parse(pokemonRaw);
  const pokemonClean = pokemonJSON.map((pokemon) => {
    const baseAttack = getBaseAtt(pokemon.Attack, pokemon["Sp-Atk"], pokemon.Speed)
    const baseDefense = getBaseDef(pokemon.Defense, pokemon["Sp-Def"], pokemon.Speed);
    const stamina = Math.floor(pokemon.HP* 1.75 + 50)

    const maxCP = calculateCP({
      baseStats: {
        att: baseAttack,
        def: baseDefense,
        sta: stamina
      }, 
      level: 40,
      ivs: {
        att: 15,
        def: 15,
        sta: 15
      }
    });

    return {
      id: pokemon.Id,
      name: pokemon.Name,
      type1: pokemon["Type 1"],
      type2: pokemon["Type 2"],
      types: (pokemon["Type 2"].length) ? [pokemon["Type 1"], pokemon["Type 2"]] : [pokemon["Type 1"]],
      stamina: stamina,
      attack: baseAttack,
      defense: baseDefense,
      generation: pokemon.Generation,
      isLegendary: pokemon.Legendary === "True",
      maxCP,
    }
  })
  fs.writeFile("pokemon.json", JSON.stringify(pokemonClean), (err) => {
      if (err) return console.log(err);
      console.log("The file was saved!");
  }); 
  
}

// parseJSON();
