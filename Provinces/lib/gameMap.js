const mapSize = 500;
var xFOV = 11;
var yFOV = 7;
var scrollAmnt = 1;
var gameMap = [];
var currentX = 250, currentY = 250;
var gameCanvas;
var board;

function gameMapPreload() {
	gameCanvas = document.getElementById("gameCanvas");
	board = gameCanvas.getContext('2d');
	board.imageSmoothingEnabled = false;
}

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
	xFOV = Math.round(scrollAmnt*defaultFovX);
	yFOV = Math.round(scrollAmnt*defaultFovY);

	validatePosition();
	redraw();
}

function validatePosition() {
	if (xFOV>mapSize/2) xFOV = mapSize/2;
	if (yFOV>mapSize/2) yFOV = mapSize/2;
	if (currentX+xFOV>=mapSize) currentX=mapSize-xFOV;
	if (currentY+yFOV>=mapSize) currentY=mapSize-yFOV;
	if (currentX-xFOV<0) currentX=mapSize+xFOV;
	if (currentY-yFOV<0) currentY=mapSize+yFOV;
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

// Draws images to all of the divSquares as needed.
function redraw() {
	const xMin = currentX-xFOV;
	const yMin = currentY-yFOV;
	const tileSizeX = gameCanvas.width / (xFOV * 2 + 1);
	const tileSizeY = gameCanvas.height / (yFOV * 2 + 1);
	board.clearRect(0,0,gameCanvas.width,gameCanvas.height);
	for (let x = 0; x <= xFOV * 2; x++) {
		for (let y = 0; y <= yFOV * 2; y++) {
			let tile = getLoc(xMin+x, yMin+y);
			board.drawImage(tile.type.display, Math.floor(x*tileSizeX), Math.floor(y*tileSizeY), Math.ceil(tileSizeX), Math.ceil(tileSizeY));
			board.drawImage(tile.building.type.display, Math.floor(x*tileSizeX), Math.floor(y*tileSizeY), Math.ceil(tileSizeX), Math.ceil(tileSizeY));
		}
	}
}