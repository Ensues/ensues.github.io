function onLoad() {
	gameMapPreload();
	preloadTiles();
	preloadTeams();
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

function randInt(min,max) {
	return Math.floor(Math.random()*(max-min))+min;
}