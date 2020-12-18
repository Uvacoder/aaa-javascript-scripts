var quadrant = function (x, y){
    var quadrant = 4;

    if(x > 0 && y > 0){
		quadrant = 1;
	}else if(x < 0 && y > 0){
		quadrant = 2;
	}else if(x < 0 && y < 0){
		quadrant = 3;
	}

    return quadrant;
} 
console.log(quadrant(-5, 2));
console.log(quadrant(5, 2));
console.log(quadrant(-5, -2));
