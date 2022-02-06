var tileTypes = {};
var buildingTypes = {};

async function preloadTiles() {
    tileTypes.GRASS = new TileType("grass");
    tileTypes.WATER = new TileType("water");

    buildingTypes.NOTHING = new BuildingType("nothing");
    buildingTypes.CAMPSITE = new BuildingType("capital1");
}

class TileType {
    display;
    name;

    constructor(img) {
        this.display = new Image();
        this.display.src = "assets/tiles/"+img+".png";
        this.name = img.charAt(0).toUpperCase()+img.slice(1)
    }
}

class BuildingType {
    display;
    name;

    constructor(img) {
        this.display = new Image();
        this.display.src = "assets/buildings/"+img+".png";
        this.name = img.charAt(0).toUpperCase()+img.slice(1)
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

    render(x, y, sizeX, sizeY) {
        board.imageSmoothingEnabled = false;
        board.drawImage(this.type.display, Math.floor(x), Math.floor(y), Math.ceil(sizeX), Math.ceil(sizeY));
        board.drawImage(this.building.type.display, Math.floor(x), Math.floor(y), Math.ceil(sizeX), Math.ceil(sizeY));
    }
}