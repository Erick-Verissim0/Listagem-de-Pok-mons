const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
offset = 0
const limit = 15
const maxRecords = 649


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number"> ${pokemon.number} </span>
            <span class="name"> ${pokemon.name} </span>   
            
            <div class="detail">
                    
                <ol class="types"> 
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}    
                </ol>
                                        
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                                
            </div>
                            
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml
        })       
        .catch((error) => console.log(error))
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordPage = offset + limit

    if(qtdRecordPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})