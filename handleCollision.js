// collision detection function 

function handleCollision() {

    // for (var i = 0; i < foodCirclesArr.length; i++) {
    for (let i = foodCirclesArr.length - 1; i >= 0; i--) {

        dx = playerCoords.x - foodCirclesArr[i].x;
        dy = playerCoords.y - foodCirclesArr[i].y;
        distance = Math.sqrt(dx * dx + dy * dy);
        
        function removeFoodItem() {
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
            console.log("foodItem Index:" + i);
        }

    }
}

