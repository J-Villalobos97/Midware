const poke_container = document.getElementById('poke-container');
const table_container = document.getElementById('table-container');
const pokemon_number = 100;

//Función que recorre el total de pokemones que vamos a utilizar y los envía a otra función como id
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_number; i++) {
    await getPokemon(i);
  }
}

//Función que utiliza el parametro id para llamar a la pokeapi por medio del id del pokemon
const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log(pokemon);
  createPokemonList(pokemon);
}

//Función que busca por medio del nombre a un pokemón
const searchPokemon = event => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  console.log(value);
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => createPokemonCard(response))
    .catch(err => fetchPokemons())
}

//Función que crea la lista de pokemones a utilizar o los agrega a una tabla
const createPokemonList = (pokemon) => {
  const { id, name, sprites } = pokemon;
  const pokeTable = document.querySelector("table");
  pokeTable.classList.add('poke-table');
  const tbody = document.querySelector("tbody");
  var fila = document.createElement('tr');

  for (let j = 0; j <= 2; j++) {
    var celda = document.createElement('td');

    switch (j) {
      case 0:
        var pokeImg = document.createElement('img');
        pokeImg.setAttribute("src", `${sprites.front_default}`);
        pokeImg.setAttribute("alt", `${name}`);
        celda.appendChild(pokeImg);
        fila.appendChild(celda);
        break;
      case 1:
        var pokeName = document.createTextNode(`${name}`);
        celda.appendChild(pokeName);
        celda.setAttribute("cellspacing", "15px");
        fila.appendChild(celda);
        break;
      case 2:
        var pokeId = document.createTextNode(`#${id}`);
        celda.appendChild(pokeId);
        fila.appendChild(celda);
        break;
    }
    tbody.appendChild(fila);
  }
  pokeTable.appendChild(tbody);
  table_container.appendChild(pokeTable);
  pokeTable.setAttribute("width", "350");
}

//Función que crea el espacio para mostrar la información del pokemón
const createPokemonCard = (pokemon) => {
  const pokeElement = document.createElement('div');
  pokeElement.classList.add('pokemon');
  const { id, name, sprites, types } = pokemon;
  const type = types[0].type.name;
  const pokeInnerHTML = `
  <div class="img-container">
    <img src="${sprites.front_default}" alt="${name}"/>
  </div>
  <div class="info">
    <span class="number">${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `;
  pokeElement.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokeElement);
}

//Aquí llamamos la función para llenar la lista de pokemones
fetchPokemons();