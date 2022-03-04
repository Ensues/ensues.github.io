class Room {
    dimX: number;
    dimY: number;
    tiles: string[];
    tileset: TileSet;

    constructor(dimX: number, dimY: number, dat: string[], tileset: TileSet) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.tiles = dat;
        this.tileset=tileset;
    }
}

class TileType {
    safeName: string;
    walkable: boolean;
    image: HTMLImageElement;

    constructor(name: string, walkable: boolean = true) {
        this.safeName = name;
        this.walkable = walkable;
    }
}

class TileSet {
    data: object = {};
    
    set(name: string, val: TileType) {
        this.data[name] = val;
    }
    get(name: string): TileType {
        return this[name];
    }
}

export { Room, TileSet, TileType };