var pokemonRepository = (function () {
  //The pokemon repository
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Functions to load and process data from API

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      console.error(error);
    })
  }

  //Function to load the details
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }



  //Functions to return

  //Add pokemon function
  function add(pokemon) {
    if ((typeof pokemon == 'object') && (pokemon.name != undefined)) {
      repository.push(pokemon);
    } else {
      console.log('pokemon input is not an object')
    }
  }

  //Get all Pokemon Function
  function getAll() {
    return repository;
    console.log(repository)
  }

  //Search Function
  function searchPokemon(searchTerm) {

    var resultsOfSearch = getAll().filter(
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
    $newButton.innerText = `${pokemon.name}`;
    $newButton.classList.add('capitalize-letters');
    $newGridItem.classList.add('pokemon-grid__item')
    $newGridItem.appendChild($newButton)
    $pokemonGridContainer.appendChild($newGridItem);

    //Event listener
    implementListener($newButton, function () {
      showDetails(pokemon);
    });
  }

  //Function to assign event listener
  function implementListener(buttonRef, objRef) {
    buttonRef.addEventListener('click', objRef);
  }

  //Event Listener Function
  function showDetails(pokemon) {
    loadDetails(pokemon)
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    searchPokemon: searchPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }
})();

//Let's add our pokemon from the api
pokemonRepository.loadList().then(function () {
  //Data has loaded from API
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  }
  )
})



//Let's display our pokemon
// pokemonRepository.getAll.forEach(function (pokemon) {
//   pokemonRepository.addListItem(pokemon.name)
// });


document.write("<br><br>" +
  pokemonRepository.searchPokemon('krabby')
)