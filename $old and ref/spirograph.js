window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		centre = {
			x: width / 2,
			y: height / 2
		},

		rad1 = 200,
		rad2 = 200,
		innerRad = rad1 - rad2,
		revs = 5,

		startPoint = {
			x: centre.x - rad1,
			y: centre.y
		},
		outerPoints = [],
		innerPoints = [],

		angleInt = Math.PI * 2 / revs,
		innerOffset = Math.PI / revs,
		outerControlDist = rad1 * 1.125 * 4 / revs,
		// innerControlDist = rad2 * 1.125;
		innerControlDist = rad2 * 1.125 * 4 / revs;

	context.fillStyle = '#ccc';
	context.strokeStyle = 'tomato';
	context.moveTo(centre.x, centre.y);
	drawPoint(centre.x, centre.y);
	
	// Make outer points
	for (var i = revs; i > 0; i -= 1) {
		var _angle = Math.PI * 2 / revs * i;
		var outerP = makePoint(centre, rad1, _angle);
		outerP.angle = _angle;
		outerPoints.push(outerP);	
	}

	// Make outer control handles
	outerPoints.forEach(function(p){
		p.c1 =  makePoint(p, outerControlDist, p.angle + Math.PI / 2);
		p.c2 =  makePoint(p, outerControlDist, p.angle + Math.PI * 1.5);
	});
	
	// Make inner points
	for (var i = revs; i > 0; i -= 1) {
		var __angle = (Math.PI * 2 / revs * i) - innerOffset
		var innerP = makePoint(centre, innerRad, __angle);
		innerP.angle = __angle;
		innerPoints.push(innerP);	
	}

	innerPoints.forEach(function(p){
		p.c1 = makePoint(p, innerControlDist, p.angle + Math.PI * 1.5); 
		p.c2 = makePoint(p, innerControlDist, p.angle + Math.PI / 2);
	});

	// Helper function to generate points, given origin, radius and angle
	function makePoint(origin, radius, angle) {
		var point = {
			x: origin.x + Math.cos(angle) * radius,
			y: origin.y + Math.sin(angle) * radius 
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
	context.moveTo(outerPoints[0].x, outerPoints[0].y);

	for (var i = 0; i < outerPoints.length; i += 1){
		var b = i + 1 >= outerPoints.length ? 0 : i + 1;
		context.bezierCurveTo(outerPoints[i].c2.x, outerPoints[i].c2.y, innerPoints[i].c1.x, innerPoints[i].c1.y, innerPoints[i].x, innerPoints[i].y);
		context.bezierCurveTo(innerPoints[i].c2.x, innerPoints[i].c2.y, outerPoints[b].c1.x, outerPoints[b].c1.y, outerPoints[b].x, outerPoints[b].y);
	}
	context.stroke();
	
	
};