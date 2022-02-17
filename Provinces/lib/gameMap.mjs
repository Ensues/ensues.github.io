import { randInt } from "./helpers.mjs";
import { teams } from "./teams.mjs";
import { Building, Tile, tileTypes, buildingTypes } from "./tiles.mjs";

class GameMap {
	mapSize;
	gameMap;

	/**
	 * Constructs a new GameMap.
	 *
	 * @param {number} ms - The size of the GameMap.
	 * @param {HTMLCanvasElement} d - The CanvasElement that this GameMap's View will draw to.
	 */
	constructor(ms = 500) {
		this.newMap(ms);
	}

	/**
	 * Initializes the map.
	 */
	newMap(ms) {
		this.mapSize = ms;
		this.gameMap = []

		for (let x = 0; x < this.mapSize; x++) {
			this.gameMap[x] = [];
			for (let y = 0; y < this.mapSize; y++) this.gameMap[x][y] = new Tile(tileTypes.GRASS);
		}

		let startX = randInt(this.mapSize/2 - 20,this.mapSize/2 + 20);
		let startY = randInt(this.mapSize/2 - 20,this.mapSize/2 + 20);
		this.x = startX + 0.5;
		this.y = startY + 0.5;
		this.createSpawn(startX,startY,teams.PLAYER);
		this.createSpawn(randInt(30,this.mapSize-30),randInt(this.mapSize-30,this.mapSize-10),teams.PIRATES,3);
		this.createSpawn(randInt(this.mapSize-30,this.mapSize-10),randInt(30,this.mapSize-30),teams.NOMADS);
		this.createSpawn(randInt(10,30),randInt(30,this.mapSize-30),teams.ESKIMOS,5);
		this.createSpawn(randInt(30,this.mapSize-30),randInt(10,30),teams.PYGMIES,8);
	
		
	}

	/**
	 * For internal use only.
	 */
	createSpawn(startX,startY,team,initialClaimSize=2) {
		this.getLoc(startX,startY).setBuilding(new Building(buildingTypes.CAMPSITE, team));
		for (let x = startX-initialClaimSize; x<=startX+initialClaimSize; x++) 
			for (let y = startY-initialClaimSize; y<=startY+initialClaimSize; y++) 
				this.getLoc(x,y).setTeam(team);
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
		if (!this.inBounds(x,y)) return undefined;
		return this.gameMap[x][y];
	}

}

class View {
	x; y;
	fovX; fovY;
	defaultFovX; defaultFovY;
	zoomAmount;
	gameMap;
	minZoom=2; maxZoom=0.5;
	gameCanvas; board;
	selection;

	/**
	 * Constructs a new View for a specified GameMap.
	 *
	 * @param {GameMap} gm - The GameMap the View will be registered to.
	 * @param {HTMLCanvasElement} c - The CanvasElement that this view will draw to.
	 * @param {number} x - The initial X position of the View.
	 * @param {number} y - The initial Y position of the View.
	 * @param {number} fovX - The default FOV width.
	 * @param {number} fovY - The default FOV height.
	 */
	constructor(gm, c, x = 0, y = 0, fovX = 10, fovY = 10) {
		this.gameCanvas = c;
		this.board = gameCanvas.getContext('2d');

		this.selection = new Selection();

		this.gameMap = gm;
		this.x=x;
		this.y=y;
		this.fovX=fovX;
		this.fovY=fovY;
		this.defaultFovX=fovX;
		this.defaultFovY=fovY;
		this.zoomAmount = 1;

	}

	/**
	 * Corrects the position of the View to be in-bounds.
	 */
	validate() {
		let mapSize = gameMap.mapSize;
		if (this.fovX>mapSize/2) this.fovX = sizeX/2;
		if (this.fovY>mapSize/2) this.fovY = sizeY/2;
		if (this.x+this.fovX>mapSize) this.x=mapSize-this.fovX-1;
		if (this.y+this.fovY>mapSize) this.y=mapSize-this.fovY-1;
		if (this.x-this.fovX<0) this.x=this.fovX+1;
		if (this.y-this.fovY<0) this.y=this.fovY+1;
	}

