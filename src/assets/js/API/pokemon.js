const STAT_TEXT = {
    hp: "PV",
    atk: "Attaque",
    def: "Défense",
    spe_atk: "Attaque Spéciale",
    spe_def: "Défense Spéciale",
    vit: "Vitesse",
};

function getRandomPokemon(event) {
    event.preventDefault();
    window.location.replace(`?pokemon=${Math.floor(Math.random() * 1000)}`)
}

function getPokemonPage(pokeId) {
    console.log(pokeId);
    window.location.replace(`?pokemon=${pokeId}`)
}

function makeStatsGraph(poke)
{
    let stats = [];
    for (const stat in poke.stats) {
        stats.push(poke.stats[stat])
    }

    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["PV", "Attaque", "Défense", "Attaque Spéciale", "Défense Spéciale", "Vitesse"],
            datasets: [
                {
                    label: "Stats",
                    borderColor: "rgb(255, 99, 132)",
                    data: stats,
                }
            ],
        },
        options: {
            elements: {
                point:{
                    radius: 0
                }
            }
        },
    });
}

function showPokemon(poke) {
    // ---- SECTION LEFT ----
    let pokemonImage = document.getElementById("poke-image");
    pokemonImage.setAttribute("src", poke.sprites.regular);
    // ---- END SECTION LEFT ----

    // ---- SECTION RIGHT ----
    let pokemonTitle = document.getElementById("poke-name");
    pokemonTitle.textContent = `${poke.name.fr}`;

    // let pokemonTypes = document.createElement("div");
    let pokemonTypes = document.getElementById("poke-types");

    for (let type in poke.types) {
        // show type image
        let typeEleLink = document.createElement("a");
        typeEleLink.setAttribute("href", "?type=" + poke.types[type].name);

        let typeEle = document.createElement("img");
        typeEle.classList.add("w-10", "h-10", "rounded-full");
        typeEle.setAttribute("src", poke.types[type].image);
        typeEle.setAttribute("title", poke.types[type].name);
        typeEle.setAttribute("alt", poke.types[type].name);

        typeEleLink.appendChild(typeEle);
        pokemonTypes.appendChild(typeEleLink);
    }
    // -- END SECTION HEADER --

    // GENERATION
    let generationTitle = document.getElementById("gen-title");
    generationTitle.textContent = `Génération : ${poke.generation}`;

    // id
    let pokemonId = document.getElementById("poke-id");
    pokemonId.textContent = `N° : ${poke.pokedex_id}`;

    // STATS
    makeStatsGraph(poke) // Create the radar graph
    // ---- END SECTION RIGHT ----

    // OTHER DATA
    let WeightHeight = document.getElementById("poke-weight");
    WeightHeight.textContent = `Hauteur : ${poke.height} || Poids : ${poke.weight}`;

    // CAROUSEL SHINNY
    let imgShiny = document.getElementById("poke-image-2");
    imgShiny.setAttribute("src", poke.sprites.shiny);


    poke.resistances.forEach((element) => {
        if (element.multiplier < 1) {
            console.log("point fort" + element.name);
        } else if (element.multiplier > 1) {
            console.log("point faible" + element.name);
        }
    });

    // EVOLUTIONS

    for (let evol in poke.evolution) {
        if (poke.evolution[evol] != null && evol !== "mega") {
            for (let evo in poke.evolution[evol]) {
                getPokemon(poke.evolution[evol][evo].pokedex_id, true).then(
                    (pokeData) => {
                        let evolImg = document.createElement('div');

                        evolImg.innerHTML = `
                        <a href="?pokemon=${pokeData.pokedex_id}" title="pokemon">
                    <div class="rounded-3xl shadow-sm bg-white flex-col w-[370px]">
                 <img
                     src="${pokeData.sprites.regular}"
                    class="rounded-t-3xl h-32 sm:h-56 object-cover"
                     alt="Evolution du pokemon"
                   /> 
           
                 <div class="group p-6 grid z-10">
                   <div class="grid-cols-2 flex group justify-between">
                     <div class="font-black flex flex-col">
                       <span class="text-yellow-500 text-sm sm:text-xl">${pokeData.name.fr}
                       <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           
           <g id="SVGRepo_bgCarrier" stroke-width="0"/>
           
           <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
           
           <g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#eab308"/> </g>
           
           </svg></span>
                       
                     </div>
                       <span class="block text-xl sm:text-3xl font-bold text-slate-300">
                         # ${pokeData.pokedex_id}
                       </span>
               </div>
               </a>
                    `;
                        let test = document.getElementById('pokemonEvolution');
                        test.appendChild(evolImg);
                    }
                );
            }
        }
    }
}

async function getPokemon(poke_id) {

    const pokeSession = localStorage.getItem("pokemons");

    if (!pokeSession) {
        getAllPokemons().then(data => {
            localStorage.setItem("pokemons", JSON.stringify(data))
            pokemons = data;
        })
    } else {
        pokemons = JSON.parse(pokeSession);
    }

    return pokemons.filter(poke => poke.pokedex_id === poke_id)[0];
}

async function getAllPokemons() {
    try {
        const response = await fetch("https://tyradex.tech/api/v1/pokemon", {
            method: "GET",
            headers: headers,
        });
        let data = await response.json();
        data = data.filter(poke => poke.pokedex_id !== 0)
        return data;
    } catch (error) {
        return error;
    }
}
