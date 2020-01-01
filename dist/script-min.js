var pokemonRepository = (function() {
  var e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(e) {
    var t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function r(t) {
    "object" == typeof t && null != t.name && e.push(t);
  }
  function o() {
    return e;
  }
  function a(e) {
    var t = e;
    if (null == document.querySelector(".clear-form")) {
      var n = document.querySelector("header"),
        r = document.createElement("p"),
        a = document.createElement("button"),
        c = document.createElement("form");
      r.classList.add("results-title"),
        a.addEventListener("click", function() {
          ($grid.innerHTML = ""),
            o().forEach(function(e) {
              event.defaultPrevented(), i(e);
            });
        }),
        (a.innerText = "Clear Results"),
        (r.innerText = t),
        a.classList.add("clear-button"),
        c.classList.add("clear-form"),
        n.after(r),
        r.after(c),
        c.appendChild(a);
    } else {
      (r = document.querySelector(".results-title")).innerText = `${t}`;
    }
  }
  function i(e) {
    var t,
      r = document.querySelector(".pokemon-grid__container"),
      o = document.createElement("div"),
      a = document.createElement("button");
    a.classList.add("main-button"),
      (a.innerText = `${e.name}`),
      a.classList.add("capitalize-letters"),
      o.classList.add("pokemon-grid__item"),
      o.appendChild(a),
      r.appendChild(o),
      (t = function() {
        !(function(e) {
          n(e).then(function() {
            c(e);
          });
        })(e);
      }),
      a.addEventListener("click", t);
  }
  function c(e) {
    var t = document.querySelector("#modal-container");
    t.innerHTML = "";
    var n = document.createElement("div");
    n.classList.add("modal");
    var r = document.createElement("button");
    (r.innerText = "x"),
      r.classList.add("modal-close"),
      n.appendChild(r),
      r.addEventListener("click", () => {
        l();
      });
    var o = document.createElement("h3");
    (o.innerText = e.name), n.appendChild(o);
    var a = document.createElement("img");
    (a.src = e.imageUrl), (a.alt = e.name), n.appendChild(a);
    var i = document.createElement("p");
    (i.innerText = "Height: " + e.height), n.appendChild(i), t.appendChild(n);
    for (var c = [], s = 0; s < e.types.length; s++)
      c.push(" " + e.types[s].type.name);
    var d = document.createElement("p");
    (d.innerText = "Types: " + c),
      n.appendChild(d),
      window.addEventListener("keydown", e => {
        "Escape" === e.key && t.classList.contains("is-visible") && l();
      }),
      t.addEventListener("click", e => {
        e.target === t && l();
      }),
      t.classList.add("is-visible");
  }
  function l() {
    document.querySelector("#modal-container").classList.remove("is-visible");
  }
  return {
    add: r,
    getAll: o,
    searchPokemon: function(e) {
      var t = o().filter(t => t.name == e),
        n = document.querySelector(".pokemon-grid__container");
      0 != t.length
        ? ((n.innerHTML = ""), i(t[0]), a("Search Results"))
        : ((n.innerHTML = ""), a("No Results Found"));
    },
    addListItem: i,
    loadList: function() {
      return fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(e) {
          e.results.forEach(function(e) {
            r({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    loadDetails: n,
    displayDetails: c
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
var $searchForm = document.querySelector("#search-form"),
  $searchField = document.querySelector(".search-field");
$searchForm.addEventListener("click", function() {
  "Search for a Pokémon" === $searchField.value && ($searchField.value = "");
}),
  $searchForm.addEventListener("submit", function() {
    event.preventDefault(),
      pokemonRepository.searchPokemon($searchField.value.toLowerCase());
  });
