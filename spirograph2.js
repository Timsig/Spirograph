window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		centre = {
			x: width / 2,
			y: height / 2
		},

		rad1 = 300,
		rad2 = 105,
		rad3 = 105, //Assume penpoint is on circumference of smaller circle
		innerRad = rad1 - rad2, //Radius of inner circle (described by centrepoint of small wheel)
		revs = rad1 / rad2, //Number of times path touches outer radius
		angle1 = - Math.PI / 2,
		angle2 = angle1,
		angleToPoint = (Math.PI / revs), //Angle to next point and outer handle angle
		innerAngleDiff = 0,
		controlDist = rad3 * 1.125, //Distance of control point from handle
		penPoints = [],
		
		//*************temp***************
		innerPoints = [];

		

		

	context.fillStyle = '#fff';
	context.strokeStyle = 'tomato';
	context.moveTo(centre.x, centre.y);
	drawPoint(centre);

	createPoints(angle1, angleToPoint);
	

	//Create penpoints and push to array
	function createPoints(_angle1, _angle2) {
		var outerPoint = makePoint(centre, rad1, _angle1);
		var penP = {};
		penP.point = outerPoint;
		penP.cp1 = makePoint(penP.point, controlDist, _angle1 - Math.PI); //+ angleToPoint / revs);
		penP.cp2 = makePoint(penP.point, controlDist, _angle1 - Math.PI); // - angleToPoint / revs);
		
		if (penPoints[0] && penPoints[0].point.x === penP.point.x && penPoints[0].point.y === penP.point.y) {
			return;
		}
		penPoints.push(penP);
		var innerPoint = makePoint(centre, rad1 - rad2 * 2, _angle1 + _angle2);
		var penP2 = {};
		penP2.point = innerPoint;
		penP2.cp1 = makePoint(penP2.point, controlDist / revs, _angle1 + _angle2 - Math.PI / 2);
		penP2.cp2 = makePoint(penP2.point, controlDist / revs, _angle1 + _angle2 + Math.PI / 2);
		penPoints.push(penP2);
		createPoints(_angle1 + _angle2 * 2, _angle2);

	}
	context.strokeStyle = 'tomato';
	drawCircle(centre, rad1);

	console.log(penPoints);
	penPoints.forEach(function(item) {
	drawPoint(item.point);
	drawPoint2(item.cp1);
	drawPoint2(item.cp2);
	});


	// context.fillStyle = 'tomato';
	// penPoints.forEach(function(item) {
	// drawPoint2(item.point);
	// });

// Draw the path
	context.moveTo(penPoints[0].point.x, penPoints[0].point.y);
	for (var i = 0; i < penPoints.length; i += 1) {
		var b = i + 1 === penPoints.length ? 0 : i + 1;
		context.bezierCurveTo(penPoints[i].cp2.x, penPoints[i].cp2.y, penPoints[b].cp1.x, penPoints[b].cp1.y, penPoints[b].point.x, penPoints[b].point.y);
		context.stroke();
	};
	


	// Helper function to generate points, given origin, radius and angle
	function makePoint(origin, radius, angle) {
		var point = {
			x: Math.round(origin.x + Math.cos(angle) * radius),
			y: Math.round(origin.y + Math.sin(angle) * radius) 
		}
		return point;
	}

	// Temp functions to show location of points and bezier handles
	function drawPoint (p) {
		context.beginPath();
		context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
		context.fill();
	}

	function drawPoint2 (p) {
		context.beginPath();
		context.arc(p.x, p.y, 1, 0, Math.PI * 2, false);
		context.fill();
		
	}

	function drawCircle (p, rad) {
		context.beginPath();
		context.arc(p.x, p.y, rad, 0, Math.PI * 2, false);
		context.stroke();
		
	}
	
};