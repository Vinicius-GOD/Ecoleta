
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() )
    .then ( states => {

        for ( const state of states) {
            ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`

        }

    } )
}

populateUFs()

function getCities(event) {
    const cityselect = document.querySelector("select[name=city]")
    const stateinput = document.querySelector("input[name=state]")

    const ufvalue = event.target.value

    const indexofselectedstate = event.target.selectedIndex
    stateinput.value = event.target.options[indexofselectedstate].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    cityselect.innerHTML = "<option value>Selecione a cidade</option>"
    cityselect.disabled = true

    fetch (url)
    .then ( res => res.json() )
    .then ( cities => {

        for ( const city of cities) {
            cityselect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`

        }

        cityselect.disabled = false
    } )

}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li's

const itensCollect = document.querySelectorAll (".itens-grid li")

for (const item of itensCollect) {

    item.addEventListener("click", handleSelecteditem)

}

const collecteditens = document.querySelector("input[name=itens]")
let selecteditens = []

function handleSelecteditem(event) {

    const itemli = event.target

    //adicionar ou remover uma classe com JS
    itemli.classList.toggle("selected")

    const itemId = itemli.dataset.id
    console.log()


    const alreadyselected = selecteditens.findIndex( item => {
        const itemfound =  item == itemId
        return itemfound
    })

    if( alreadyselected >=0) {

        const filtereditens = selecteditens.filter( item => {
            const itemisdifferent = item != itemId
            return itemisdifferent

        })

        selecteditens = filtereditens
    } else {

        selecteditens.push(itemId)
    }

    collecteditens.value = selecteditens

}