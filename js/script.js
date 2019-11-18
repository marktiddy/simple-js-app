//Array that will eventually store Pokémon
var repository = [
  {
    name: "Bulbasaur",
    height: 7,
    types: ['grass', 'poison']
  },
  {
    name: "Detective Pikachu",
    height: 3,
    types: ['coffee break', 'corkscrew punch']
  }
];

repository.forEach(function (pokemon) {
  if (pokemon.height > 5) {
    document.write(`<p><strong>${pokemon.name}</strong> (height: ${pokemon.height}) - <i>WOW! That's a tall Pokémon</i><br></p>`);
  } else {
    document.write(`<p><strong>${pokemon.name}</strong> (height: ${pokemon.height})<br></p>`);
  }
})

