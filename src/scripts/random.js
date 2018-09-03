
//randomize function 
export function random(min = 0, max = 255) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

