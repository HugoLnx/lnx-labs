function Pingo(x,y){
	var x = x;
	var y = y;
	var raio = 0;
	var cor = randomizar_cor();
	
	setInterval(crescer,10);
	
	function randomizar_cor(){
		var cor = '#'
		var qnt_f = 0;
		var qnt_zero = 0;
		for (var i=0;i<3;i+=1){
			if ((qnt_f != 2 && Math.floor(Math.random()*10) % 2 == 0) || qnt_zero == 2){
				cor += 'ff';
				qnt_f += 1;
			} else {
				cor += '00';
				qnt_zero += 1;
			}
		}
		return cor;
	}
	
	this.se_desenhar_no = function(context){
		context.strokeStyle = cor;
		context.beginPath();
		context.arc(x,y,raio,0,Math.PI*2,true);
		context.stroke();
		context.closePath();
	}
	
	function crescer(){
		raio += 5;
	}
}