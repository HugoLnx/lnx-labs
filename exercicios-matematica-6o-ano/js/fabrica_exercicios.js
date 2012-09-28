var fabricasExercicios = {
  exercicioDeMultiplo: function() {
    var n = randomizarNumero(15);
    var enunciado = "Calcule os múltiplos de: " + n;
    var resposta = multiplosDe(n,10).join(', ') + " ...";
    return new Exercicio(enunciado, resposta);
  },

  exercicioDeDivisores: function() {
    var n = randomizarNumero(90);
    var enunciado = "Calcule os divisores de: " + n;
    var resposta = divisoresDe(n).join(', ');
    return new Exercicio(enunciado, resposta);
  },

  exercicioDeMultiplosEmComum: function() {
    var n1 = randomizarNumero(10);
    var n2 = randomizarNumero(10);
    var enunciado = "Calcule os múltiplos comuns de:" + n1 + " e " + n2;
    var resposta = multiplosComunsDe(n1,n2).join(', ') + '...';
    return new Exercicio(enunciado, resposta);
  },

  exercicioDeMMC: function() {
    function novoExercicio() {
      var n1 = randomizarNumero(250) + 1;
      var n2 = randomizarNumero(250) + 1;
      var n3 = randomizarNumero(250) + 1;
      var enunciado = "Qual o m.m.c. de: " + [n1,n2,n3].join(',') + "?";
      var resposta = mostrarDecomposicaoSimultaneaDe(n1,n2,n3);
      var fatores = decomposicaoSimultaneaDe(n1,n2,n3);
      var mmc = multiplicacao(fatores);
      resposta += "<br/>Resposta: " + (fatores.length == 1 ? "" : fatores.join(" x ") + " = ") + mmc;
      return mmc <= 1000 ? new Exercicio(enunciado, resposta) : novoExercicio();
    }
    return novoExercicio();
  },

  exercicioDeMDC: function() {
    function novoExercicio(){
      var n1 = randomizarNumero(250) + 1;
      var n2 = randomizarNumero(250) + 1;
      var n3 = randomizarNumero(250) + 1;
      var enunciado = "Qual o m.d.c. de: " + [n1,n2,n3].join(',') + "?";
      var resposta = mostrarDecomposicaoSimultaneaDe(n1,n2,n3,true);
      var fatores = decomposicaoSimultaneaDe(n1,n2,n3,true);
      var mdc = multiplicacao(fatores);
      resposta += "<br/>Resposta: " + (fatores.length == 1 ? "" : fatores.join(" x ") + " = ") + mdc;
      return fatores.length >= (randomizarNumero(3)+1) ? new Exercicio(enunciado, resposta) : novoExercicio();
    }
    return novoExercicio();
  },

  exercicioDeSubtracaoDeGraus: function() {
    function novoExercicio(){
      var g1 = randomizarGrau();
      var g2 = randomizarGrau();
      var enunciado = g1.toString() + " - " + g2.toString() + " = ?";
      var resultado = g1.menos(g2);
      var resposta = resultado.toString();
      return resultado.grau() >= 0 ? new Exercicio(enunciado, resposta) : novoExercicio();
    }
    return novoExercicio();
  },

  exercicioDeSomaDeGraus: function() {
    var g1 = randomizarGrau();
    var g2 = randomizarGrau();
    var enunciado = g1.toString() + " + " + g2.toString() + " = ?";
    var resposta = g1.mais(g2).toString();
    return new Exercicio(enunciado, resposta);
  }
};

