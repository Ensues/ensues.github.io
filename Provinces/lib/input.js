var mouseX = -1;
var mouseY = -1;

let dragging = false;
let startDragX;
let startDragY;
let dragInitX;
let dragInitY;
let held = false;
let lastClickType;
let drawBox = false;
let boxSizeX;
let boxSizeY;
let keysHeld = [];

function loadListeners() {
		
	setInterval(keyHeldCheck, 1);

	// Update mousePos vars on mouse move.
	document.addEventListener('mousemove', e => {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});

	gameCanvas.addEventListener('wheel', e => {
		const zoomSpeed = 0.1;
		const zoomValue = Math.sign(e.deltaY) * zoomSpeed;

		const tile = hoveredTile();

		changeZoom(zoomValue,tile);
	});

	gameCanvas.addEventListener('mousedown', e => {
		if (held==true) return;
		held = true;
		startDragX = e.offsetX;
		startDragY = e.offsetY;
		dragInitX = currentX;
		dragInitY = currentY;
		lastClickType = e.button;
	});
	gameCanvas.addEventListener('mousemove', e => {
		if (held) {
			if (!dragging && (Math.abs(startDragX-e.offsetX)>8 || Math.abs(startDragY-e.offsetY)>8)) {
				dragging = true;
			}
			if (dragging) {
				switch (lastClickType) {
					case 0: lcDrag(e); break;
					case 2: rcDrag(e); break;
					default: elseDrag(e); break;
				}
			}
		}
	});
	document.addEventListener('mouseup', e => {
		if (!dragging) {
			switch (lastClickType) {
				case 0: lcClick(e); break;
				case 2: rcClick(e); break;
				default: elseClick(e); break;
			}
		} else {
			switch (lastClickType) {
				case 0: lcEndDrag(e); break;
				case 2: rcEndDrag(e); break;
				default: elseEndDrag(e); break;
			}
		}
		dragging = false;
		held = false;
		drawBox = false;
	});

	gameCanvas.addEventListener('contextmenu', e => e.preventDefault());

	document.addEventListener('keydown', e => {
		keysHeld[e.code]=true;
	});
	document.addEventListener('keyup', e => {
		keysHeld[e.code]=false;
	});
}


function lcDrag(e) {
	if (!drawBox) drawBox = true;
	boxSizeX = e.offsetX - startDragX;
	boxSizeY = e.offsetY - startDragY;
	redraw();
}
function lcEndDrag(e) {
	selectUnits({x:dragInitX,y:dragInitY},screenLocToGamePos(e.offsetX,e.offetY));
	drawBox = false;
}
let lcClick = () => clickMap();



function rcDrag(e) {
	currentX = dragInitX + (startDragX-e.offsetX)*scrollAmnt/50;
	currentY = dragInitY + (startDragY-e.offsetY)*scrollAmnt/50;
	validatePosition();
	redraw();
}
function rcEndDrag(e) {
}
function rcClick(e) {
	selectUnit(screenLocToGamePos(e.offsetX,e.offetY));
}



let elseDrag = e => rcDrag(e); 
function elseEndDrag(e) {}
function elseClick(e) {

}

function keyHeldCheck() {
	const speed = 0.25;
	moved=false; 
	if (keysHeld.KeyW || keysHeld.ArrowUp) { currentY-=speed; moved=true; }
	if (keysHeld.KeyS || keysHeld.ArrowDown) { currentY+=speed; moved=true; }
	if (keysHeld.KeyA || keysHeld.ArrowLeft) { currentX-=speed; moved=true; }
	if (keysHeld.KeyD || keysHeld.ArrowRight) { currentX+=speed; moved=true; }
	if (moved) {
		validatePosition();
		redraw();
	}
}