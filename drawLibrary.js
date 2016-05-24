///////////////Draw Library\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Clear screen to redraw a new scene to the canvas.
function clearScreen(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Clear button has to be called after a button is clicked to silence the event listeners.
function clearButtonEvents(params)	{
	for (i=0; i< params.length; i++) {
		params = [];
	}
}

// Convert degrees to radians
function degToRad(degree) {
	var factor = Math.PI/180;
	return degree*factor;
}

// Draw a popup window given the x, y, width and height.
function drawPopup(events, canvas, context, window, x, y, k, z, name, msg) {
	//context.clearRect(0, 0, canvas.width, canvas.height);
	//canvas.style.background = 'rgb(34,110,172)';
	
	window.beginRegion();
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.fillStyle = "rgb(34,110,172)";
	context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + k, y);
	context.arc(x + k + 30, y + 30, 30, degToRad(270), degToRad(0));
    context.lineTo(x + k + 60, y + z);
	context.arc(x + k + 30, y + z, 30, degToRad(0), degToRad(90));
    context.lineTo(x, y + z + 30);
	context.arc(x, y + z, 30, degToRad(90), degToRad(180));
    context.lineTo(x - 30, y + 30);
	context.arc(x, y + 30, 30, degToRad(180), degToRad(270));
	context.fill();
    context.stroke();
	context.closePath();
	context.font = "Bold 22px Calibri";
    context.fillStyle = "black";
    context.fillText(name, x + (cw * 0.01), y + (ch * 0.025));
	context.fillText(msg, x + (cw * 0.04), y + (ch * 0.25));

 //   window.addRegionEventListener("mousemove", mouseMove);
    window.addRegionEventListener("mousedown", mouseDown);
//    window.addRegionEventListener("mouseout", mouseOut);
	
	var chosen = false;
	function mouseDown() {
		var rect = canvas.getBoundingClientRect(),
			rx = event.clientX - rect.left,
			ry = event.clientY - rect.top;
		if (rx >= x && rx <= x + k &&
			ry >= y && ry <= y + z) {
			console.log(" pop up clicked");
			chosen = true;
		}
	}
	
	window.closeRegion();
    return chosen;
}

// Write a message to the top left of the screen.
function writeMessage(context, message) {
    context.font = "bold 24px Calibri";
    context.fillStyle = "black";
    context.fillText(message, cw * 0.75, ch * 0.05);
}

// Draw a square given the x, y, width and height.
function drawSquare(context, x, y, k, z, name, size) {
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.fillStyle = "rgb(34,110,172)";
	context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + k, y);
    context.lineTo(x + k, y + z);
    context.lineTo(x, y + z);
	context.closePath();
	context.fill();
    context.stroke();
	context.font = size;
    context.fillStyle = "black";
    context.fillText(name, x + (cw * 0.027), y + (ch * 0.09));
}

// To add a button remember to initialise at the top of window.load,
// AND add an IF statement to handle the click & hover event(s)!
function drawButton(context, btn, text, font, tx, ty) {
    context.fillStyle = btn.selected ? "RGB(136,0,21)" : "RGB(177,137,79)";
    context.strokeStyle = 'black';
    context.lineWidth = 4;
	context.beginPath();
    context.fillRect(btn.x, btn.y, btn.w, btn.h);
	context.stroke();
	context.closePath();
    context.fillStyle = "black";
    context.font = font;
    context.fillText(text, tx, ty);
}

// Adds the tiles to the board view screen AND initialises their events.
function addTile(events, canvas, context, message, window, x, y, k, z, name) {
    window.beginRegion();
    drawSquare(context, x, y, k, z, name, "Bold 22px Calibri");

    window.addRegionEventListener("mousemove", mouseMove);
    window.addRegionEventListener("mousedown", mouseDown);
    window.addRegionEventListener("mouseout", mouseOut);

    function mouseMove() {
        if (tilesActive === true) {
            drawSquare(context, x - (cw * 0.02), y - (ch * 0.03), k * 1.35, z * 1.35, name, "Bold 42px Calibri");
            var mousePos = events.getMousePos();
            var mouseX = mousePos.x - 50;
            var mouseY = mousePos.y - 50;
            message = name + " mouse Position: " + mouseX +
                "," + mouseY;
			var rect = canvas.getBoundingClientRect(),
			rx = event.clientX - rect.left,
			ry = event.clientY - rect.top;
            if (rx >= x && rx <= x + k &&
                ry >= y && ry <= y + z) {
				canvas.style.cursor = "pointer";
			} else {
				canvas.style.cursor = "auto";
			}	
        }
    }

    function mouseDown() {
        if (tilesActive === true) {
            var rect = canvas.getBoundingClientRect(),
                rx = event.clientX - rect.left,
                ry = event.clientY - rect.top;
            if (rx >= x && rx <= x + k &&
                ry >= y && ry <= y + z) {
                message = name + " clicked";
                clicked++;
            }
        }
    }

    function mouseOut() {
        if (tilesActive === true) {
            message = "Mouseout of " + name;
        }
    }

    window.closeRegion();
    return message;
}