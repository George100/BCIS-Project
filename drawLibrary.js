///////////////Draw Library\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Clear screen to redraw a new scene to the canvas.
function clearScreen(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Clear button has to be called after a button is clicked to silence the event listeners.
function clearButtonEvents(params)	{
	for (i=0; i<params.length; i++) {
		params = [];
	}
}

// Write a message to the top left of the screen.
function writeMessage(context, message) {
    context.font = "bold 18px Calibri";
    context.fillStyle = "black";
    context.fillText(message, 10, 25);
}

// Draw a square given the x, y, width and height.
function drawSquare(context, x, y, k, z) {
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.fillStyle = "rgb(34,110,172)";
    context.moveTo(x, y);
    context.lineTo(x + k, y);
    context.lineTo(x + k, y + z);
    context.lineTo(x, y + z);
    context.closePath();
    context.fill();
    context.stroke();
}

// To add a button remember to initialise at the top of window.load,
// AND add an IF statement to handle the click & hover event(s)!
function drawButton(context, x, y, w, h, text, tx, ty) {
    context.fillStyle = btn.selected ? "rgb(34,110,172)" : "RGB(177,137,79)";
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.stroke();
    context.fillRect(x, y, w, h);
    context.fillStyle = "black";
    context.font = "bold 24px Calibri";
    context.fillText(text, tx, ty);
}

// Adds the tiles to the board view screen AND initialises their events.
function addTile(events, canvas, context, message, window, x, y, k, z, name) {
    window.beginRegion();
    drawSquare(context, x, y, k, z);

    window.addRegionEventListener("mousemove", mouseMove);
    window.addRegionEventListener("mousedown", mouseDown);
    window.addRegionEventListener("mouseout", mouseOut);

    function mouseMove() {
        if (clicked === false) {
            drawSquare(context, x - 20, y - 20, k * 1.5, z * 1.5);
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
        if (clicked === false) {
            var rect = canvas.getBoundingClientRect(),
                rx = event.clientX - rect.left,
                ry = event.clientY - rect.top;
            if (rx >= x && rx <= x + k &&
                ry >= y && ry <= y + z) {
                message = name + " clicked";
                clicked = true;
            }
        }
    }

    function mouseOut() {
        if (clicked === false) {
            message = "Mouseout of " + name;
        }
    }

    window.closeRegion();
    return message;
}