if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

async function fetchApi(url, configuracion) {
    try {
        const res = await fetch(url, configuracion)
        const data = await res.json()
        return data
    }
    catch {
        return {error: "Hubo un error"}
    }
}

async function ready() {
    const PRODUCTOS = await fetchApi('/api/products/list', {
        method: 'GET',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'
        }
    })
    displayProds(PRODUCTOS.data)
    let searchBar = document.querySelector(".search-form_input");
    searchBar.addEventListener("change", (e) => {
        filtrado(PRODUCTOS.data, e.target.value)
    })
    let checkDiv = document.querySelector("div.divCheck");
    checkDiv.addEventListener("change", (e) => {
        filtradoCheck(PRODUCTOS.data)
    })
}

function displayProds(PRODUCTOS) {
    let container = document.getElementById('containerProds')
    container.innerHTML = ``
    for (let i=0; i<PRODUCTOS.length; i++) {
        container.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">
            <section class="product-box">
                <a href="/products/detail/${PRODUCTOS[i].id}">
                    <figure class="product-box_image">
                        <img src="/images/products/${PRODUCTOS[i].image}" alt="${PRODUCTOS[i].image}">
                    </figure>
                    <article class="product-box_data">
                        <h2>Precio final: $ ${PRODUCTOS[i].price - ((PRODUCTOS[i].discount / 100) * PRODUCTOS[i].price )}</h2>
                        <span>Descuento % ${PRODUCTOS[i].discount}</span>
                        <p>${PRODUCTOS[i].name}</p>
                        <i class="fas fa-truck"></i>
                    </article>
                </a>
            </section>
        </div>
        `
    }
}

function filtrado(PRODUCTOS, busqueda) {
    PRODUCTOS.sort((a,b) => {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })
    if (busqueda == "") displayProds(PRODUCTOS)
    else {
        let arrFiltrado = PRODUCTOS.filter(row => row.name.toLowerCase().includes(busqueda.toLowerCase()) || row.description.toLowerCase().includes(busqueda.toLowerCase()))
        displayProds(arrFiltrado)
    }
}


function filtradoCheck (PRODUCTOS) {
    let inputsCheck = document.querySelectorAll("div.divCheck input.filterCheck");
    let checkValues = []
    for (let i=0; i<inputsCheck.length; i++) {
        if (inputsCheck[i].checked == true) checkValues.push(inputsCheck[i].value)
    }
    let productsFiltrados = PRODUCTOS.filter((row) => checkValues.indexOf(row.category) >= 0)
    displayProds(productsFiltrados)
}