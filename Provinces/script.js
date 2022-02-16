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

function fitCanvas() {
	const container = document.getElementById("gameMap");
	gameCanvas.width = container.scrollWidth;
	gameCanvas.height = container.scrollHeight;
}