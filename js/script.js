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

  }

  //Search Function
  function searchPokemon(searchTerm) {

    var resultsOfSearch = getAll().filter(
      obj => {
        return obj.name == searchTerm;
      }
    )

    if (resultsOfSearch.length != 0) {
      var $grid = document.querySelector('.pokemon-grid__container')
      $grid.innerHTML = "";
      addListItem(resultsOfSearch[0])

      var doesFormExist = document.querySelector('.clear-form')

      if (doesFormExist == null) {
        var $header = document.querySelector('header');
        var $resultElement = document.createElement('h2');

        var $clearButton = document.createElement('button');
        var $clearForm = document.createElement('form');

        $clearForm
        $clearButton.addEventListener('click', function () {
          $grid.innerHTML = "";
          var pokemonList = getAll();
          pokemonList.forEach(function (pokemon) {
            event.defaultPrevented()
            addListItem(pokemon);
          })

        })

        $clearButton.innerText = "Clear Results";
        $resultElement.innerText = (`Search Results`);
        $resultElement.classList.add('search-results');
        $clearButton.classList.add('clear-button')
        $clearForm.classList.add('clear-form');

        $header.after($resultElement);
        $resultElement.after($clearForm);
        $clearForm.appendChild($clearButton);

      }

    } else {
      var $header = document.querySelector('header');
      var $resultElement = document.createElement('h2');
      $resultElement.innerText = (`We didn't find that one`);
      $resultElement.classList.add('search-results');
      $header.after($resultElement);
    }
  }


  //Adding to the list function

  function addListItem(pokemon) {
    var $pokemonGridContainer = document.querySelector('.pokemon-grid__container');
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
    loadDetails: loadDetails,
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

//Add event listeners to search form
var $searchForm = document.querySelector('#search-form');
var $searchField = document.querySelector('.search-field');

$searchForm.addEventListener('click', function () {
  if ($searchField.value === "Search for a Pokémon") {
    $searchField.value = "";
  }

})

$searchForm.addEventListener('submit', function () {
  event.preventDefault();
  console.log($searchField.value);
  pokemonRepository.searchPokemon($searchField.value.toLowerCase());
})
