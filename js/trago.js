window.onload = () => {
    if (!sessionStorage.getItem("idtrago")) {
        window.location.href = 'index.html';
    }
    CargarTrago();


}
$(document).on('click', '.imagen-trago', function () {
    
});
$(document).on('click', '.button-acept', function () {
    document.getElementById('modal_container').classList.remove('show');
});
function Unidades(){
    let trago_compra = JSON.parse(sessionStorage.getItem("trago-completo"));
    var array = JSON.parse(localStorage.getItem('carrito'));
    if(array){
        array.forEach(trago => {
            if (trago.idDrink === trago_compra.idDrink) {
                $('#unidades').empty();
                var main = $('#unidades');
                var card = `
                    Hay ${trago.cantidad} unidades en el carrito
                    `
                main.append(card);
            }
        })
    }
}
function CargarTrago() {
    $.ajax({
        type: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + sessionStorage.getItem("idtrago"),
        dataType: 'json'
    }).done((data) => {
        var i = 0;
        var main = $('.dinamic-trago');
        sessionStorage.setItem("trago-completo", JSON.stringify(data.drinks[0]));
        AgregarAlHistorial();

        if (data.drinks[0].idDrink != null) {
            var card = `
            <div class="nombre-trago">
                <p>
                    ${data.drinks[0].strDrink.toUpperCase()}
                </p>
            </div>
            <div class="imagen-trago">
                <img class="foto" src="${data.drinks[0].strDrinkThumb}" alt="trago" />
            </div>
            <div class="nombre-trago">
                <p>
                    PRECIO: ${(new Map(JSON.parse(localStorage.getItem('precios-tragos')))).get(data.drinks[0].idDrink)}$
                </p>
            </div>
            <div class="comprar">
                <input type="number" class="input-compra" id="compra" value = '1'/>
                <button type="submit" class="agregar" id="agregar" value = '${"aa"}'>Añadir al carrito</button>
            </div>
            <div class="unidades" id="unidades">
            </div>
            `
            main.append(card);
            i++;
        }
        CargarIngredientes(data.drinks[0]);
        Unidades();

    });
}

var trago;
var contenido;
var ingredientes;
var preparacion;
function CargarIngredientes(bebida) {
    if (bebida.strDrink != null){
        trago = bebida.strDrink;
    }
    /*var contenido;*/
    if (bebida.strAlcoholic == "Alcoholic") {
        contenido = "Esta bebida contiene alcohol"
    } else {
        contenido = "Esta bebida no contiene alcohol"
    }
    /*var ingredientes;*/
    if (bebida.strIngredient1 != null && bebida.strIngredient1.length > 2) {
        ingredientes =
            `  1- ${bebida.strIngredient1}
            `
    }
    if (bebida.strIngredient2 != null && bebida.strIngredient2.length > 2) {
        ingredientes +=
            `  2- ${bebida.strIngredient2}
            `
    }
    if (bebida.strIngredient3 != null && bebida.strIngredient3.length > 2) {
        ingredientes +=
            `  3- ${bebida.strIngredient3}
            `
    }
    if (bebida.strIngredient4 != null && bebida.strIngredient4.length > 2) {
        ingredientes +=
            `  4- ${bebida.strIngredient4}
            `
    }
    if (bebida.strIngredient5 != null && bebida.strIngredient5.length > 2) {
        ingredientes +=
            `  5- ${bebida.strIngredient5}
            `
    }
    if (bebida.strIngredient6 != null && bebida.strIngredient6.length > 2) {
        ingredientes +=
            `  6- ${bebida.strIngredient6}
            `
    }
    if (bebida.strInstructions != null){
        preparacion= bebida.strInstructions;
    }
    $('.informacion').empty();
    var main = $('.informacion');
    var card = `
        <div class="titulo-alcohol">
            <p>
                DESCRIPCION
            </p>
        </div>
        <div class="alcohol">
            <p>
                ${contenido}
            </p>
        </div>
        <div class="cant-ingredientes">
            <p>
                INGREDIENTES
            </p>
        </div>
        <div class="nombre-ingredientes">
            <p>
                ${ingredientes}
            </p>
        </div>
        <div class="preparacion">
            <p>
                PREPARACIÓN
            </p>
        </div>
        <div class="preparacion-desc">
            <p>
                ${preparacion}
            </p>
        </div>
        <div class="compartir">
            <p>
                COMPARTIR
            </p>
        </div>
        <div class="fomulario">
            <form name="formulario" action="Compartirxmail" method="POST">
                <div class="item">
                    <div class="form" id="email-form">
                        <label for="email">Email Emisor:</label>
                        <input type="text" id="emisor" placeholder="Requerido">
                    </div>
                    <div class="form" id="email-form">
                        <label for="email">Email Destino:</label>
                        <input type="text" id="destino" placeholder="Requerido">
                    </div>
                    <div class="form">
                        <label for="mensaje">Mensaje:</label>
                        <input type="text" id="mensaje" maxlength="200" size="40" placeholder="Opcional">
                    </div>
                    <div class="form" id="botones">
                        <input type="button" value="Enviar mail" id="enviar" />
                        <input type="button" value="Cancelar" id="cancelar"/>
                    </div>
                    <div class="validaciones">
                    </div>
                </div>
            </form>
        </div> 
        `
    main.append(card);
}

