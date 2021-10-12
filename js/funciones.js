window.onload = () => {
    sessionStorage.removeItem("idtrago");
}
var busc = document.getElementById("busc").value;
$('#busc').change(function() {
    busc = $(this).val();
    var busqueda = $(".buscar-texto")[0];
    switch (busc) {
        case "nombre":
            busqueda.placeholder="Ingrese el nombre";
            break;
        case "ingrediente":
            busqueda.placeholder="Ingrese el ingrediente";
            break;
        default:
            break;
    }
});


$.ajax({
    type: 'GET',
    url: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list',
    dataType: 'json'
}).done((data) => {
    data.drinks.map(drink=>{
    var card1= `<input type="button" value="${drink.strAlcoholic}" id="alcoholic">`
    var filtroa = $('#alcohol');
    filtroa.append(card1);
    });
});
    
$.ajax({
    type: 'GET',
    url: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    dataType: 'json'
}).done((data) => {
    data.drinks.map(drink=>{
        var card2= `<input type="button" value="${drink.strCategory}" id="category">`
        var filtroc = $('#categoria');
        filtroc.append(card2);
    });
});

$(document).on('click', '#category', function () {
    $('#dinamica').empty();
    var category = $(this).val();
    console.log(category);
    $.ajax({
    type: 'GET',
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
        dataType: 'json'
    }).done((data) => {
        var pagina = 0;
        sessionStorage.setItem("tragos", JSON.stringify(data.drinks));
        Renderizar(pagina);
    });
});


$(document).on('click', '#alcoholic', function () {
    $('#dinamica').empty();
    var alcoholic = $(this).val();
    console.log(alcoholic)
    $.ajax({
    type: 'GET',
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic}`,
        dataType: 'json'
    }).done((data) => {
        var pagina = 0;
        sessionStorage.setItem("tragos", JSON.stringify(data.drinks));
        Renderizar(pagina);
    });
});




$('#buscarTrago').on('click', function() {
    $('#dinamica').empty();
    var busqueda = document.getElementById("busqueda").value;
    if (busqueda == "") return;
    
    if (busc == "nombre"){
        buscarPorNombre(busqueda);
    } else if(busc == "ingrediente") {
        buscarPorIngrediente(busqueda);
    }
});

function buscarPorNombre(valor) {
    const URL  = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    $.ajax({
        type: 'GET',
        url: `${URL}`+ valor,
        dataType: 'json'
    }).done((data) => {
        var pagina = 0;
        sessionStorage.setItem("tragos", JSON.stringify(data.drinks));
        Renderizar(pagina);
    });
}

function buscarPorIngrediente(valor){
    const URL  = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+valor;
    console.log(URL)
    $.ajax({
        type: 'GET',
        url: `${URL}`,
        dataType: 'json'
    }).done((data) => {
        var pagina = 0;
        sessionStorage.setItem("tragos", JSON.stringify(data.drinks));
        Renderizar(pagina);
    });
}

function Renderizar(pagina) {
    let mapa;
    if (!localStorage.getItem('precios-tragos')) {
        mapa = new Map();
    } else {
        mapa = new Map(JSON.parse(localStorage.getItem('precios-tragos')));
    }
    var tragos = JSON.parse(sessionStorage.getItem("tragos"));
    console.log(tragos)
    var main = $('#dinamica');
    var precio;
    var j = 1;
    for (var i = 0 + pagina * 10; i < (pagina + 1) * 10 && i < tragos.length; i++) {
        precio = Math.round(Math.random() * (800 - 200) + 200);
        if (!mapa.get(tragos[i].idDrink)) {
            mapa.set(tragos[i].idDrink, precio);
        }
        if (tragos[i].idDrink != null) {
            var card = `
                <article id="${tragos[i].idDrink}">
                    <div class="trago">
                        <div class="imagen">
                            <img class="foto" src="${tragos[i].strDrinkThumb}" alt="trago encontrado" />
                        </div>
                        <div class="descripcion">
                            <p>
                                ${tragos[i].strDrink}
                            </p>
                            <p>
                                ${mapa.get(tragos[i].idDrink)}$
                            </p>
                        </div>
                    </div>
                </article>
                `
            main.append(card);
        } 
        j++;
    }
    localStorage.setItem("precios-tragos", JSON.stringify([...mapa]));
    sessionStorage.setItem("pagina", pagina);
    if (j<10) {
        DelButton();
    } else {
        AddButton();
    }
}
$(document).on('click', '#ver-mas', function () {
    Renderizar(parseInt(sessionStorage.getItem("pagina")) + 1);
});

function AddButton() {
    $('.button-view').empty();
    var main = $('.button-view');
    var card = `
        <button type="submit" class="ver-mas" id="ver-mas" >VER MÁS TRAGOS</button>
    `
    main.append(card);
}

function DelButton() {
    $('.button-view').empty();
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