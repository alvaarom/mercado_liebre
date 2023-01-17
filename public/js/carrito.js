if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}

else {
    ready()
}




function ready(){
    if (JSON.parse(localStorage.getItem("productosEnCarrito")) == null) localStorage.setItem("productosEnCarrito", JSON.stringify([]))
    cartNumber()
    let button = document.querySelector(".buy-now-button")
    button.addEventListener("click", (e) => {
        agregarItem()
        Swal.fire(
            'Exito!',
            'Producto agregado al carrito!',
            'success'
        )
    })
}

function cartNumber() {
    let numberItems = document.querySelector(".cartNmb")
    let lengthCart = JSON.parse(localStorage.getItem("productosEnCarrito")).length
    if (lengthCart != 0) numberItems.innerText = `${lengthCart}`
}

function agregarItem(){
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let product = {
        id: document.getElementById("idProd").innerText,
        name: document.getElementById("nomProd").innerText,
        price: document.getElementById("priceProd").innerText.replace("$", ""),
        image: document.getElementById("imgProdCarrito").alt
    }
    if (prodsCart.length > 0) {
        let productInCart = prodsCart.find(prod => prod.id == product.id)
        if (!productInCart) {
            product.cantidad = 1
            product.subTotal = product.cantidad * product.price
            prodsCart = [...prodsCart, product]
        }
        else {
            productInCart.cantidad += 1
            productInCart.subTotal = productInCart.price * productInCart.cantidad 
        }
    }
    else {
        product.cantidad = 1
        product.subTotal = product.cantidad * product.price
        prodsCart.push(product)
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart))
    cartNumber()
}