function onLoad() {
	gameMapPreload();
	preloadTiles();
	newMap();

	setInterval(redraw, 100);
}

function onResize() {
	redraw();
}

document.addEventListener('wheel', e => {
	const zoomValue = Math.sign(e.deltaY) * 0.1;
	changeZoom(zoomValue);
});
