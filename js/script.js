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

for (var i = 0; i <= repository.length; i++) {
  if (repository[i].height > 5) {
    document.write(`<p><strong>${repository[i].name}</strong> (height: ${repository[i].height}) - <i>WOW! That's a tall Pokémon</i><br></p>`);
  } else {
    document.write(`<p><strong>${repository[i].name}</strong> (height: ${repository[i].height})<br></p>`);
  }
}
