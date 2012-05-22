var TAMANHO_GRAFICO = "500x200";
var MARGEM = 30;
var MAIOR_DADO = 1.6;
var DADOS = {
//peso   1a       2a       3a
  "0" : [0       ,0       ,0    ],
  "5" : [0.2     ,0.15    ,0.175],
  "10": [0.45    ,0.45    ,0.4  ],
  "15": [0.65    ,0.55    ,0.6  ],
  "20": [0.9     ,0.75    ,0.8  ],
  "25": [0.9     ,1.1     ,1.1  ],
  "30": [1.2     ,1.2     ,1.25 ],
  "35": [1.4     ,1.1     ,1.4  ],
  "40": [1.6     ,1.2     ,1.5  ]
};

window.onload = function() {

  var tabela = new Tabela(DADOS);
  tabela.paraCadaTentativa(function(dados,n) {
    var canvas = criarCanvas(TAMANHO_GRAFICO,"Medição "+n);
    desenharDados(tabela.labels(),dados,canvas);
  })

  var canvasMedios = criarCanvas(TAMANHO_GRAFICO,"Valores Médios");
  desenharDados(tabela.labels(),tabela.dadosMedios(),canvasMedios);

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

  function criarCanvas(dimensao,label) {
    var width = dimensao.split("x")[0];
    var height = dimensao.split("x")[1];

    var div = document.createElement("div");
    var h1 = document.createElement("h3");
    h1.textContent = label;
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width",width+"px");
    canvas.setAttribute("height",height+"px");
    div.appendChild(h1);
    div.appendChild(canvas);
    document.body.appendChild(div);

    return canvas;
  }

  function desenharDados(labels,dados,canvas) {
    console.log(dados);
    var ctx = canvas.getContext("2d");
    desenharAxesNo(ctx);

    var width = canvas.width - MARGEM*1.5;
    var height = canvas.height - MARGEM*1.5;

    var xProporcao = width/(dados.length-1);
    var maiorDado = dados[dados.length-1];
    var yProporcao = height/MAIOR_DADO;

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
      var x = i * xProporcao + MARGEM;
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
