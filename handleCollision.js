// collision detection function 
// create a function that will loop through all the food items and compare every single food items coordinates with playerCoords

function handleCollision() {

    // for (var i = 0; i < foodCirclesArr.length; i++) {
    for (let i = foodCirclesArr.length - 1; i >= 0; i--) {

        dx = playerCoords.x - foodCirclesArr[i].x;
        dy = playerCoords.y - foodCirclesArr[i].y;
        distance = Math.sqrt(dx * dx + dy * dy);
        // console.log("playerX:" + playerCoords.x, "playerY:" + playerCoords.y, "foodX:" + foodItemCoords.x, "foodY:" + foodItemCoords.y, "playerR:" + playerCoords.r, "foodR:" + foodItemCoords.r);
        function removeFoodItem() {

            //remove circle
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(foodCirclesArr[i].x, foodCirclesArr[i].y, foodCirclesArr[i].r + 1, 0, 2 * Math.PI, false);
            ctx.clip();
            ctx.fill();
            ctx.restore();
        }

        if (distance < (playerCoords.r + 1) + foodCirclesArr[i].r) {

            if (playerCoords.r + 1 > foodCirclesArr[i].r) {
                removeFoodItem()
                growPlayerMass();
                //remove foodItem from array 
                if (i > -1) {
                    foodCirclesArr.splice(i, 1);
                }
            }

            console.log("Collision detected!");
            // console.log("Food item X" + foodCirclesArr[i].x, "Food item Y" + foodCirclesArr[i].y);
            console.log(i);
        }

    }
}


//function to grow player's mass 
function growPlayerMass() {

    mass = 1;
    playerCoords.r += mass;
    // ctx.globalCompositeOperation = 'destination-out';
    playerCoords.draw(playerCoords.r);
}



// function removeFoodItem() {

            // clear rectangle 
            // ctx.save();
            // // ctx.globalCompositeOperation = 'destination-out';
            // ctx.rect(foodCirclesArr[i].x - foodCirclesArr[i].r, foodCirclesArr[i].y - foodCirclesArr[i].r, foodCirclesArr[i].r + foodCirclesArr[i].r, foodCirclesArr[i].r + foodCirclesArr[i].r);
            // ctx.clip();
            // ctx.clearRect(foodCirclesArr[i].x - foodCirclesArr[i].r, foodCirclesArr[i].y - foodCirclesArr[i].r, foodCirclesArr[i].r * 2, foodCirclesArr[i].r * 2);
            // ctx.restore();

        // ctx.save();
        // ctx.rect(foodCirclesArr[i].x - foodCirclesArr[i].r, foodCirclesArr[i].y - foodCirclesArr[i].r, foodCirclesArr[i].r + foodCirclesArr[i].r, foodCirclesArr[i].r + foodCirclesArr[i].r);
        // ctx.clip();
        // ctx.clearRect(foodCirclesArr[i].x - foodCirclesArr[i].r, foodCirclesArr[i].y - foodCirclesArr[i].r, foodCirclesArr[i].r * 2, foodCirclesArr[i].r * 2);
        // ctx.restore();

// }

