function Exercicio(enunciado, resposta) {
  var enunciado = enunciado;
  var resposta = resposta;

  this.enunciado = function() {
    return enunciado;
  };

  this.resposta = function() {
    return resposta;
  };

}

function mostrarExercicio(exercicio){
  $("<div>")
    .css("padding", "30px")
    .prependTo("#exercicios")
    .append("<span>").find("span")
    .text(exercicio.enunciado())
    .after("<span>").next("span")
    .css("display", "none")
    .html("Resposta: " + exercicio.resposta())
    .after("<button>").next("button")
    .html("Ver Resposta")
    .click(function(){
      $(this)
        .prev("span").css("display","block")
        .end().remove();
    });
}
