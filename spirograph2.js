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
		rad2 = 100,
		rad3 = 100,
		innerRad = rad1 - rad2,
		circ1 = 2 * Math.PI * rad1,
		circ2 = 2 * Math.PI * rad2,
		revs = circ1 / circ2,
		angle1 = - Math.PI / 2,
		angle2 = angle1,
		angleQT = (Math.PI / revs) / 2,
		innerAngleDiff = 0,
		controlDist = rad3 * 1.125,
		penPoints = [],
		//*************temp***************
		innerPoints = [];

		console.log(angleQT);

		

	context.fillStyle = '#fff';
	context.strokeStyle = 'tomato';
	context.moveTo(centre.x, centre.y);
	drawPoint(centre);

	createPoints(angle1, angle2);
	

	//Create penpoints and push to array
	function createPoints(_angle1, _angle2) {
		var innerP = makePoint(centre, innerRad, _angle1);
		var penP = {};
		penP.point = makePoint(innerP, rad3, _angle2);
		penP.cp1 = makePoint(penP.point, controlDist, _angle2 - Math.PI / 2);
		penP.cp2 = makePoint(penP.point, controlDist, _angle2 + Math.PI / 2);
		
		if (penPoints[0] && penPoints[0].point.x === penP.point.x && penPoints[0].point.y === penP.point.y) {
			return;
		}
		innerPoints.push(innerP);
		penPoints.push(penP);
		penPoints.length > 0 ? innerAngleDiff += Math.PI / 2 : innerAngleDiff = 0;
		createPoints(_angle1 + angleQT, _angle1 + angleQT - innerAngleDiff);	
	}
	console.log(penPoints);
	innerPoints.forEach(function(item) {
	drawPoint(item);
	});
	context.fillStyle = 'tomato';
	penPoints.forEach(function(item) {
	drawPoint2(item.point);
	});

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

	// **********************************draw the graph
	// context.moveTo(outerPoints[0].x, outerPoints[0].y);

	// for (var i = 0; i < outerPoints.length; i += 1){
	// 	var b = i + 1 >= outerPoints.length ? 0 : i + 1;
	// 	context.bezierCurveTo(outerPoints[i].c2.x, outerPoints[i].c2.y, innerPoints[i].c1.x, innerPoints[i].c1.y, innerPoints[i].x, innerPoints[i].y);
	// 	context.bezierCurveTo(innerPoints[i].c2.x, innerPoints[i].c2.y, outerPoints[b].c1.x, outerPoints[b].c1.y, outerPoints[b].x, outerPoints[b].y);
	// }
	// context.stroke();
	
	
};