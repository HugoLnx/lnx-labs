function Canvas(id){
	var pingos = [];
	var elem = document.getElementById(id);
	elem.onclick = onCanvasClick;
	var context = elem.getContext('2d');
	context.lineWidth = 4;

  function desenharTextoInformativo(){
		context.beginPath();context.closePath();
    context.save();
    context.font = '30px arial';
    context.fillStyle = "rgba(255,255,255,0.1)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    var text = "< Click Here >";
    context.fillText(text,(elem.width/2),(elem.height/2));
    context.fill();
    context.restore();
  }
  desenharTextoInformativo();
	
	this.pingar = function(x,y){
		pingos.push(new Pingo(x-elem.offsetLeft,y-elem.offsetTop,this));
	}
	
	this.atualizar = function(){
		context.clearRect(0,0,elem.width,elem.height);
		for (var i=0;i < pingos.length;i+=1){
			pingo = pingos[i];
			pingo.se_desenhar_no(context);
		}
	}
}
