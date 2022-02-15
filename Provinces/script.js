function onLoad() {
	gameMapPreload();
	preloadTiles();
	preloadTeams();
	newMap();
	loadListeners();

	setInterval(redraw, 100);
}

function onResize() {
	fitCanvas();
	redraw();
}
