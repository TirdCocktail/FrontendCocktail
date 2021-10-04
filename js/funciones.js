window.onload = () => {
    sessionStorage.removeItem("idtrago");
}



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






$(document).on('click', '#buscarTrago', function () {
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
});


$(document).on('click', 'article', function () {
    sessionStorage.setItem("idtrago",this.id);
    window.open('/html/trago.html');
});