$(document).on('click', '#agregar', function () {
    var cantidad_tragos = document.getElementById("compra").value;
    let array = [];
    let trago_compra = JSON.parse(sessionStorage.getItem("trago-completo"));
    let mapa;
    if (!localStorage.getItem('carrito')) {
        //trago_compra = JSON.parse(sessionStorage.getItem("trago-completo"));
        trago_compra.cantidad = parseInt(cantidad_tragos);
        mapa = new Map(JSON.parse(localStorage.getItem('precios-tragos')));
        trago_compra.precio = mapa.get(trago_compra.idDrink);
        array.push(trago_compra);
        localStorage.setItem('carrito', JSON.stringify(array));
    }
    else {
        var encontrado = false;
        array = JSON.parse(localStorage.getItem('carrito'));
        array.forEach(trago => {
            if (trago.idDrink === JSON.parse(sessionStorage.getItem("trago-completo")).idDrink) {
                trago.cantidad = parseInt(trago.cantidad) + parseInt(cantidad_tragos);
                encontrado = true;
            }
        })
        if (!encontrado) {
            //trago_compra = JSON.parse(sessionStorage.getItem("trago-completo"));
            trago_compra.cantidad = parseInt(cantidad_tragos);
            mapa = new Map(JSON.parse(localStorage.getItem('precios-tragos')));
            trago_compra.precio = mapa.get(trago_compra.idDrink);
            array.push(trago_compra);
        }
        localStorage.setItem('carrito', JSON.stringify(array));
    }

    document.getElementById('modal_container').classList.add('show');
    $('#modal').css('background-image', 'url(' + trago_compra.strDrinkThumb + ')');
    $('.text-modal').empty();
    var main = $('.text-modal');
    var card = `
        <p>
        ¡Se añadieron correctamente ${cantidad_tragos} unidades de ${trago_compra.strDrink} al carrito!
        </p>
        `
    main.append(card);
});

$(document).on('click', '.fa-shopping-cart', function () {
    window.open('/html/carrito.html');
});

function AgregarAlHistorial2() {
    let array = [];
    let trago;
    if (!localStorage.getItem('historial')) {
    } else {
        array = JSON.parse(localStorage.getItem('historial'));
        var i = 0;
        array.forEach(trago_guardado => {
            if (trago_guardado.idDrink === JSON.parse(sessionStorage.getItem("trago-completo")).idDrink) {
                array.splice(i, 1);
            }
            i++;
        })
    }
    trago = JSON.parse(sessionStorage.getItem("trago-completo"));
    array.push(trago);
    localStorage.setItem('historial', JSON.stringify(array));
}

function AgregarAlHistorial() {
    let array = [];
    let trago;
    if (localStorage.getItem('historial')) {
        array = JSON.parse(localStorage.getItem('historial'));
        var i = 0;
        array.forEach(trago_guardado => {
            if (trago_guardado.idDrink === JSON.parse(sessionStorage.getItem("trago-completo")).idDrink) {
                array.splice(i, 1);
            }
            i++;
        })
    }
    trago = JSON.parse(sessionStorage.getItem("trago-completo"));
    array.push(trago);
    localStorage.setItem('historial', JSON.stringify(array));
}

$(document).on('click', '#enviar', function () {
    var mailemisor = document.getElementById("emisor").value;
	var maildestino = document.getElementById("destino").value;
	var mensaje = document.getElementById("mensaje").value;

    localStorage.setItem("destino", maildestino);
	localStorage.setItem("mensaje", mensaje);

    var regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if (mailemisor == null || mailemisor == "" || !regExp.test(mailemisor)) {
        $('.validaciones').empty();
        var main = $('.validaciones');
        var card = `
            <p>
                Debe ingresar un mail valido
            </p>
            `
        main.append(card);
    }
    else if (maildestino == null || maildestino == "" || !regExp.test(maildestino)){
        $('.validaciones').empty();
        var main = $('.validaciones');
        var card = `
            <p>
                Debe ingresar un mail valido
            </p>
            `
        main.append(card);
    }
    else{
        var mail = "mailto:"+maildestino+"?&subject=Compremos este trago"+
								"&body=Nombre trago: "+trago+
                                " %0D%0A %0D%0ADescripción: "+contenido+
                                " %0D%0A %0D%0AIngredientes: "+ingredientes+
                                " %0D%0A %0D%0APreparación: "+preparacion+
								" %0D%0A %0D%0AMensaje: "+mensaje;
			        window.open(mail,'popup','toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=600,width=700,height=700');
    }
});
