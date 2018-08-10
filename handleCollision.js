// collision detection function 
// create a function that will loop through all the food items and compare every single food items coordinates with playerCoords

function handleCollision() {

    for (var i = 0; i < foodCirclesArr.length; i++) {

        dx = playerCoords.x - foodCirclesArr[i].x;
        dy = playerCoords.y - foodCirclesArr[i].y;
        distance = Math.sqrt(dx * dx + dy * dy);
        // console.log("playerX:" + playerCoords.x, "playerY:" + playerCoords.y, "foodX:" + foodItemCoords.x, "foodY:" + foodItemCoords.y, "playerR:" + playerCoords.r, "foodR:" + foodItemCoords.r);

        if (distance < playerCoords.r + foodCirclesArr[i].r) {


            if (playerCoords.r > foodCirclesArr[i].r) {
                growPlayerMass();
            }
            console.log("Collision detected!");
            // console.log(foodCirclesArr[i].x, foodCirclesArr[i].y);

            // removeFoodItem();

        }
    }
}


//function to grow player's mass 
function growPlayerMass() {

    mass = 1;
    playerCoords.r += mass;
    playerCoords.draw(playerCoords.r);
}

// function removeFoodItem() {

//     for (var i = 0; i < foodCirclesArr.length; i++) {

//           if (playerCoords.r > foodCirclesArr[i].r) {
//                 console.log(foodCirclesArr[i].x, foodCirclesArr[i].y);

//                 // ctx.save();
//                 // ctx.rect(foodItemCoords.x - foodItemCoords.r, foodItemCoords.y - foodItemCoords.r, foodItemCoords.r + foodItemCoords.r, foodItemCoords.r + foodItemCoords.r);
//                 // ctx.clip();
//                 // ctx.clearRect(foodItemCoords.x - foodItemCoords.r, foodItemCoords.y - foodItemCoords.r, foodItemCoords.r * 2, foodItemCoords.r * 2);
//                 // ctx.restore();
//                 ctx.save();
//                 ctx.rect(foodCirclesArr[i].x - foodCirclesArr[i].r, foodCirclesArr[i].y - foodCirclesArr[i].r, foodCirclesArr[i].r + foodCirclesArr[i].r, foodCirclesArr[i].r + foodCirclesArr[i].r);
//                 ctx.clip();
//                 ctx.clearRect(foodCirclesArr[i].x - foodCirclesArr[i].r, foodCirclesArr[i].y - foodCirclesArr[i].r, foodCirclesArr[i].r * 2, foodCirclesArr[i].r * 2);
//                 ctx.restore();
//           }

//     }
// }