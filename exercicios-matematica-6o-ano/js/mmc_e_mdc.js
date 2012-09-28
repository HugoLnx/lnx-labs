function mostrarDecomposicaoSimultaneaDe(n1, n2, n3, marcarComum) {
  var decomposicao = "<br/>" + numsDecomposicao([n1,n2,n3]);
  while(n1 !== 1 || n2 !== 1 || n3 !== 1) {
    var marcar = false;
    var divisor = 2;
    while(n1 % divisor !== 0 &&
          n2 % divisor !== 0 &&
          n3 % divisor !== 0) {
      divisor += 1;
    }
    if(marcarComum &&
       n1 % divisor === 0 &&
       n2 % divisor === 0 &&
       n3 % divisor === 0) {
      marcar = true;
    }
    if(n1 % divisor === 0) n1 = n1 / divisor;
    if(n2 % divisor === 0) n2 = n2 / divisor;
    if(n3 % divisor === 0) n3 = n3 / divisor;
    decomposicao += proxDecomposicao([n1,n2,n3],divisor,marcar);
  }

  return decomposicao;
}

function decomposicaoSimultaneaDe(n1,n2,n3,somenteComum) {
  var fatores = [];
  while(n1 !== 1 || n2 !== 1 || n3 !== 1) {
    var divisor = 2;
    while(n1 % divisor !== 0 &&
          n2 % divisor !== 0 &&
          n3 % divisor !== 0) {
      divisor += 1;
    }
    if(!somenteComum || (
       n1 % divisor === 0 &&
       n2 % divisor === 0 &&
       n3 % divisor === 0))
    {
      fatores.push(divisor);
    }
    if(n1 % divisor === 0) n1 = n1 / divisor;
    if(n2 % divisor === 0) n2 = n2 / divisor;
    if(n3 % divisor === 0) n3 = n3 / divisor;
  }

  return fatores;
}

function proxDecomposicao(nums, divisor, marcar) {
  var str = " | " + formata(divisor,3);
  if(marcar) str += " <="
  str +=  "<br/>" + numsDecomposicao(nums);
  return str; 
}

function numsDecomposicao(nums) {
  for(var i = 0; i<nums.length; i++) {
    var num = nums[i];
    nums[i] = formata(num,3);
  }

  return nums.join(", ");
}

function formata(str, espaco) {
  var str = str.toString();
  var t = espaco - str.length;
  for(var i = 1; i <= t ; i++) {
    str += "&nbsp";
  }
  return str;
}

function multiplicacao(nums) {
  var m = 1;
  for(var i = 0; i<nums.length; i++) {
    var num = nums[i];
    m *= num;
  }
  return m;
}
