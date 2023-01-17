if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}

else {
    ready()
}


function ready() {

    if(JSON.parse(localStorage.getItem("productosEnCarrito")) == null || JSON.parse(localStorage.getItem("productosEnCarrito")).length == 0) {
        displayEmptyCart()
        updateTotal()
    }
    else {
        displayCart()
        updateTotal()
    }
    let btnVaciar = document.getElementById("vaciar")
    btnVaciar.addEventListener("click", vaciarCarrito)
}

function displayCart() {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let container = document.getElementById("containerCart")
    container.innerHTML = ``
    for (let i=0; i<prodsCart.length; i++) {
        container.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">	
            <section class="product-box">
                <a href="/products/detail/${prodsCart[i].id}">
                    <figure class="product-box_image">
                        <img src="/images/products/${prodsCart[i].image}" alt="${prodsCart[i].image}">
                    </figure>
                </a>
                    <article class="product-box_data">
                        <h2>Precio final: $ ${prodsCart[i].price}</h2>
                        <p>${prodsCart[i].name}</p>
                        <p>Cantidad: ${prodsCart[i].cantidad}</p>
                        <p>Subtotal: ${prodsCart[i].subTotal}</p>
                        <button onClick="sumar(${prodsCart[i].id})" class="btn btn-primary">Sumar</button>
                        <button onClick="restar(${prodsCart[i].id})" class="btn btn-secondary">Restar</button>
                        <i onClick="borrar(${prodsCart[i].id})" class="fa fa-trash"></i>
                    </article>
                
            </section>
        </div>
        `
    }
    
}

function displayEmptyCart() {
    let container = document.getElementById("containerCart")
    container.innerHTML = `
    <div class="col-12">
        <h2 class="products-title">Anda a comprar bobo!! ATTE: LIONEL MESSI</h2>
    </div>
    `
}


function sumar(id){
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let prod = prodsCart.find(row => row.id == id)
    prod.cantidad += 1
    prod.subTotal = prod.cantidad * prod.price
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart))
    displayCart()
    updateTotal()
}

function restar(id) {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let prod = prodsCart.find(row => row.id == id)
    prod.cantidad -= 1
    prod.subTotal = prod.cantidad * prod.price
    if (prod.cantidad <= 0) {
        borrar(id)
        return
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart))
    displayCart()
    updateTotal()
}

function borrar(id) {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let filtrado = prodsCart.filter(row => row.id != id)
    localStorage.setItem("productosEnCarrito", JSON.stringify(filtrado))
    if (filtrado.length <= 0) {
        displayEmptyCart()
        return
    }
    displayCart()
    updateTotal()
}

function vaciarCarrito (){
    localStorage.setItem("productosEnCarrito", JSON.stringify([]))
    displayEmptyCart()
    updateTotal()
}

function updateTotal() {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let cantTotal = document.getElementById("cantTotal")
    let precioTotal = document.getElementById("precioTotal")
    let total = prodsCart.reduce((acum, act) => acum += act.subTotal ,0)
    cantTotal.value = prodsCart.length
    precioTotal.value = total
}