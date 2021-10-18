
$('.checkbox').click(function(){
    if($('input.checkbox').is(':checked')){
        $('.theme').attr('href', '../css/dark.css');
    }else{
        $('.theme').attr('href', '../css//light.css');
    }
})



$(document).on('click', '.enlace', function () {
    if($('input.checkbox').is(':checked')){
        sessionStorage.setItem("modo",1);
    }else{
        sessionStorage.setItem("modo",0);
    }
});

