import { GameMap, View } from "./lib/gameMap.mjs";

let gameMap;
let myView;

window.addEventListener("load", () => {
	gameMap = new GameMap();
	myView = new View(gameMap, document.getElementById("gameCanvas"));

	setInterval(renderLoop, 1000);
});

document.addEventListener("resize", e => {

});

function renderLoop() {
	myView.render();
}

function fitCanvas() {
	const container = document.getElementById("gameMap");
	gameCanvas.width = container.scrollWidth;
	gameCanvas.height = container.scrollHeight;
}