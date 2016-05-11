var clicked = false;

window.onload = function() {
	///////////Main Menu Screen\\\\\\\\\\\\\\\\\\\
    
	var canvas = document.getElementById("myCanvas"),
        context = canvas.getContext("2d"),
        rect = canvas.getBoundingClientRect(),
        mouseX,
        mouseY;
	
    btn = {    //Start button
        x: 180,
        y: 370,
        w: 200,
        h: 50,
        selected: false
    };
    
    btn1 = {	//Settings Button
        x: 430,
        y: 370,
        w: 200,
        h: 50,
        selected: false
    };
	
	btnA = {	//Audio Button (for settings but initialised now)
		x: 320,
		y: 230,
		w: 50,
		h: 25,
		selected: false
	};
	
	btnL = {	//Language Button  (for settings but initialised now)
		x: 320,
		y: 280,
		w: 50,
		h: 25,
		selected: false
	};
	
	// New buttons need to be added to the array
	var buttons = [ btn, btn1, btnA, btnL ];
	
    //Title text, background and graphics
    document.getElementById("myCanvas").style.background = 'rgb(34,110,172)';
    context.fillStyle = "black";
    context.font = "bold 54px Calibri";
    context.fillText("Journey Board", 180, 200);
    context.font = "bold 18px Calibri";
    context.fillText("Main Menu Screen", 15, 25);
    context.font = "24px Calibri";
    context.fillText("Prototype 1", 200, 230);
    context.font = "16px Calibri";
    context.fillText("Features: Hover & Click Event Listeners, Canvas Buttons,", 200, 250);
    context.fillText("& Basic color fill graphics", 203, 270);

    //Draw buttons
    drawButton(context, btn.x, btn.y, btn.w, btn.h, "Start", 260, 400);
    drawButton(context, btn1.x, btn1.y, btn1.w, btn1.h, "Settings", 490, 400);

    //Add event listeners
    canvas.addEventListener("click", onMouseClick);
    canvas.addEventListener("mousemove", onMouseMove);

	//Click method for all buttons in menu and settings
	// A new if statement is added to check if the  
	// click is within the bounds of the button.
    function onMouseClick(event) {
        var rect = canvas.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;
        if (x >= btn.x && x <= btn.x + btn.w &&
            y >= btn.y && y <= btn.y + btn.h) {
            btn.selected = !btn.selected;
			clearButtonEvents(buttons);
            boardView();
        } else if (x >= btn1.x && x <= btn1.x + btn1.w &&
            y >= btn1.y && y <= btn1.y + btn1.h) {
            btn1.selected = !btn1.selected;
			clearButtonEvents(buttons);
            settings();
        }else if (x >= btnA.x && x <= btnA.x + btnA.w &&
            y >= btnA.y && y <= btnA.y + btnA.h) {
            btnA.selected = !btnA.selected;
		//	clearButtonEvents(btn, btn1, btnA, btnL);
        }else if (x >= btnL.x && x <= btnL.x + btnL.w &&
            y >= btnL.y && y <= btnL.y + btnL.h) {
            btnL.selected = !btnL.selected;
			//clearButtonEvents(btn, btn1, btnA, btnL);
        }
    }
	// Change the cursor when mouse enters the bounds of any button.
    function onMouseMove(event) {
        var rect = canvas.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;
        if ((x >= btn.x && x <= btn.x + btn.w &&
                y >= btn.y && y <= btn.y + btn.h) || (x >= btn1.x && x <= btn1.x + btn1.w && y >= btn1.y && y <= btn1.y + btn1.h)
				|| (x >= btnA.x && x <= btnA.x + btnA.w && y >= btnA.y && y <= btnA.y + btnA.h)
				|| (x >= btnL.x && x <= btnL.x + btnL.w && y >= btnL.y && y <= btnL.y + btnL.h)) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "auto";
        }
    }
	
	//////////////////SETTINGS SCREEN\\\\\\\\\\\\\\\\\\\\\\
	
    function settings() {
        var events = new Events("myCanvas");
        var message = "";
		//Set background color
        document.getElementById("myCanvas").style.background = 'RGB(18,107,79)';
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Title text, background and graphics
        document.getElementById("myCanvas").style.background = 'rgb(34,110,172)';
        context.fillStyle = "black";
        context.font = "bold 54px Calibri";
        context.fillText("Settings", 180, 200);
        context.font = "bold 18px Calibri";
        context.fillText("Settings Screen", 15, 25);
        context.font = "24px Calibri";
        context.fillText("Audio: ", 200, 250);
        context.font = "24px Calibri";
        context.fillText("Language: ", 200, 300);

        //Draw buttons
        drawButton(context, btn.x, btn.y, btn.w, btn.h, "Start", 260, 400);
        drawButton(context, btnA.x, btnA.y, btnA.w, btnA.h, "o", 340, 245);
        drawButton(context, btnL.x, btnL.y, btnL.w, btnL.h, "x", 340, 295);
		
    }

	//////////////////BOARD VIEW SCREEN\\\\\\\\\\\\\\\\\\\\\\
	
    function boardView() {
        var events = new Events("myCanvas");
        var canvas = events.getCanvas();
        var context = events.getContext();
        var message = "";
        document.getElementById("myCanvas").style.background = 'RGB(18,107,79)';
		
        events.setStage(function() {
            this.clear();
            context.font = "Bold 18px Calibri";
            context.fillText("Board View Screen", 540, 25);
            context.fillText("Features: tracks and listens to all mouse events, zooms on hovered tile", 15, 480);

            message = addTile(events, canvas, context, message, this, 40, 130, 80, 80, "sq0");
            message = addTile(events, canvas, context, message, this, 40, 50, 80, 80, "sq1");
            message = addTile(events, canvas, context, message, this, 120, 50, 80, 80, "sq2");
            message = addTile(events, canvas, context, message, this, 200, 50, 80, 80, "sq3");
            message = addTile(events, canvas, context, message, this, 280, 50, 80, 80, "sq4");
            message = addTile(events, canvas, context, message, this, 360, 50, 80, 80, "sq5");
            message = addTile(events, canvas, context, message, this, 440, 50, 80, 80, "sq6");
            message = addTile(events, canvas, context, message, this, 520, 50, 80, 80, "sq7");
            message = addTile(events, canvas, context, message, this, 520, 130, 80, 80, "sq8");
            message = addTile(events, canvas, context, message, this, 520, 210, 80, 80, "sq9");
            message = addTile(events, canvas, context, message, this, 520, 290, 80, 80, "sq10");
            message = addTile(events, canvas, context, message, this, 520, 370, 80, 80, "sq11");
            message = addTile(events, canvas, context, message, this, 440, 370, 80, 80, "sq12");
            message = addTile(events, canvas, context, message, this, 360, 370, 80, 80, "sq13");
            message = addTile(events, canvas, context, message, this, 360, 290, 80, 80, "sq14");
            message = addTile(events, canvas, context, message, this, 360, 210, 80, 80, "sq15");
            message = addTile(events, canvas, context, message, this, 280, 210, 80, 80, "sq16");
            message = addTile(events, canvas, context, message, this, 200, 210, 80, 80, "sq17");
            message = addTile(events, canvas, context, message, this, 200, 290, 80, 80, "sq18");
            message = addTile(events, canvas, context, message, this, 120, 290, 80, 80, "sq19");
            message = addTile(events, canvas, context, message, this, 120, 370, 80, 80, "sq20");
            message = addTile(events, canvas, context, message, this, 40, 370, 80, 80, "sq21");

            // Draw red circle
            context.beginPath();
            context.arc(560, canvas.height / 2 - 34, 20, 0, Math.PI * 2, true);
            context.fillStyle = "red";
            context.fill();
            context.stroke();
			
			// If one of the tiles is clicked
            if (clicked) {
                avatarScreen(this, canvas, context);
            }
            writeMessage(context, message);
        });
    }

};

