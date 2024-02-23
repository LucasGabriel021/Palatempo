let jogadores = [];

/**
 * Evento de inicializar a frase
 */
$(function() {
    atualizaFrase();
    reiniciarJogo();
    const jogadoresString = localStorage.getItem("jogadores");
    const jogadoresArray = JSON.parse(jogadoresString);
    console.log(jogadoresArray.length);

    $(jogadoresArray).each(function() {
        // console.log(this.nome);
        // console.log(this.palavras);
        dadosPlacar(this.palavras, this.nome)
    });
});

$("#inicarJogo").on("submit", function() {
    event.preventDefault();
    $("#telaInicial").addClass("hidden");
    $("#jogo").removeClass("hidden");
});

$("#btnVoltar").click(function() {
    $("#jogo").addClass("hidden");
    $("#telaInicial").removeClass("hidden");
    reiniciarJogo();
});

/**
 * Variáveis globais
 */
let tempoInicial = parseInt($("#tempo").text());
let campo = $("#campoDigitacao");

/**
 * Funções
 */
function atualizaFrase() {
    let frase = $("#fraseExemplo").text();
    let qtdPalavras = frase.split(/\S+/).length - 1;
    $("#qtdPalavras").text(qtdPalavras);
}

function iniciarTemporizador() {
    let tempoDigitacao = parseInt($("#tempo").text());
    
    let idIntervalo = setInterval(function() {
        tempoDigitacao--;
        $("#tempo").text(tempoDigitacao);
        if(tempoDigitacao < 1) {
            let qtdPalavrasPlacar = $("#contadorPalavras").text();
            let usuarioJogo = $("#usuario").val();
            campo.attr("disabled", true);
            campo.addClass("disabled");
            clearInterval(idIntervalo);
            dadosPlacar(qtdPalavrasPlacar, usuarioJogo);
            salvarDados(qtdPalavrasPlacar, usuarioJogo);
        }
    }, 1000);
}

$("#campoDigitacao").focus(iniciarTemporizador);

$("#campoDigitacao").on("input", function() {
    inicializarContadores();
    let frase = $("#fraseExemplo").text();
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

$("#btnReiniciarJogo").click(reiniciarJogo);

function reiniciarJogo() {
    $("#tempo").text(tempoInicial);
    campo.val("");
    campo.removeClass("disabled");
    campo.removeClass("border-sucess");
    campo.removeClass("border-danger");
    campo.attr("disabled", false);
    $("#contadorPalavras").text("0");
    $("#contadorCaracteres").text("0");
}

function inicializarContadores() {
    let contadorPalavras = campo.val().split(/\S+/).length - 1;
    let caracteres = campo.val().trim().replace(/\s+/g, ''); // Expressão regular que remove todos os espaços em branco no meio da string.
    let contadorCaracteres = caracteres.length;
    
    $("#contadorPalavras").text(contadorPalavras);
    $("#contadorCaracteres").text(contadorCaracteres);
}

$("#btnGerarFase").click(function() {
    let numAleatorio = Math.floor(Math.random() * 10);
    $("#fraseExemplo").text(frases[numAleatorio].frase);
    $("#tempo").text(frases[numAleatorio].tempo);
    atualizaFrase();
});

function salvarDados(palavrasJogo, usuarioJogo) {
    if(jogadoresArray.length > 10) {
        localStorage.clear();
    }
    
    let jogador = {
        nome: usuarioJogo,
        palavras: palavrasJogo
    }

    jogadores.push(jogador);

    let jogadoresJson = JSON.stringify(jogadores);
    localStorage.setItem("jogadores", jogadoresJson);
}