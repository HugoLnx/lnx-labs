var canvas;
var firstClick;

function init(){
	canvas = new Canvas('pingos');
  firstClick = true;
}

function onCanvasClick(e){
  if (firstClick) {
	  setInterval(atualizar,10);
    firstClick = false;
  }
	canvas.pingar(e.pageX,e.pageY);
}

function atualizar(){
	canvas.atualizar();
}
