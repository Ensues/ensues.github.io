
var gameMap
// {} = Dictionary [] = Array/List
// var = local to functions, let = local to braces

function load() {
	gameMap = []
	
	// A loop that runs while i is less than 500.
	for (let i = 0; i < 500; i++)
		gameMap[i] = []
	// Braces aren't required for loops/ifs with only one action. They can also be one line.
}

function inBounds(x,y) {
	if (x < 0) return false	
	if (x >= 500) return false
	if (y < 0) return false
	if (y >= 500) return false
	return true
}
// Returns end functions.

function getLoc(x,y) {
	if (!inBounds(x,y)) // Runs code if it's false
		return undefined
		
	return gameMap[x][y]
}
function setLoc(a,x,y) {
	if (!inBounds(x,y)) // Runs code if it's false
		return undefined
		
	gameMap[x][y] = a
}

// Assignment =
// Equals to but bad ==
// Equals to but good ===