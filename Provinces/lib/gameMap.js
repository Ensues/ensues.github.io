const mapSize = 500;
const xFOV = 11;
const yFOV = 7;
var gameMap = [];
var tileTypes = {};
var currentX = 250, currentY = 250;

tileTypes[null] = {display: "assets/none.png"};
tileTypes[undefined] = tileTypes[null];
tileTypes["grass"] = {display: "assets/tiles/grass.png"};


function newMap() {
	gameMap = []
	
	// A loop that runs while i is less than 500.
	for (let i = 0; i < mapSize; i++)
		gameMap[i] = Array(500).fill("grass")
	// Braces aren't required for loops/ifs with only one action. They can also be one line.

	resetGrid();
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
		
	return tileTypes[gameMap[x][y]];
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


// Initialize all of the div squares for the gameMap 
function resetGrid() {
	const htmlGameMap = document.getElementById("gameMap");
	const htmlPosX = htmlGameMap.getBoundingClientRect().left + 3;	// 3px border
	const htmlPosY = htmlGameMap.getBoundingClientRect().top + 3;	// 3px border
	const tileWidth = htmlGameMap.scrollWidth / (xFOV*2+1);
	const tileHeight = htmlGameMap.scrollHeight / (yFOV*2+1);
	for (let x = 0; x <= xFOV * 2; x++) {
		for (let y = 0; y <= yFOV * 2; y++) {
			let remove = document.getElementById(x + " " + y);
			if (remove!=null) remove.remove();
			let element = document.createElement("div");
			element.id = x + " " + y;
			element.setAttribute("style", `position:fixed; width:${tileWidth}px; height:${tileHeight}px; left:${htmlPosX + x*tileWidth}px; top:${htmlPosY + y*tileHeight}px;`);
			let img = document.createElement("img");
			img.src = tileTypes[null].display;
			img.setAttribute("style", `width:${tileWidth}px; height:${tileHeight}px;`);
			img.classList.add("tile");
			element.appendChild(img);
			htmlGameMap.appendChild(element);
		}
	}

	redraw();
}

// Draws images to all of the divSquares as needed.
function redraw() {
	const xMin = currentX-xFOV;
	const yMin = currentY-yFOV;
	for (let x = 0; x <= xFOV * 2; x++) {
		for (let y = 0; y <= yFOV * 2; y++) {
			let element = document.getElementById(`${x} ${y}`).children[0];
			let tile = getLoc(xMin+x, yMin+y).display;
			element.src = tile;
		}
	}
}