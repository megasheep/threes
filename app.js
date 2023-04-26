const canvas = document.createElement( 'canvas' ),
	  ctx = canvas.getContext( '2d' );
	  canvas.width = 600;
	  canvas.height = 600;
	  document.body.appendChild( canvas );

let angle = 28,
	posAngle = -1,
	size = 7;

canvas.onmousemove = function() {

	let posX = event.clientX - canvas.offsetLeft,
		posY = event.clientY - canvas.offsetTop,
		posXcenter = posX > canvas.width/2 ? posX - canvas.width/2 : canvas.width/2 - posX,
		posYcenter = posY > canvas.height/2 ? posY - canvas.height/2 : canvas.height/2 - posY;

	size = Math.floor(posXcenter * 7 / canvas.width) * 2 + 2;
	posAngle = Math.floor(posYcenter * 180 / canvas.height) * 2;
};

canvas.onmouseout = function() {
	posAngle = -1;
	size = 7;
};

function drawTree(x1, y1, a, s){
	if (s !== 0){
		var x2 = x1 + (Math.cos(a * Math.PI / 180) * s * 10);
		var y2 = y1 + (Math.sin(a * Math.PI / 180) * s * 10);
		ctx.moveTo(x1, y1);
  		ctx.lineTo(x2, y2);
		drawTree(x2, y2, a - angle, s - 1);
		drawTree(x2, y2, a + angle, s - 1);
	}
}

(function run() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, 600, 600);

	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	drawTree(300, 300, 0, size);
	drawTree(300, 300, 90, size);
	drawTree(300, 300, 180, size);
	drawTree(300, 300, 270, size);
	ctx.closePath();
	ctx.stroke();

	posAngle >= 0 ? (angle = posAngle) : (angle < 360 ? angle += 1 : angle = 0);

	requestAnimationFrame(run);
})();