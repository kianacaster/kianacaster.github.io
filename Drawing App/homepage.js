var canW;
var canH;
var sub;
var test;
var cw;
var ch;
var id = "";
var idarr = [];
function setup(){
  noCanvas();
  
	canW = createInput("800");
	canH = createInput("600");

	sub = createButton("Create Canvas!");
  canW.position(window.innerWidth/2 - 200, window.innerHeight/2);
  canH.position(window.innerWidth/2 - 200, window.innerHeight/2 + 25);
  sub.position(window.innerWidth / 2, window.innerHeight / 2 + 12.5);

  sub.mousePressed(function(){
    if(parseInt(canW.value()) > 1250 || parseInt(canH.value()) > 1250){
      alert("The values you entered are too large");
    }else if(parseInt(canW.value()) < 800 || parseInt(canH.value()) < 600){
      alert("Must be atleast 800x600");
    }else if(parseInt(canW.value()) % 1 !== 0 || parseInt(canH.value()) % 1 !== 0){
      alert("The values must be integers");
    }else{
      for(var i = 0; i < 5; i++){
        var r = floor(random(0,9));
        idarr.push(r);
      }

      for(var i = 0; i < idarr.length - 1; i++){
        id += idarr[i];
      }

      cw = parseInt(canW.value());
      ch = parseInt(canH.value());
      window.location.replace("canvas.html?width=" + cw + "&height=" + ch + "&id=" + id);
    }
  });
}