/**
 * Evento de inicializar a frase
 */
$(function() {
    atualizaFrase();
});

$("#inicarJogo").on("submit", function() {
    event.preventDefault();
    $("#telaInicial").addClass("hidden");
    $("#jogo").removeClass("hidden");
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
    let qtdPalavras = frase.split(/\S+/).length - 1;
    $("#qtdPalavras").text(qtdPalavras);
}

function iniciarTemporizador() {
    let tempoDigitacao = parseInt($("#tempo").text());
    
    let idIntervalo = setInterval(function() {
        tempoDigitacao--;
        $("#tempo").text(tempoDigitacao);
        if(tempoDigitacao < 1) {
            campo.attr("disabled", true);
            campo.addClass("disabled");
            clearInterval(idIntervalo);
            dadosPlacar();
        }
    }, 1000);
}

$("#campoDigitacao").focus(iniciarTemporizador);

$("#campoDigitacao").on("input", function() {
    inicializarContadores();
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
    $("#tempo").text(tempoInicial);
    campo.val("");
    campo.removeClass("disabled");
    campo.removeClass("border-sucess");
    campo.removeClass("border-danger");
    campo.attr("disabled", false);
    $("#contadorPalavras").text("0");
    $("#contadorCaracteres").text("0");
})

function inicializarContadores() {
    let contadorPalavras = campo.val().split(/\S+/).length - 1;
    let caracteres = campo.val().trim().replace(/\s+/g, ''); // Expressão regular que remove todos os espaços em branco no meio da string.
    let contadorCaracteres = caracteres.length;
    
    $("#contadorPalavras").text(contadorPalavras);
    $("#contadorCaracteres").text(contadorCaracteres);
}