//////////////////AVATAR VIEW SCREEN\\\\\\\\\\\\\\\\\\\\\\

function avatarScreen(window, canvas, context) {
    window.clear();
    // draw background
    context.drawImage(slide0, 0, 0, 700, 500);
    // draw avatar
    context.drawImage(avatar, 0, 0, 104, 150, 0, 330, 104, 150);
    // add text
    context.fillStyle = "black";
    context.font = "Bold 18px Calibri";
    context.fillText("Avatar Walk Screen", 540, 25);
}

var avatar = document.createElement("img");
avatar.src = "http://i.imgur.com/QehFdZT.png";
var slide0 = document.createElement("img");
slide0.src = "http://i.imgur.com/bWxOFX6.png";
var slide1 = document.createElement("img");
slide1.src = "http://i.imgur.com/fH1sJLR.png";
var slide2 = document.createElement("img");
slide2.src = "http://i.imgur.com/gEht9R9.png";
var slide3 = document.createElement("img");
slide3.src = "http://i.imgur.com/188z1kY.png";

// initialise
var canvasX = 0; // destination x
var index = 0; // frame index, total 6 from 0-5
var clicks = 2;
var click = true;

// Actually starts the animation
function drawThing() {
    if (clicks % 2 === 0 && click === true) {
        drawOne(slide0, slide1);
        click = false;
    } else if (clicks % 3 === 0) {
        drawOne(slide1, slide2);
    } else if (clicks % 4 === 0) {
        drawOne(slide2, slide3);
    } else if (clicks % 5 === 0) {
        drawOne(slide3, slide0);
    }
    clicks++;
}

// Draws the animation, should be followed by draw2, draw3, etc but needs looping.
function drawOne(current, next) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var image = document.getElementById("avatar");
    var width = 104; // avatar width
    var height = 150; // avatar height	
    var posX = (index * width); // source x
    var animateOne;

    context.clearRect(0, 0, 700, 500);
    context.drawImage(current, 0, 0, 700, 500);
    context.drawImage(image, posX, 0, 104, 150, canvasX, 330, 104, 150);

    if (canvasX < 700) {
        canvasX += 5;

        if (index < 6) {
            index++;
        } else {
            index = 0;
        }

        animateOne = requestAnimationFrame(function() {
            drawOne(slide0, slide0);
        });
    } else {
        cancelAnimationFrame(animateOne);
        context.clearRect(0, 0, 700, 500);
        context.drawImage(next, 0, 0, 700, 500);
        context.drawImage(image, 0, 0, 104, 150, 0, 330, 104, 150);
        canvasX = 0;
        index = 0;
    }
}