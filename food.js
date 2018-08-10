
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function makeFood() {

    while (foodCirclesArr.length < 25) {

        foodItemCoords = new Ball(
            Math.floor(Math.random() * 600),
            Math.floor(Math.random() * 600),
            9,
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(-7, 7),
            random(-7, 7)
        );
        foodCirclesArr.push(foodItemCoords);
    }

    for (let i = 0; i < foodCirclesArr.length; i++) {
        foodCirclesArr[i].draw();
        // foodCirclesArr[i].update();
        // foodCirclesArr[i].collisionDetectFood();
    }
    // requestAnimationFrame(makeFood);
}













//draw multiple random same-size diff color circles  
// function drawFood() {

//     for (var i = 0; i < foodNum; i++) {
//         // ranCircleCoordinates();
//         // ranCircleColors();
//         // foodCoords.x = Math.floor(Math.random() * 500);
//         // foodCoords.y = Math.floor(Math.random() * 500);

//         foodCoords.x = random(0 + foodCoords.r,canvasWidth - foodCoords.r);
//         foodCoords.y = random(0 + foodCoords.r,canvasWidth - foodCoords.r);


//         newCircle = new FoodCircle(foodCoords.x, foodCoords.y, foodCoords.r, random(0,255), random(0,255), random(0,255));
//         // foodCirclesArr.push(newCircle);

//     }

//         // console.log(foodCirclesArr);

// }

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
// function FoodCircle(x, y, r, red, green, blue) {

//     ctx.beginPath();
//     ctx.arc(x, y, r, Math.PI * 2, 0, false);
//     ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + ",1)";
//     ctx.fill();
//     ctx.closePath();
// }


