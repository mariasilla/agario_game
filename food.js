
// foodCircles = {

// }

//draw multiple random same-size diff color circles  
function drawFood () {
    // ctx.clearRect(0,0,600,600);
    circlesNum = 20;
    for (var i=0; i<circlesNum; i++) {            
        ranCircleCoordinates ();
        ranCircleColors ();
        createCircles();
    }  
   
}

//randomize circles coordinates 
function ranCircleCoordinates () {  
    x = Math.floor(Math.random()*500);
    y = Math.floor(Math.random()*500);
    radius = 9;
}

//randomize circles color
function ranCircleColors () {
    r = Math.floor(Math.random()*255);
    g = Math.floor(Math.random()*255);
    b = Math.floor(Math.random()*255);
}

//create circles 
function createCircles () {
    ctx.beginPath();
    ctx.arc(x,y,radius,Math.PI*2,0,false);
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
    ctx.fill();
    ctx.closePath();
}

