var tileTypes = {};
var buildingTypes = {};

async function preloadTiles() {
    tileTypes.GRASS = new TileType("assets/tiles/grass.png");
    tileTypes.WATER = new TileType("assets/tiles/water.png");

    buildingTypes.NOTHING = new BuildingType("assets/buildings/nothing.png");
}

class TileType {
    display;

    constructor(img) {
        this.display = new Image();
        this.display.src = img;
    }
}

class BuildingType {
    display;

    constructor(img) {
        this.display = new Image();
        this.display.src = img;
    }
}

class Building {
    type;

    constructor(t) {
        this.type = t;
    }
}

class Tile {
    type;
    building;

    constructor(t, b=new Building(buildingTypes.NOTHING)) {
        this.type = t;
        this.building = b;
    }
}