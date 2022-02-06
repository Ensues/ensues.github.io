function onLoad() {
	gameMapPreload();
	preloadTiles();
	newMap();

	setInterval(redraw, 100);
}

function onResize() {
	fitCanvas();
	redraw();
}

var mouseX = -1;
var mouseY = -1;
document.addEventListener('mousemove', e => {
	mouseX = e.pageX;
	mouseY = e.pageY;
});