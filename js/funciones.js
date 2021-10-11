window.onload = () => {
    sessionStorage.removeItem("idtrago");
    //localStorage.removeItem("precios-tragos");

    /*
    let mapa= new Map();
    mapa.set("nombre","pedro");
    if(!mapa.get("nombre")){
        mapa.set("nombre","juan");

    }
    mapa.set("apellidos","gomez");
    mapa.set("edad",20);
    console.log(mapa);
    console.log(mapa.get("nombre"));
    console.log(mapa.get("nombres"));
    console.log(JSON.stringify([...mapa]));
    console.log(new Map(JSON.parse(JSON.stringify([...mapa]))));
    */
    /*let mapa= new Map();
    mapa.set('nombre',3243);
    
    console.log(JSON.stringify([...mapa]));
    console.log(new Map(JSON.parse(JSON.stringify([...mapa]))));
    */
}

/*
function buscarTrago() {
    $('#dinamica').empty();
    var busqueda = document.getElementById("busqueda").value;
    console.log(busqueda);
    $.ajax({
        type: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + busqueda,
        dataType: 'json'
    }).done((data) => {
        console.log(data.drinks)
        var i = 0;
        var main = $('#dinamica');
        console.log(data)
        data.drinks.forEach(trago => {
            console.log(trago);
            if (trago.idDrink != null) {
                var card = `
                <article id="${trago.idDrink}">
                    <div class="trago">
                        <div class="imagen">
                            <img class="foto" src="${trago.strDrinkThumb}" alt="trago encontrado" />
                        </div>
                        <div class="descripcion">
                            <p>
                                ${trago.strDrink}
                            </p>
                        </div>
                    </div>
                </article>
                `
                main.append(card);
                i++;
            }
        })
    });
}

*/



/*
$(document).on('click', '#buscarTrago', function () {
    let mapa;
    if(!localStorage.getItem('precios-tragos')){
        mapa= new Map();
        console.log("No hay dicc")
    }
    else{
        mapa = new Map(JSON.parse(localStorage.getItem('precios-tragos')));
        console.log("Hay dicc")
    }
    $('#dinamica').empty();
    var busqueda = document.getElementById("busqueda").value;
    console.log(busqueda);
    $.ajax({
        type: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + busqueda,
        dataType: 'json'
    }).done((data) => {
        console.log(data.drinks);
        var i = 1;
        var main = $('#dinamica');
        var precio;
        console.log(data)
        data.drinks.forEach(trago => {
            precio = Math.round(Math.random() * (800 - 200) + 200);
            if(!mapa.get(trago.idDrink)){
                mapa.set(trago.idDrink,precio);
            }
            //mapa.set(trago.idDrink,Math.round(Math.random() * (800 - 200) + 200));

            console.log(mapa);
            if (trago.idDrink != null) {
                var card = `
                <article id="${trago.idDrink}">
                    <div class="trago">
                        <div class="imagen">
                            <img class="foto" src="${trago.strDrinkThumb}" alt="trago encontrado" />
                        </div>
                        <div class="descripcion">
                            <p>
                                ${trago.strDrink}
                            </p>
                            <p>
                                ${mapa.get(trago.idDrink)}$
                            </p>
                        </div>
                    </div>
                </article>
                `
                main.append(card);
                i++;
            }
        })
        console.log(mapa);
        localStorage.setItem("precios-tragos",JSON.stringify([...mapa]));
        console.log(JSON.stringify([...mapa]));
    });
});
*/
$(document).on('click', '#buscarTrago', function () {

    $('#dinamica').empty();
    var busqueda = document.getElementById("busqueda").value;
    console.log(busqueda);
    $.ajax({
        type: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + busqueda,
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
        console.log("No hay dicc")
    } else {
        mapa = new Map(JSON.parse(localStorage.getItem('precios-tragos')));
        console.log("Hay dicc")
    }
    var tragos = JSON.parse(sessionStorage.getItem("tragos"));
    console.log(tragos);
    var main = $('#dinamica');
    var precio;
    var j = 1;
    for (var i = 0 + pagina * 10; i < (pagina + 1) * 10 && i < tragos.length; i++) {
        precio = Math.round(Math.random() * (800 - 200) + 200);
        if (!mapa.get(tragos[i].idDrink)) {
            mapa.set(tragos[i].idDrink, precio);
        }
        //mapa.set(trago.idDrink,Math.round(Math.random() * (800 - 200) + 200));

        console.log(tragos[i].idDrink);
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
            //i++;
        } 
        j++;
    }
    console.log(mapa);
    localStorage.setItem("precios-tragos", JSON.stringify([...mapa]));
    console.log(JSON.stringify([...mapa]));

    sessionStorage.setItem("pagina", pagina);
    console.log(j);
    if (j<10) {
        DelButton();
    } else {
        AddButton();
    }
}
$(document).on('click', '#ver-mas', function () {
    //sessionStorage.setItem("idtrago", this.id);
    console.log(sessionStorage.getItem("pagina") + 1);
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
/*
$(document).on('click', 'article', function () {
    var nuevo_valor;
    var precio = document.getElementById("artista" + this.id).getAttribute("value");
    console.log(precio);
  
    if (this.value == "seleccionado") {
      $('.artista .imagen img', this).css('opacity', 1);
      $('.artista', this).css('background-color', "");
      $('.artista', this).css('color', "black");
      this.value = ""
  
  $(document).on('click', '#logo', function () {
      window.location.href='/html/index.html'
      nuevo_valor = parseInt(sessionStorage.getItem("valor_carrito")) - parseInt(precio);
      sessionStorage.setItem("valor_carrito", nuevo_valor);
    } else {
      $('img', this).css('opacity', .75);
      $('.artista', this).css('background-color', "rgb(80, 80, 80)");
      $('.artista', this).css('color', "white");
      this.value = "seleccionado";
  
      if (sessionStorage.getItem("valor_carrito")) {
        nuevo_valor = parseInt(sessionStorage.getItem("valor_carrito")) + parseInt(precio);
        sessionStorage.setItem("valor_carrito", nuevo_valor);
      } else {
        sessionStorage.setItem("valor_carrito", parseInt(precio));
      }
    }
    $('.precio').empty();
      var contenido = $('.precio');
      var text = `<p>${nuevo_valor}$</p>`;
      contenido.append(text);
  });
  */
$(document).on('click', '#logo', function () {
    window.location.href = 'index.html'
});