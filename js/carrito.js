window.onload = () => {
    CargarCarrito();
    CargarTotal() 
}





function CargarCarrito() {
    $('#dinamica').empty();
    var i = 0;
    var main = $('#dinamica');
    var precio;
    var array = JSON.parse(localStorage.getItem('carrito'));
    array.forEach(trago => {
        //precio = Math.round(Math.random() * (800 - 200) + 200);
        if (trago.idDrink != null) {
            var card = `
                <article id="${trago.idDrink}">
                    <div class="trago-carrito">
                        <div class="imagen">
                            <img class="foto" src="${trago.strDrinkThumb}" alt="trago encontrado" />
                        </div>
                        <div class="descripcion">
                            <p>
                                ${trago.strDrink}
                            </p>
                            <p>
                                Precio: ${trago.precio}$
                            </p>
                            <p>
                                Cantidad: ${trago.cantidad}
                            </p>
                            <button type="submit" class="quitar" id="quitar" value = '${trago.idDrink}'>Quitar del carrito</button>
                        </div>
                    </div>
                </article>
                `
            main.append(card);
            i++;
        }
    })

}

$(document).on('click', '#quitar', function () {
    console.log(this.value)
    var i = 0;
    var array = JSON.parse(localStorage.getItem('carrito'));
    array.forEach(trago => {
        if (trago.idDrink == this.value) {
            console.log("Borro el item de la posicion: ", i)
            array.splice(i, 1);
            //$(`#${this.value}`).empty();
        }
        i++
    })
    localStorage.setItem('carrito', JSON.stringify(array));

    CargarCarrito();
    CargarTotal();
});



$(document).on('click', '.fa-shopping-cart', function () {

});

function CargarTotal() {
    var total = 0;
    var array = JSON.parse(localStorage.getItem('carrito'));
    array.forEach(trago => {
        total += (parseInt(trago.cantidad) * parseInt(trago.precio));
    })

    $('.total').empty();
    var main = $('.total');
    var card = `
    <p>
        TOTAL A PAGAR: ${total}$
    </p>
    <p>
        <button type="submit" class="quitar" id="confirmar">CONFIRMAR</button>
    </p>
    `
    main.append(card);
}
