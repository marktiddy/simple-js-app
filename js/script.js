var pokemonRepository = (function () {
  //The pokemon repository
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

  //Functions to return

  //Add pokemon function
  function add(pokemon) {
    if ((typeof pokemon == 'object') && (pokemon.name != undefined && pokemon.height != undefined && pokemon.types != undefined)) {
      repository.push(pokemon);
      console.log(`${pokemon.name} added`)
    } else {
      console.log('pokemon input is not an object')
    }
  }

  //Get all Pokemon Function
  function getAll() {
    return repository;
  }

  //Search Function
  function searchPokemon(searchTerm) {

    var resultsOfSearch = pokemonRepository.getAll.filter(
      obj => {
        return obj.name == searchTerm;
      }
    )

    if (resultsOfSearch.length != 0) {
      return `We have a result! We found a ${resultsOfSearch[0].name}`;
    } else {
      return `We didn't find that one, guess you still need to catch 'em!`
    }
  }

  return {
    add: add,
    getAll: getAll(),
    searchPokemon: searchPokemon
  }
})();


//Testing the add function
pokemonRepository.add({
  name: 'Charizard',
  height: 2,
  types: ['fire', 'water']
});

//Let's display our pokemon
pokemonRepository.getAll.forEach(function (pokemon) {
  if (pokemon.height > 5) {
    document.write(`<p><strong>${pokemon.name}</strong> (height: ${pokemon.height}) - <i>WOW! That's a tall Pokémon</i><br></p>`);
  } else {
    document.write(`<p><strong>${pokemon.name}</strong> (height: ${pokemon.height})<br></p>`);
  }
})


document.write("<br><br>" +
  pokemonRepository.searchPokemon('Detective Pikachu')
)


