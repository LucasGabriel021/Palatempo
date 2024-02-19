/**
 * Evento de inicializar a frase
 */
$(function() {
    atualizaFrase();
});

/**
 * Variáveis globais
 */
let frase = $("#fraseExemplo").text();
let tempoInicial = parseInt($("#tempo").text());
let campo = $("#campoDigitacao");

/**
 * Funções
 */
function atualizaFrase() {
    let qtdPalavras = frase.split(" ").length;
    $("#qtdPalavras").text(qtdPalavras);
}

function iniciarTemporizador() {
    let tempoDigitacao = parseInt($("#tempo").text());
    
    let idIntervalo = setInterval(function() {
        tempoDigitacao--;
        $("#tempo").text(tempoDigitacao);
        if(tempoDigitacao < 1) {
            clearInterval(idIntervalo);
        }
    }, 1000);
}

$("#campoDigitacao").on("input", function() {
    iniciarTemporizador();
    let textoDigitado = $("#campoDigitacao").val();
    let comparavel = frase.substr(0, textoDigitado.length);
    if(textoDigitado === comparavel) {
        campo.addClass("border-sucess");
        campo.removeClass("border-danger");
    } else {
        campo.addClass("border-danger");
        campo.removeClass("border-sucess");
    }
    
    if(textoDigitado === "") {
        campo.removeClass("border-sucess");
        campo.removeClass("border-danger");
    }
});

$("#btnDarkMode").click(function() {
    $("body").toggleClass("bg-black");
})

$("#btnReiniciarJogo").click(function() {
    
})