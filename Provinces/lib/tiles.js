var tileTypes = {};
var buildingTypes = {};

async function preloadTiles() {
    tileTypes.GRASS = new TileType("grass");
    tileTypes.WATER = new TileType("water");

    buildingTypes.NOTHING = new BuildingType("nothing", false);
    buildingTypes.CAMPSITE = new BuildingType("capitols/capitol1", true);
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

    constructor(img,teamOverrides) {
        this.display = {};
        this.display.default = new Image();
        this.display.default.src = "assets/buildings/"+img+".png";
        if (teamOverrides) {
            for (let t of teamNames) {
                let disp = new Image();
                disp.src = "assets/buildings/"+img+"_"+t.toLowerCase()+".png"
                this.display[t] = disp;
            }
        }
        this.name = img.charAt(0).toUpperCase()+img.slice(1)
    }

    getDisplay(override) {
        if (override!=null || this.display.hasOwnProperty(override))
            return this.display[override];
        return this.display.default;
    }
}

class Building {
    type;
    buildingTeam;

    constructor(t,tea=teams.NONE) {
        this.type = t;
        this.buildingTeam = tea;
    }

    getDisplay() {
        if (this.buildingTeam.claimed)
            return this.type.getDisplay(this.buildingTeam.name);
        return this.type.getDisplay();
    }
}

class Tile {
    type;
    building;
    owner;

    constructor(t, b=new Building(buildingTypes.NOTHING), owner=teams.NONE) {
        this.type = t;
        this.building = b;
        this.owner = owner;
    }

    setBuilding(b) {
        this.building = b;
        return this;
    }

    setTeam(t) {
        this.owner = t;
        return this;
    }

    render(x, y, sizeX, sizeY) {
        board.imageSmoothingEnabled = false;
        board.drawImage(this.type.display, Math.floor(x), Math.floor(y), Math.ceil(sizeX), Math.ceil(sizeY));
        board.fillStyle = this.owner.color;
        board.fillRect(Math.floor(x), Math.floor(y), Math.ceil(sizeX), Math.ceil(sizeY));
        board.drawImage(this.building.getDisplay(), Math.floor(x), Math.floor(y), Math.ceil(sizeX), Math.ceil(sizeY));
    }
}