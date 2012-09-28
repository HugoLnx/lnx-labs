$("button").each(function() {
  $(this).click(function() {
    var nome = $(this).attr("data-exercicio");
    var criar = fabricasExercicios[nome];
    mostrarExercicio(criar());
  });
});
