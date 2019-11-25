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
      return resultsOfSearch[0].name;
    } else {
      return `We didn't find that one, guess you still need to catch 'em!`
    }
  }

  //Adding to the list function

  function addListItem(pokemon) {
    var $pokemonGridContainer = document.querySelector('.pokemon-grid__container')
    var $newGridItem = document.createElement('div');
    var $newButton = document.createElement('button');
    $newButton.classList.add('main-button');
    $newButton.innerText = `${pokemon}`;
    $newGridItem.classList.add('pokemon-grid__item')
    $newGridItem.appendChild($newButton)
    $pokemonGridContainer.appendChild($newGridItem);

    //Event listener
    //$newButton.addEventListener('click', showDetails);
    implementListener($newButton, showDetails);
  }

  //Function to assign event listener
  function implementListener(buttonRef, objRef) {
    buttonRef.addEventListener('click', objRef);
  }

  //Event Listener Function
  function showDetails(pokemon) {
    console.log(event.target.innerText);
    console.log(pokemonRepository.searchPokemon(event.target.innerText));
  }

  return {
    add: add,
    getAll: getAll(),
    searchPokemon: searchPokemon,
    addListItem: addListItem
  }
})();


//Testing the add function
pokemonRepository.add({
  name: 'Charizard',
  height: 2,
  types: ['fire', 'water']
});

//Let's display our pokemon

var $pokemonList = document.querySelector('.pokemon-list')

pokemonRepository.getAll.forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon.name);
})


document.write("<br><br>" +
  pokemonRepository.searchPokemon('Detective Pikachu')
)






//OLD ADD LIST FUNCTION USING UL

/*

var $newItem = document.createElement('li');
    var $newButton = document.createElement('button');
    $newButton.classList.add('main-button');
    $newButton.innerText = `${pokemon}`;
    $newItem.appendChild($newButton);
    $pokemonList.appendChild($newItem);


*/