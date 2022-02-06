function onLoad() {
	gameMapPreload();
	preloadTiles();
	newMap();

	setInterval(redraw, 100);
}

function onResize() {
	redraw();
}
