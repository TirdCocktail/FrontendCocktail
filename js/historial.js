window.onload = () => {
    sessionStorage.removeItem("idtrago");
    Renderizar();
}

function Renderizar() {
    $('#dinamica').empty();
    let mapa;
    if (!localStorage.getItem('precios-tragos')) {
        mapa = new Map();
        console.log("No hay dicc")
    } else {
        mapa = new Map(JSON.parse(localStorage.getItem('precios-tragos')));
        console.log("Hay dicc")
    }
    var tragos = JSON.parse(localStorage.getItem("historial"));
    console.log(tragos);
    var main = $('#dinamica');
    var precio;
    var j = 1;
    for (var i = tragos.length; i > 0; i--) {
        precio = Math.round(Math.random() * (800 - 200) + 200);
        if (!mapa.get(tragos[i-1].idDrink)) {
            mapa.set(tragos[i-1].idDrink, precio);
        }
        //mapa.set(trago.idDrink,Math.round(Math.random() * (800 - 200) + 200));

        console.log(tragos[i-1].idDrink);
        if (tragos[i-1].idDrink != null) {
            var card = `
                <article id="${tragos[i-1].idDrink}">
                    <div class="trago">
                        <div class="imagen">
                            <img class="foto" src="${tragos[i-1].strDrinkThumb}" alt="trago encontrado" />
                        </div>
                        <div class="descripcion">
                            <p>
                                ${tragos[i-1].strDrink}
                            </p>
                            <p>
                                ${mapa.get(tragos[i-1].idDrink)}$
                            </p>
                        </div>
                    </div>
                </article>
                `
            main.append(card);
            //i++;
        } 
        j++;
    }
    console.log(mapa);
    localStorage.setItem("precios-tragos", JSON.stringify([...mapa]));
    console.log(JSON.stringify([...mapa]));

    
}

$(document).on('click', 'article', function () {
    sessionStorage.setItem("idtrago", this.id);
    window.location.href = '/html/trago.html';
});
$(document).on('click', '.fa-shopping-cart', function () {
    window.open('/html/carrito.html');
});

$(document).on('click', '#logo', function () {
    window.location.href = 'index.html'
});