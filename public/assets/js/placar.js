$("#btnMostrarPlacar").click(function() {
    $("#placar").stop().slideToggle(500);
});

function dadosPlacar() {
    let qtdPalavrasPlacar = $("#contadorPalavras").text();
    let usuarioJogo = $("#usuario").val();
    // console.log(qtdPalavrasPlacar);
    // console.log(usuarioJogo);
    let linhaTabela = criarLinha(usuarioJogo, qtdPalavrasPlacar);
    linhaTabela.find(".btn-remover").click(removerLinha);
    console.log(linhaTabela);
    $("#dadosInserido").append(linhaTabela);
}

function criarLinha(usuario, qtdPalavras) {
    let trDados = $("<tr>").addClass("border-b").addClass("border-slate-700");
    let tdNome = $("<td>").addClass("text-center").addClass("text-white").addClass("text-sm").addClass("font-base").addClass("p-1");
    let tdQtdPalavras = $("<td>").addClass("text-center").addClass("text-white").addClass("text-sm").addClass("font-base").addClass("p-1");
    let tdRemover = $("<td>").addClass("text-center").addClass("text-white").addClass("text-sm").addClass("font-base").addClass("p-1");
    let buttonRemover = $("<button>").addClass("btn-remover").addClass("hover:text-cinza-card").addClass("transition-all").addClass("duration-300");
    let iRemover = $("<i>").addClass("fa-solid").addClass("fa-trash");

    tdNome.text(usuario);
    tdQtdPalavras.text(qtdPalavras);
    tdRemover.append(buttonRemover);
    buttonRemover.append(iRemover);

    return trDados.append(tdNome, tdQtdPalavras, tdRemover);
}

function removerLinha() {
    console.log("Executar função remover!");
    let item = $(this).parent().parent();
    item.fadeOut("slow");
    setTimeout(function() {
        item.remove();
    }, 500);
}