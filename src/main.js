document.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector("#character-list");
  const searchInput = document.querySelector("#search");
  const noResults = document.querySelector("#no-results");
  const url = "https://rickandmortyapi.com/api/character";


  //GET request
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar datos");
      return res.json();
    })
    .then((data) => {
      renderCharacters(data.results);
    })
    .catch((err) => ul.innerHTML = `<p>No se ha podido conectar con la información: ${err}</p>`);

  function renderCharacters(characters) {
    const fragment = document.createDocumentFragment(); //Fragmentacion para no renderear el DOM cada vez

    characters.forEach((char) => {  //Imprimir cada card
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-inner character-card">
          <div class="card-front">
            <img class='card-img' src="${char.image}" alt="${char.name}" />  
            <div class="card-info">
              <p class="char-status ${char.status === "Alive" ? "alive" : "dead"}">${char.status}</p> 
              <p class="char-name">${char.name}</p>
            </div>
          </div>
          <div class="card-back">
            <p>Especie: ${char.species}</p>
            <p>Origen: ${char.origin.name}</p>
            <p>Género: ${char.gender}</p>
          </div>
        </div>
      `;
      fragment.appendChild(card); 
    });

    ul.appendChild(fragment);
  }

  //Logica buscador
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    let matches = 0;

    cards.forEach((card) => {
      const name = card.querySelector(".char-name").textContent.toLowerCase();
      const isVisible = name.includes(query);
      card.style.display = isVisible ? "grid" : "none";
      if (isVisible) matches++;
    });

    noResults.style.display = matches === 0 ? "block" : "none";
  });
});
