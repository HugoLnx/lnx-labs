(function() {
  window.onload = function(){
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");

    var painter = new GhostPainter(context);

    var x = 20;
    var y = 20;
    var t = 0;

    setInterval(function(){
      var alpha = Math.sin(t/15);
      context.clearRect(0,0,640,480);
      painter.drawGhostIn(x+100+Math.cos(t/100)*-100,y+Math.sin(t/5)*10,alpha);
      t++;
    },30);
  }

  function GhostPainter(context) {
    var _ctx = context;

    this.drawGhostIn = function(x,y,alpha){
      drawBodyIn(x,y,alpha);
      drawEyesIn(x+10,y+15,alpha);
    }

    function drawBodyIn(x,y,alpha){
      _ctx.beginPath();
      _ctx.moveTo(x,y+60);
      _ctx.lineTo(x,y+20);
      _ctx.arc(x+20,y+20,20,Math.PI,Math.PI*2,false);
      _ctx.lineTo(x+40,y+60);
      _ctx.lineTo(x+30,y+50);
      _ctx.lineTo(x+24,y+58);
      _ctx.lineTo(x+20,y+50);
      _ctx.lineTo(x+16,y+58);
      _ctx.lineTo(x+10,y+50);
      _ctx.lineTo(x,y+60);
      _ctx.closePath();

      _ctx.lineWidth = 3;
      _ctx.fillStyle = "rgba(175,255,255,"+alpha+")";
      _ctx.stroke();
      _ctx.fill();
    }

    function drawEyesIn(x,y,alpha) {
      _ctx.beginPath();
      _ctx.arc(x,y,6,0,Math.PI*2,false);
      _ctx.moveTo(x+26,y);
      _ctx.arc(x+20,y,6,0,Math.PI*2,false);
      _ctx.closePath();

      _ctx.lineWidth = 1;
      _ctx.fillStyle = "rgb(255,255,255)";
      _ctx.stroke();
      _ctx.fill();

      _ctx.beginPath();
      _ctx.arc(x+3,y+1,3,0,Math.PI*2,false);
      _ctx.moveTo(x+26,y+1);
      _ctx.arc(x+23,y+1,3,0,Math.PI*2,false);
      _ctx.closePath();

      _ctx.fillStyle = "rgba(0,0,0,"+alpha+")";
      _ctx.stroke();
      _ctx.fill();
    }
  }
}());
