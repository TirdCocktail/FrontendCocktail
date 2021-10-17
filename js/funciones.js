window.onload = () => {
    sessionStorage.removeItem("idtrago");
}
var busc = document.getElementById("busc").value;
var ini = [];
if (busc == 'nombre'){
    var nombre = $('.tipo-busqueda');
    var card = `
        <div class="buscar">
            <div class="texto">
                <input type="text" class="buscar-texto" placeholder="Ingrese el nombre"
                id="busqueda" />
            </div>
        <div class="busqueda boton" id="buscarTrago">
            <i class="fas fa-search"></i>
            </div>  
        </div> 
        `
    nombre.append(card);
    $.ajax({
        type: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list',
        dataType: 'json'
    }).done((data) => {
        data.drinks.map(drink=>{
        var cat= drink.strGlass;
        ini.push(cat);
        });
    Inicio();
    });
    
}

function Inicio(){
    var aleatorio = ini[Math.floor(Math.random() * ini.length)];
    $.ajax({
        type: 'GET',
        url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g="+aleatorio,
        dataType: 'json'
    }).done((data) => {
        var pagina = 0;
        sessionStorage.setItem("tragos", JSON.stringify(data.drinks));
        Renderizar(pagina);
    });
}



$('#busc').change(function() {
    busc = $(this).val();
    switch (busc) {
        case "nombre":
            $('#error').empty();
            $('.tipo-busqueda').empty();
            var nombre = $('.tipo-busqueda');
            var card = `
                <div class="buscar">
                    <div class="texto">
                        <input type="text" class="buscar-texto" placeholder="Ingrese el nombre"
                        id="busqueda" />
                    </div>
                <div class="busqueda boton" id="buscarTrago">
                    <i class="fas fa-search"></i>
                    </div>  
                </div> 
                `
            nombre.append(card);
            break;
        case "ingrediente":
            $('#error').empty();
            $('.tipo-busqueda').empty();
            var ingrediente = $('.tipo-busqueda');
            var card = `
                <div class="buscar">
                    <div class="texto">
                        <input type="text" class="buscar-texto" placeholder="Ingrese el ingrediente"
                        id="busqueda" />
                    </div>
                <div class="busqueda boton" id="buscarTrago">
                    <i class="fas fa-search"></i>
                    </div>  
                </div> 
                `
            ingrediente.append(card);
            break;
        case "contienealcohol":
            $('#error').empty();
            $('.tipo-busqueda').empty();
            var alcohol = $('.tipo-busqueda');
            var card = `
                <div class="alcohol-filtro" id="alcohol">
                    <label for="conalcohol" id="conalcohol">Contenido Alcohólico</label>
                </div>
            `
            alcohol.append(card);
            ContAlcohol();
            break;
        case "categoria":
            $('#error').empty();
            $('.tipo-busqueda').empty();
            var categoria = $('.tipo-busqueda');
            var card = `
                <div class="categoria-filtro" id="categoria">
                    <label for="categoria" id="selcat">Categoria</label>

                </div>
                `
            categoria.append(card);
            Categoria();
            break;    
        default:
            break;
    }
});


$(document).on('click','#buscarTrago', function() {
    $('#error').empty();
    $('#dinamica').empty();
    var busqueda = document.getElementById("busqueda").value;
    if (busqueda == "") return;
    
    if (busc == "nombre"){
        buscarPorNombre(busqueda);
    } else if(busc == "ingrediente") {
        console.log(busc);
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
        var result = data.drinks;
        if(result != null){
            console.log(result);
            var pagina = 0;
            sessionStorage.setItem("tragos", JSON.stringify(data.drinks));
            Renderizar(pagina);
        }
        else{
            console.log(result);
            error.innerHTML ="Sin resultados, vuelva a intentar."
        }
    });
}

function buscarPorIngrediente(valor){
    const URL  = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    console.log(URL);
    $.ajax({
        type: 'GET',
        url: `${URL}`+ valor,
        dataType: 'json',
    }).done((data) => {
        var pagina = 0;
        sessionStorage.setItem("tragos", JSON.stringify(data.drinks));
        Renderizar(pagina);
        result = data;
    }).fail(() => {
        error.innerHTML ="Sin resultados, vuelva a intentar."
    });;
}



function ContAlcohol(){
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
}

function Categoria(){
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
}


$(document).on('click', '#category', function () {
    $('#dinamica').empty();
    var category = $(this).val();
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



function Renderizar(pagina) {
    let mapa;
    if (!localStorage.getItem('precios-tragos')) {
        mapa = new Map();
    } else {
        mapa = new Map(JSON.parse(localStorage.getItem('precios-tragos')));
    }
    var tragos = JSON.parse(sessionStorage.getItem("tragos"));
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