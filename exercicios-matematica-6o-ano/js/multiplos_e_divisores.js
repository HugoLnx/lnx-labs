function multiplosDe(n,qnt) {
  var multiplos = [];
  for(var i = 0; i <= qnt; i++) {
    multiplos.push(n * i);
  }
  return multiplos;
}

function divisoresDe(n) {
  var divisores = [];
  for(var i = 1; i <= n; i++) {
    if(n % i == 0){
      divisores.push(i);
    }
  }
  return divisores;
}

function multiplosComunsDe(n1,n2) {
  var multiplos1 = multiplosDe(n1,30);
  var multiplos2 = multiplosDe(n2,30);
  var multiplos = [];
  for(var i = 0; i<multiplos1.length; i++) {
    if(multiplos2.indexOf(multiplos1[i]) !== -1){
      multiplos.push(multiplos1[i]);
    }
  }
  return multiplos;
}
