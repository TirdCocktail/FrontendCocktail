window.onload = () => {
    cargarMapa();
}

function cargarMapa(){
var mapa = L.map('mapa').setView([-34.92212, -57.95541], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 25,
}).addTo(mapa);

L.marker([-34.92212, -57.95541]).addTo(mapa).bindPopup('Catedral de La Plata <br> Calle 14 E/ 51 y 53, La Plata, Pcia.de Bs. As.')
.openPopup();
}
