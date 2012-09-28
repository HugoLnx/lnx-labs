function Grau(grau, min, seg) {
  var grau = grau;
  var min = min;
  var seg = seg;

  this.toString = function() {
    return grau + "° " + min + "' " + seg + "\"";
  }

  this.mais = function(g) {
    var sg = g.grau() + grau;
    var sm = g.min() + min;
    var ss = g.seg() + seg;
    while(ss >= 60) {
      sm += 1;
      ss -= 60;
    }
    while(sm >= 60) {
      sg += 1;
      sm -= 60;
    }
    return new Grau(sg,sm,ss);
  }

  this.menos = function(g) {
    var sg = grau - g.grau();
    var sm = min - g.min();
    var ss = seg - g.seg();
    while(ss < 0) {
      sm -= 1;
      ss += 60;
    }
    while(sm < 0) {
      sg -= 1;
      sm += 60;
    }
    return new Grau(sg,sm,ss);
  }

  this.grau = function() {
    return grau;
  };
  this.min = function() {
    return min;
  };
  this.seg = function() {
    return seg;
  };
}

function randomizarGrau() {
  return new Grau(
    randomizarNumero(100),
    randomizarNumero(60),
    randomizarNumero(60)
  );
}

