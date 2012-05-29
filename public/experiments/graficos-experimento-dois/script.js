var TAMANHO_GRAFICO = "500x400";
var MARGEM = 30;
var EXPERIMENTOS = [
  {
    titulo: "Mola 1",
    maiorDado: 8.2,
    dados : {
    //peso   1a       2a         3a
      0 : [0        ,0        ,0  ],
      1 : [0.1      ,0.2      ,0.2],
      2 : [0.3      ,0.5      ,0.5],
      3 : [0.5      ,0.8      ,0.9],
      4 : [0.7      ,1.1      ,1.2],
      5 : [0.9      ,1.4      ,1.6],
      10: [1.7      ,2.2      ,2.4],
      15: [2.5      ,3.0      ,3.1],
      20: [3.4      ,3.9      ,3.8],
      25: [4.2      ,4.7      ,4.7],
      30: [5.1      ,5.6      ,5.6],
      35: [5.9      ,6.4      ,6.4],
      40: [6.8      ,7.3      ,7.3],
      45: [7.4      ,8.2      ,8.2]
    },
  },
  {
    titulo: "Mola 2",
    maiorDado: 5.6,
    dados : {
    //peso   1a       2a         3a
      0 : [0.0      ,0.0      ,0.0],
      1 : [0.0      ,0.0      ,0.0],
      2 : [0.0      ,0.0      ,0.0],
      3 : [0.0      ,0.0      ,0.0],
      4 : [0.0      ,0.1      ,0.1],
      5 : [0.1      ,0.3      ,0.3],
      10: [0.8      ,1.0      ,1.0],
      15: [1.5      ,1.7      ,1.6],
      20: [2.2      ,2.3      ,2.2],
      25: [2.9      ,3.0      ,2.9],
      30: [3.1      ,3.7      ,3.5],
      35: [3.9      ,4.3      ,4.2],
      40: [4.1      ,5.0      ,4.9],
      45: [4.8      ,5.6      ,5.6]
    },
  },
  {
    titulo: "Mola 3",
    maiorDado: 5.2,
    dados : {
    //peso   1a       2a         3a
      0 : [0.0      ,0.0      ,0.0],
      1 : [0.0      ,0.0      ,0.0],
      2 : [0.0      ,0.0      ,0.0],
      3 : [0.0      ,0.0      ,0.0],
      4 : [0.0      ,0.0      ,0.0],
      5 : [0.0      ,0.0      ,0.0],
      10: [0.1      ,0.1      ,0.2],
      15: [0.7      ,0.8      ,0.9],
      20: [1.4      ,1.5      ,1.6],
      25: [2.0      ,2.2      ,2.4],
      30: [2.8      ,2.9      ,3.1],
      35: [3.3      ,3.5      ,3.8],
      40: [4.1      ,4.3      ,4.5],
      45: [4.8      ,5.0      ,5.2]
    }
  }
];

window.onload = function() {

  for(var i = 0; i<EXPERIMENTOS.length; i++) {
    var experimento = EXPERIMENTOS[i];
    desenharGraficos(experimento);
  }

  function Tabela(tabela) {
    var _labels = extrairLabels(tabela);
    var _dados = extrairDados(tabela,_labels)
    
    this.dadosDaTentativa = function(n) {
      var tentativa = [];
      for(var i = 0; i<_dados.length; i++) {
        var dado = _dados[i][n-1];
        tentativa.push(dado);
      }
      return tentativa;
    }

    this.dadosMedios = function() {
      var medios = [];
      for(var i = 0; i<_dados.length; i++) {
        var linha = _dados[i];
        var soma = 0;
        for(var j = 0; j<linha.length; j++) {
          var dado = linha[j];
          soma += dado;
        }
        medios.push(soma/linha.length);
      }
      return medios;
    }

    this.paraCadaTentativa = function(f) {
      for(var i = 1; i <= _dados[0].length; i++) {
        f(this.dadosDaTentativa(i),i);
      }
    }

    this.labels = function() {
      return _labels;
    };

    function extrairLabels(tabela) {
      var labels = []
      for(var key in tabela) {
        if(tabela.hasOwnProperty(key)) {
          labels.push(key);
        }
      }
      return labels;
    }

    function extrairDados(tabela,labels) {
      var dados = [];
      for(var i = 0; i<labels.length; i++) {
        var label = labels[i];
        dados.push(tabela[label]);
      }
      return dados;
    }
  }

  function desenharGraficos(experimento) {
    var tabela = new Tabela(experimento.dados);
    inserirTitulo(experimento.titulo);
    tabela.paraCadaTentativa(function(dados,n) {
      var canvas = criarCanvas(TAMANHO_GRAFICO,"Medição "+n);
      desenharDados(tabela.labels(),dados,canvas,experimento.maiorDado);
    })

    var canvasMedios = criarCanvas(TAMANHO_GRAFICO,"Valores Médios");
    desenharDados(tabela.labels(),tabela.dadosMedios(),canvasMedios);
  }

  function inserirTitulo(titulo) {
    var h2 = document.createElement("h2");
    h2.setAttribute("style", "padding-top: 100px");
    h2.textContent = titulo;
    document.body.appendChild(h2);
  }

  function criarCanvas(dimensao,label) {
    var width = dimensao.split("x")[0];
    var height = dimensao.split("x")[1];

    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = label;
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width",width+"px");
    canvas.setAttribute("height",height+"px");
    div.appendChild(h3);
    div.appendChild(canvas);
    document.body.appendChild(div);

    return canvas;
  }

  function desenharDados(labels,dados,canvas,maiorDado) {
    var ctx = canvas.getContext("2d");
    desenharAxesNo(ctx);

    var width = canvas.width - MARGEM*1.5;
    var height = canvas.height - MARGEM*1.5;

    var xProporcao = width/(labels[labels.length-1]);
    var maiorDado = dados[dados.length-1];
    var yProporcao = height/maiorDado;

    ctx.strokeStyle = "#0c7";
    ctx.lineWidth = 1;
    ctx.beginPath();
    var dado = dados[0];
    var x = MARGEM;
    var y = canvas.height - (dado * yProporcao+MARGEM);
    ctx.moveTo(x,y);
    for(var i = 1; i<labels.length; i++) {
      var label = labels[i];
      var dado = dados[i];
      var x = label * xProporcao + MARGEM;
      var y = canvas.height - (dado * yProporcao+MARGEM);
      ctx.textAlign = "center";
      ctx.fillText(label,x,height+MARGEM);
      ctx.textAlign = "right";
      ctx.fillText(roundNumber(dado,2),MARGEM-2,y);
      ctx.lineTo(x,y);
    }

    ctx.stroke();
  }

  function desenharAxesNo(ctx) {
    var canvas = ctx.canvas;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(MARGEM, 0)
    ctx.lineTo(MARGEM, canvas.height - MARGEM);
    ctx.lineTo(canvas.width, canvas.height - MARGEM);
    
    ctx.stroke();
  }

  function roundNumber(num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
  }
}
