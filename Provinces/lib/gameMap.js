const mapSize = 500;
var xFOV = 11;
var yFOV = 7;
var scrollAmnt = 1;
var gameMap = [];
var currentX = 250, currentY = 250;
var gameCanvas;
var board;

let dragging = false;
let dragLastX;
let dragLastY;

function gameMapPreload() {
	gameCanvas = document.getElementById("gameCanvas");
	board = gameCanvas.getContext('2d');
	fitCanvas();
	
	gameCanvas.addEventListener('wheel', e => {
		const zoomValue = Math.sign(e.deltaY) * 0.1;
		changeZoom(zoomValue);
	});

	gameCanvas.addEventListener('mousedown', e => {
		dragging = true;
		dragLastX = e.offsetX;
		dragLastY = e.offsetY;
	});
	gameCanvas.addEventListener('mousemove', e => {
		if (dragging) {
			currentX += (dragLastX-e.offsetX)*scrollAmnt/50;
			currentY += (dragLastY-e.offsetY)*scrollAmnt/50;
			dragLastX = e.offsetX;
			dragLastY = e.offsetY;
			validatePosition();
			redraw();
		}
	});
}

document.addEventListener('mouseup', e => {
	dragging = false;
});


function newMap() {
	gameMap = []
	
	// A loop that runs while i is less than 500.
	for (let i = 0; i < mapSize; i++)
		gameMap[i] = Array(500).fill(new Tile(tileTypes.GRASS))
	// Braces aren't required for loops/ifs with only one action. They can also be one line.

	setLoc(new Tile(tileTypes.GRASS,new Building(buildingTypes.CAMPSITE)),250,250);

	redraw();
}

function changeZoom(amnt) {
	const defaultFovX = 11, defaultFovY = 7;
	scrollAmnt+=amnt;
	if (scrollAmnt < 0.5) scrollAmnt = 0.5;
	if (scrollAmnt > 2) scrollAmnt = 2;
	xFOV = scrollAmnt*defaultFovX;
	yFOV = scrollAmnt*defaultFovY;

	validatePosition();
	redraw();
}

function validatePosition() {
	if (xFOV>mapSize/2) xFOV = mapSize/2;
	if (yFOV>mapSize/2) yFOV = mapSize/2;
	if (currentX+xFOV+1>=mapSize) currentX=mapSize-xFOV-1;
	if (currentY+yFOV+1>=mapSize) currentY=mapSize-yFOV-1;
	if (currentX-xFOV-1<0) currentX=xFOV+1;
	if (currentY-yFOV-1<0) currentY=yFOV+1;
}

function inBounds(x,y) {
	if (x < 0) return false	
	if (x >= mapSize) return false
	if (y < 0) return false
	if (y >= mapSize) return false
	return true
}
// Returns end functions.

function getLoc(x,y) {
	if (!inBounds(x,y)) // Runs code if it's false
		return undefined
		
	return gameMap[x][y];
}
function setLoc(a,x,y) {
	if (!inBounds(x,y)) // Runs code if it's false
		return undefined
		
	gameMap[x][y] = a
}

/* 
Assignment =
Equals to but bad ==
Equals to but good ===
*/

function fitCanvas() {
	const container = document.getElementById("gameMap");
	gameCanvas.width = container.scrollWidth;
	gameCanvas.height = container.scrollHeight;
}

// Draws images to all of the divSquares as needed.
function redraw() {
	const tileSizeX = gameCanvas.width / (xFOV * 2 + 1);
	const tileSizeY = gameCanvas.height / (yFOV * 2 + 1);

	const centerX = gameCanvas.width/2;
	const centerY = gameCanvas.height/2;

	const rawPosX = Math.floor(currentX);
	const rawPosY = Math.floor(currentY);
	const offsetX = currentX - rawPosX;
	const offsetY = currentY - rawPosY;
	const xMin = rawPosX-Math.floor(xFOV)-2;
	const yMin = rawPosY-Math.floor(yFOV)-2;
	const xMax = rawPosX+Math.ceil(xFOV)+2;
	const yMax = rawPosY+Math.ceil(yFOV)+2;

	board.clearRect(0,0,gameCanvas.width,gameCanvas.height);
	for (let x = xMin; x < xMax; x++) {
		for (let y = yMin; y < yMax; y++) {
			let tile = getLoc(x, y);
			if (tile!=null) {
				let posX = Math.floor((x-currentX)*tileSizeX+centerX);
				let posY = Math.floor((y-currentY)*tileSizeY+centerY);
				board.imageSmoothingEnabled = false;
				board.drawImage(tile.type.display, posX, posY, Math.ceil(tileSizeX), Math.ceil(tileSizeY));
				board.drawImage(tile.building.type.display, posX, posY, Math.ceil(tileSizeX), Math.ceil(tileSizeY));
			}
		}
	}
}