	/**
	 * Changes the zoom level of the View.
	 *
	 * @param {number} amnt - The amount to zoom out by. (Negative to zoom in)
	 */
	changeZoom(amnt) {
		this.zoomAmount+=amnt;

		if (this.zoomAmount < this.maxZoom) this.zoomAmount = this.maxZoom;
		if (this.zoomAmount > this.minZoom) this.zoomAmount = this.minZoom;
	
		this.fovX = this.zoomAmount*this.defaultFovX;
		this.fovY = this.zoomAmount*this.defaultFovY;
	
		this.validate();
	}

	render() {
		const tileSizeX = this.gameCanvas.width / (this.fovX * 2 + 1);
		const tileSizeY = this.gameCanvas.height / (this.fovY * 2 + 1);
	
		const xMin = Math.floor(this.x) - Math.floor(this.fovX)-2;
		const yMin = Math.floor(this.y) - Math.floor(this.fovY)-2;
		const xMax = Math.floor(this.x) + Math.ceil(this.fovX)+2;
		const yMax = Math.floor(this.y) + Math.ceil(this.fovY)+2;
	
		this.board.clearRect(0,0,this.gameCanvas.width,this.gameCanvas.height);
		
		let selTileInfo = null;
		for (let x = xMin; x < xMax; x++) {
			for (let y = yMin; y < yMax; y++) {
				let tile = this.gameMap.getLoc(x, y);
				if (tile!=null) {
					let pos = this.locToScreen(x,y);
					tile.render(this.board, pos.x, pos.y, tileSizeX,tileSizeY);
					/*if (selectedTile != null && (x == selectedTile.x && y == selectedTile.y)) {
						selTileInfo = {x:posX,y:posY,tileX:x,tileY:y};
					}*/
				}
			}
		}
		if (selTileInfo != null) {
			this.board.lineWidth = (tileSizeX+tileSizeY)/30;
			this.board.strokeStyle = getLoc(selTileInfo.tileX,selTileInfo.tileY).owner.highlightColor;
			this.board.strokeRect(selTileInfo.x,selTileInfo.y,tileSizeX,tileSizeY);
		}
	}


	/**
	 * Changes the game coordinate of a screen position.
	 *
	 * @param {number} x - The screen x position
	 * @param {number} y - The screen y position
	 * 
	 * @return {Object} {x: game x pos, y: game y pos}
	 */
	screenToLoc(x,y) {
		const tileSizeX = this.gameCanvas.width / (this.fovX * 2 + 1);
		const tileSizeY = this.gameCanvas.height / (this.fovY * 2 + 1);
		const box = this.gameCanvas.getBoundingClientRect();
		const relX = x - box.left;
		const relY = y - box.top;
		if (relX<0 || relY<0 || relX>gameCanvas.scrollWidth || relY>gameCanvas.scrollHeight) return null;
		const centerX = this.gameCanvas.width/2;
		const centerY = this.gameCanvas.height/2;
		return {x: ((relX-centerX)/tileSizeX)+this.x, y: ((relY-centerY)/tileSizeY)+this.y}
	}

	/**
	 * Shows the screen position of a game coordinate.
	 *
	 * @param {number} x - The game x position
	 * @param {number} y - The game y position
	 * 
	 * @return {Object} {x: screen x pos, y: screen y pos}
	 */
	locToScreen(x,y) {
		const tileSizeX = this.gameCanvas.width / (this.fovX * 2 + 1);
		const tileSizeY = this.gameCanvas.height / (this.fovY * 2 + 1);
		const centerX = this.gameCanvas.width/2;
		const centerY = this.gameCanvas.height/2;
		return {x:(x-this.x)*tileSizeX+centerX, y:(y-this.y)*tileSizeY+centerY}
	}
}

class Selection {
	selectedTile;
	selectedUnits;

	constructor() {
		this.deselectAll();
	}

	deselectAll() {
		this.selectedTile = null;
		this.selectedUnits = [];
	}
}

export { GameMap, View, Selection };


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