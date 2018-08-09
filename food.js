
// foodCircles = {

// }

//draw multiple random same-size diff color circles  
function drawFood() {

    for (var i = 0; i < foodNum; i++) {
        // ranCircleCoordinates();
        // ranCircleColors();
        foodCoords.x = Math.floor(Math.random() * 500);
        foodCoords.y = Math.floor(Math.random() * 500);
    
        newCircle = new FoodCircle(foodCoords.x, foodCoords.y, foodCoords.r, Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
        foodCirclesArr.push(newCircle);
    }
    // return foodCirclesArr;
    console.log(foodCirclesArr);

}

// //randomize circles coordinates 
// function ranCircleCoordinates() {
//     x = Math.floor(Math.random() * 500);
//     y = Math.floor(Math.random() * 500);
//     radius = 9;
// }

//randomize circles color
// function ranCircleColors() {
//     red = Math.floor(Math.random() * 255);
//     green = Math.floor(Math.random() * 255);
//     blue = Math.floor(Math.random() * 255);
// }

//create food circle 
function FoodCircle(x, y, r, red, green, blue) {

    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 2, 0, false);
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + ",1)";
    ctx.fill();
    ctx.closePath();

}


