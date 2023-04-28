const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Obtener las habilidades del Pokémon
    let habilidades = poke.abilities.map((habilidad) => `<p>${habilidad.ability.name}</p>`);
    habilidades = habilidades.join('');

    // Obtener el valor de venta del Pokémon
    const valorVenta = poke.base_experience;

    // Obtener la descripción del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke.id}`)
        .then((response) => response.json())
        .then((data) => {
            const descripcion = data.flavor_text_entries.find((entry) => entry.language.name === "es").flavor_text;
            agregarPokemon(poke, tipos, pokeId, habilidades, valorVenta, descripcion);
        });

}

function agregarPokemon(poke, tipos, pokeId, habilidades, valorVenta, descripcion) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
      <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
      </div>
      <div class="face pokemon-info">
        <div class="nombre-contenedor">
          <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <p class="pokemon-id">#${pokeId}</p>
        <div class="pokemon-tipos">
          ${tipos}
        </div>
      </div>
      <div class="face pokemon-habilidades-descripcion">
        
        <h3>Habilidades:</h3>
        ${habilidades}
        <h3>Descripción:</h3>
        <p>${descripcion}</p>
      </div>
    `;
    listaPokemon.append(div);
}


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.includes(botonId)) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
}))
