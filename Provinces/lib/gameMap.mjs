import { View } from "./helpers.mjs";

fitCanvas();

class GameMap {
	mapSize;
	gameMap;
	view;

	/**
	 * Constructs a new GameMap.
	 *
	 * @param {number} ms - The size of the GameMap.
	 * @param {HTMLCanvasElement} d - The CanvasElement that this GameMap's View will draw to.
	 */
	constructor(ms,d) {
		this.mapSize = ms;
		this.view = new View(this,d,ms/2,ms/2,11,7);
		newMap();
	}

	/**
	 * Initializes the map.
	 */
	newMap() {
		this.gameMap = []

		for (let x = 0; x < this.mapSize; x++) {
			this.gameMap[x] = [];
			for (let y = 0; y < this.mapSize; y++) this.gameMap[x][y] = new Tile(tileTypes.GRASS);
		}
	
		let startX = randInt(230,270);
		let startY = randInt(230,270);
		currentX = startX + 0.5;
		currentY = startY + 0.5;
		createSpawn(startX,startY,teams.PLAYER);
		createSpawn(randInt(30,mapSize-30),randInt(mapSize-30,mapSize-10),teams.PIRATES,3);
		createSpawn(randInt(mapSize-30,mapSize-10),randInt(30,mapSize-30),teams.NOMADS);
		createSpawn(randInt(10,30),randInt(30,mapSize-30),teams.ESKIMOS,5);
		createSpawn(randInt(30,mapSize-30),randInt(10,30),teams.PYGMIES,8);
	
		redraw();

		
		function createSpawn(startX,startY,team,initialClaimSize=2) {
			getLoc(startX,startY).setBuilding(new Building(buildingTypes.CAMPSITE, team));
			for (let x = startX-initialClaimSize; x<=startX+initialClaimSize; x++) 
				for (let y = startY-initialClaimSize; y<=startY+initialClaimSize; y++) 
					getLoc(x,y).setTeam(team);
		}
	}

	/**
	 * Checks if a position is a valid tile position.
	 *
	 * @param {number} x - X position.
	 * @param {number} y - Y position.
	 * 
	 * @return {boolean} Whether the position is in bounds or not.
	 */
	inBounds(x,y) {
		return (x >= 0) && (x < this.mapSize) && (y >= 0) && (y < this.mapSize)
	}

	/**
	 * Returns the tile at the position.
	 *
	 * @param {number} x - X position of tile.
	 * @param {number} y - Y position of tile.
	 * 
	 * @return {Tile} The tile at the position, undefined if out of bounds.
	 */
	getLoc(x,y) {
		return gameMap[x][y];
	}

}

// Draws images to all of the divSquares as needed.
let tileSizeX;
let tileSizeY;
function redraw() {
	tileSizeX = gameCanvas.width / (xFOV * 2 + 1);
	tileSizeY = gameCanvas.height / (yFOV * 2 + 1);

	const centerX = gameCanvas.width/2;
	const centerY = gameCanvas.height/2;

	const rawPosX = Math.floor(currentX);
	const rawPosY = Math.floor(currentY);
	const xMin = rawPosX-Math.floor(xFOV)-2;
	const yMin = rawPosY-Math.floor(yFOV)-2;
	const xMax = rawPosX+Math.ceil(xFOV)+2;
	const yMax = rawPosY+Math.ceil(yFOV)+2;

	board.clearRect(0,0,gameCanvas.width,gameCanvas.height);
	
	let selTileInfo = null;
	for (let x = xMin; x < xMax; x++) {
		for (let y = yMin; y < yMax; y++) {
			let tile = getLoc(x, y);
			if (tile!=null) {
				let posX = (x-currentX)*tileSizeX+centerX;
				let posY = (y-currentY)*tileSizeY+centerY;
				tile.render(posX,posY,tileSizeX,tileSizeY);
				if (selectedTile != null && (x == selectedTile.x && y == selectedTile.y)) {
					selTileInfo = {x:posX,y:posY,tileX:x,tileY:y};
				}
			}
		}
	}
	if (selTileInfo != null) {
		board.lineWidth = (tileSizeX+tileSizeY)/30;
		board.strokeStyle = getLoc(selTileInfo.tileX,selTileInfo.tileY).owner.highlightColor;
		board.strokeRect(selTileInfo.x,selTileInfo.y,tileSizeX,tileSizeY);
	}
	if (drawBox) {
		board.lineWidth = 5;
		board.strokeStyle = "#FFFFFF";
		board.strokeRect(startDragX,startDragY,boxSizeX,boxSizeY);
	}
}


let selectedTile = null;
function clickMap() {
	if (!dragging) {
		const clickedTile = hoveredTile();
		if (selectedTile != null && (clickedTile.x == selectedTile.x && clickedTile.y == selectedTile.y))
			selectedTile = null;
		else
			selectedTile = clickedTile;
		redraw();
	}
}

function selectUnits(pos1,pos2) {

}