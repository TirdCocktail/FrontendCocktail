window.onload = () => {
    if(!sessionStorage.getItem("idtrago")){
        window.location.href='index.html';
    }
    CargarTrago();
}

function CargarTrago() {
    $.ajax({
        type: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + sessionStorage.getItem("idtrago"),
        dataType: 'json'
    }).done((data) => {
        var i = 0;
        var main = $('.dinamic-trago');
        console.log(data.drinks)
        data.drinks.forEach(trago => {
            console.log(trago);
            if (trago.idDrink != null) {
                var card = `
                <div class="nombre-trago">
                    <p>
                        ${trago.strDrink.toUpperCase()}
                    </p>
                </div>
                <div class="imagen-trago">
                    <img class="foto" src="${trago.strDrinkThumb}" alt="trago" />
                </div>
                `
                main.append(card);
                i++;
            }
        })
        CargarIngredientes(data.drinks[0]);
    });
}

function CargarIngredientes(bebida) {
    var contenido;
    if(bebida.strAlcoholic =="Alcoholic"){
        contenido = "Esta bebida contiene alcohol"
    }
    else{
        contenido = "Esta bebida no contiene alcohol"
    }
    var ingredientes;
    if (bebida.strIngredient1 != null && bebida.strIngredient1.length>2) {
        ingredientes = 
        `<p>
            1- ${bebida.strIngredient1}
        </p>
        `
    }
    if (bebida.strIngredient2 != null && bebida.strIngredient2.length>2) {
        ingredientes += 
        `<p>
            2- ${bebida.strIngredient2}
        </p>
        `
    }
    if (bebida.strIngredient3 != null && bebida.strIngredient3.length>2) {
        ingredientes += 
        `<p>
            3- ${bebida.strIngredient3}
        </p>
        `
    }
    if (bebida.strIngredient4 != null && bebida.strIngredient4.length>2) {
        ingredientes += 
        `<p>
            4- ${bebida.strIngredient4}
        </p>
        `
    }
    if (bebida.strIngredient5 != null && bebida.strIngredient5.length>2) {
        console.log(bebida.strIngredient1);
        ingredientes += 
        `<p>
            5- ${bebida.strIngredient5}
        </p>
        `
    }
    if (bebida.strIngredient6 != null && bebida.strIngredient6.length>2) {
        ingredientes += 
        `<p>
            6- ${bebida.strIngredient6}
        </p>
        `
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
            ${ingredientes}
        </div>
        <div class="preparacion">
            <p>
                PREPARACIÓN
            </p>
        </div>
        <div class="preparacion-desc">
            <p>
                ${bebida.strInstructions}
            </p>
        </div>
        `
    main.append(card);
}

