var pokemonRepository = (function() {
  //The pokemon repository
  var repository = [];

  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Functions to load and process data from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  //Function to load the details
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //Functions to return

  //Add pokemon function
  function add(pokemon) {
    if (typeof pokemon == "object" && pokemon.name != undefined) {
      repository.push(pokemon);
    } else {
      //      console.log("pokemon input is not an object");
    }
  }

  //Get all Pokemon Function
  function getAll() {
    return repository;
  }

  //Search Control Function
  function showSearchControls(text) {
    var textToInsert = text;
    //Check if this form already exists
    var doesFormExist = document.querySelector(".clear-form");

    //If form doesn't exist we create it
    if (doesFormExist == null) {
      var $header = document.querySelector("header");
      var $resultElement = document.createElement("p");
      var $clearButton = document.createElement("button");
      var $clearForm = document.createElement("form");

      $resultElement.classList.add("results-title");
      $clearButton.addEventListener("click", function() {
        $grid.innerHTML = "";
        var pokemonList = getAll();
        pokemonList.forEach(function(pokemon) {
          event.defaultPrevented();
          addListItem(pokemon);
        });
      });

      $clearButton.innerText = "Clear Results";
      $resultElement.innerText = textToInsert;
      $clearButton.classList.add("clear-button");
      $clearForm.classList.add("clear-form");

      $header.after($resultElement);
      $resultElement.after($clearForm);
      $clearForm.appendChild($clearButton);
    } else {
      var $resultElement = document.querySelector(".results-title");
      $resultElement.innerText = `${textToInsert}`;
    }
  }

  //Search Function
  function searchPokemon(searchTerm) {
    var resultsOfSearch = getAll().filter(obj => {
      return obj.name == searchTerm;
    });

    //Select the grid
    var $grid = document.querySelector(".pokemon-grid__container");

    if (resultsOfSearch.length != 0) {
      $grid.innerHTML = "";
      addListItem(resultsOfSearch[0]);
      showSearchControls("Search Results");
    } else {
      $grid.innerHTML = "";
      showSearchControls("No Results Found");
    }
  }
  //Adding to the list function
  function addListItem(pokemon) {
    var $pokemonGridContainer = document.querySelector(
      ".pokemon-grid__container"
    );
    var $newGridItem = document.createElement("div");
    var $newButton = document.createElement("button");
    $newButton.classList.add("main-button");
    $newButton.innerText = `${pokemon.name}`;
    $newButton.classList.add("capitalize-letters");
    $newGridItem.classList.add("pokemon-grid__item");
    $newGridItem.appendChild($newButton);
    $pokemonGridContainer.appendChild($newGridItem);

    //Event listener
    implementListener($newButton, function() {
      showDetails(pokemon);
    });
  }

  //Function to assign event listener
  function implementListener(buttonRef, objRef) {
    buttonRef.addEventListener("click", objRef);
  }

  //Event Listener Function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      displayDetails(pokemon);
    });
  }

  //Function to display the Pokemon Details on screen
  function displayDetails(pokemon) {
    //Get our container as a variable
    var $modalContainer = document.querySelector("#modal-container");
    //Clear the container
    $modalContainer.innerHTML = "";
    //Create the modal element
    var $pokemonCard = document.createElement("div");
    $pokemonCard.classList.add("modal");

    //Create the button
    var $closeButton = document.createElement("button");
    $closeButton.innerText = "x";
    $closeButton.classList.add("modal-close");
    $pokemonCard.appendChild($closeButton);
    //Button event listener
    $closeButton.addEventListener("click", () => {
      hideModal();
    });

    //Create the heading text
    var $headerText = document.createElement("h3");
    $headerText.innerText = pokemon.name;
    $pokemonCard.appendChild($headerText);

    //Show the image
    var $pokemonImage = document.createElement("img");
    $pokemonImage.src = pokemon.imageUrl;
    $pokemonImage.alt = pokemon.name;
    $pokemonCard.appendChild($pokemonImage);

    //Show some information
    var $pokemonHeight = document.createElement("p");
    $pokemonHeight.innerText = "Height: " + pokemon.height;
    $pokemonCard.appendChild($pokemonHeight);
    $modalContainer.appendChild($pokemonCard);

    var typesArray = [];
    for (var i = 0; i < pokemon.types.length; i++) {
      typesArray.push(" " + pokemon.types[i].type.name);
    }

    var $pokemonTypes = document.createElement("p");
    $pokemonTypes.innerText = "Types: " + typesArray;
    $pokemonCard.appendChild($pokemonTypes);

    //Add our key press and other event listeners
    window.addEventListener("keydown", e => {
      if (
        e.key === "Escape" &&
        $modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
    });

    $modalContainer.addEventListener("click", e => {
      var target = e.target;
      if (target === $modalContainer) {
        hideModal();
      }
    });

    //Make the modal visible
    $modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    var $pokemonContainer = document.querySelector("#modal-container");
    $pokemonContainer.classList.remove("is-visible");
  }

  return {
    add: add,
    getAll: getAll,
    searchPokemon: searchPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    displayDetails: displayDetails
  };
})();

//Let's add our pokemon from the api
pokemonRepository.loadList().then(function() {
  //Data has loaded from API
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//Add event listeners to search form
var $searchForm = document.querySelector("#search-form");
var $searchField = document.querySelector(".search-field");

$searchForm.addEventListener("click", function() {
  if ($searchField.value === "Search for a Pokémon") {
    $searchField.value = "";
  }
});

$searchForm.addEventListener("submit", function() {
  event.preventDefault();
  pokemonRepository.searchPokemon($searchField.value.toLowerCase());
});
