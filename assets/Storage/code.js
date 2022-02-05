function attemptCreateRoom() {
    roomCode = "";
    for (let i = 0; i < 8; i++) {
        roomCode += String.fromCharCode(getRandomInt(65,90));
    }
    console.log("Attempted to create room with code " + roomCode);
}

function attemptJoinRoom() {
    roomCode = document.getElementById("rcode").value;
    roomCode = roomCode.toUpperCase();
    console.log("Attempted to join room with code " + roomCode);
}


function validCode(code) {
    return true;
}

getRandomInt = (min,max) => Math.floor(Math.random() * (max-min+1))+min;
