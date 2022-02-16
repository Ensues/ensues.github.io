let randInt = (min,max) =>  Math.floor(Math.random()*(max-min))+min;

class View {
	x; y;
	fovX; fovY;
	defaultFovX; defaultFovY;
	zoomAmount;
	gameMap;
	minZoom=2; maxZoom=0.5;
	gameCanvas; board;

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

	
}

export { randInt, View };