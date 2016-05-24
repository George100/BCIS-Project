var clicked = 0;
var firstTimeMenu = true;
var firstTimeBoard = true;
var tilesActive = false;
var back = false;
var audio = false;
var language = false;
var btnL, btnA, btnB, btnBB, btnAB, btnAD;
var canvas = document.getElementById("myCanvas"),
context = canvas.getContext("2d"),
rect = canvas.getBoundingClientRect(),
mouseX,
mouseY;
var cw = canvas.width;
var ch = canvas.height;
var events = new Events("myCanvas");
var welcomePopUp, startPopUp;
 
// Starting function
window.onload = function() {

    main(canvas, context, null);

};

// Main menu screen
function main(canvas, context) {
	// if first time running, load variables & wallpaper
	if(firstTimeMenu){
		canvas = events.getCanvas();
		context = events.getContext();
		document.getElementById("myCanvas").style.background = 'rgb(34,150,172)';
	}
	
	btn = { //Start button
		x: cw * 0.15,
		y: ch * 0.75,
		w: cw * 0.30,
		h: ch * 0.10,
		selected: false
	};
	btn1 = { //Settings Button
		x: cw * 0.55,
		y: ch * 0.75,
		w: cw * 0.30,
		h: ch * 0.10,
		selected: false
	};
	
	// Set other buttons to null to silence their event listeners for now
	btnL = [];
	btnA = [];
	btnB = [];
	btnAB = [];
	btnAD = [];
	btnBB = [];
	
	// Set events for pop up window
	events.setStage(function() {
		this.clear();
		
		context.fillStyle = "black";
		context.font = "bold 112px Calibri";
		context.fillText("Journey Board", cw * 0.26, ch * 0.35);
		
		// Only show pop up here on first run
		if(firstTimeMenu){		
			welcomePopUp = false;
			welcomePopUp = drawPopup(events, canvas, context, this, cw * 0.36, ch * 0.42, 300, 300, "Welcome.",
			"Click here to begin.");
		}
		
		// If the popup has already been clicked
		if(welcomePopUp){
			
			// Now we set menu title text, background and graphics
			context.clearRect(0, 0, cw, ch);
			document.getElementById("myCanvas").style.background = 'rgb(34,110,172)';
			context.fillStyle = "black";
			context.font = "bold 112px Calibri";
			context.fillText("Journey Board", cw * 0.26, ch * 0.35);
			context.font = "bold 38px Calibri";
			context.fillText("Main Menu Screen", cw * 0.025, ch * 0.05);
			context.font = "44px Calibri";
			context.fillText("Prototype 1", cw * 0.26, ch * 0.5);
			context.font = "26px Calibri";
			context.fillText("Features: Hover & Click Event Listeners, Canvas Buttons,", cw * 0.26, ch * 0.55);
			context.fillText("& Basic color fill graphics", cw * 0.28, ch * 0.6);
			
			// Draw buttons
			drawButton(context, btn, "Start", "bold 44px Calibri", cw * 0.265, ch * 0.81);
			drawButton(context, btn1, "Settings","bold 44px Calibri",  cw * 0.65, ch * 0.81);
			// Event listeners now go live for all buttons (except those nullified above)
			canvas.addEventListener("click", onMouseClick);
			canvas.addEventListener("mousemove", onMouseMove);
			// Set firstTime to false incase user returns to the menu later
			firstTimeMenu = false;
			// Destroy event listener for pop up window
			events.destroyStage();
		}
	 });
}

// onMouseClick is called when the mouse is clicked anywhere in the canvas 
// - PROVIDED that the event listener is active at the time.
function onMouseClick(event) {
// Once the button click has been detected we need to figure out where on the screen it came from  
// so we can figure out which button on the viewable screen was the one that the user has selected.
    var rect = canvas.getBoundingClientRect(),
        x = event.clientX - rect.left,
        y = event.clientY - rect.top;
	// If START button was clicked
    if (x >= btn.x && x <= btn.x + btn.w &&
        y >= btn.y && y <= btn.y + btn.h) {
        btn.selected = !btn.selected;
        btn = [];
        btn1 = [];
        btnL = [];
        btnA = [];
        boardView(canvas, context);
	// If SETTINGS button was clicked
    } else if (x >= btn1.x && x <= btn1.x + btn1.w &&
        y >= btn1.y && y <= btn1.y + btn1.h) {
        btn1.selected = !btn1.selected;
        btn1 = [];
        settings(canvas, context);
	// If AUDIO button was clicked
    } else if (x >= btnA.x && x <= btnA.x + btnA.w &&
        y >= btnA.y && y <= btnA.y + btnA.h) {
		if(audio){
			audio = false;
		} else if(!audio){
			audio = true;
		}btnA.selected = audio;
		drawButton(context, btnA, "o", "bold 80px Calibri", cw * 0.685, ch * 0.465);
	// If LANGUAGE button was clicked
    } else if (x >= btnL.x && x <= btnL.x + btnL.w &&
        y >= btnL.y && y <= btnL.y + btnL.h) {
		if(language){
			language = false;
		} else if(!language){
			language = true;
		}btnL.selected = language;
		drawButton(context, btnL, "x", "bold 80px Calibri", cw * 0.685, ch * 0.615);
	// If SETTINGS-BACK button was clicked
    } else if (x >= btnB.x && x <= btnB.x + btnB.w &&
        y >= btnB.y && y <= btnB.y + btnB.h) {
        btnB.selected = !btnB.selected;
		btnB = [];
        context.clearRect(0, 0, cw, ch);
        main(canvas, context);
	// If AVATAR-BACK button was clicked
    } else if (x >= btnAB.x && x <= btnAB.x + btnAB.w &&
        y >= btnAB.y && y <= btnAB.y + btnAB.h) {
		btnAD = [];
		btnAB = [];
        btnAB.selected = !btnAB.selected;
		boardView(canvas, context);
	// If BOARDVIEW-BACK button was clicked
    } else if (x >= btnBB.x && x <= btnBB.x + btnBB.w &&
        y >= btnBB.y && y <= btnBB.y + btnBB.h) {
		btnBB = [];
        btnBB.selected = !btnBB.selected;
		// if back becomes true in boardview we return to menu screen
        back = true;
	// If AVATAR-DRAW button was clicked
    }  else if (x >= btnAD.x && x <= btnAD.x + btnAD.w &&
        y >= btnAD.y && y <= btnAD.y + btnAD.h) {
		drawThing();
    }
}
// Change the cursor when mouse enters the bounds of any button.
function onMouseMove(event) {
    var rect = canvas.getBoundingClientRect(),
        x = event.clientX - rect.left,
        y = event.clientY - rect.top;
    if ((x >= btn.x && x <= btn.x + btn.w &&
            y >= btn.y && y <= btn.y + btn.h) || (x >= btn1.x && x <= btn1.x + btn1.w && y >= btn1.y && y <= btn1.y + btn1.h) ||
        (x >= btnA.x && x <= btnA.x + btnA.w && y >= btnA.y && y <= btnA.y + btnA.h) ||
		(x >= btnAD.x && x <= btnAD.x + btnAD.w && y >= btnAD.y && y <= btnAD.y + btnAD.h) ||
		(x >= btnAB.x && x <= btnAB.x + btnAB.w && y >= btnAB.y && y <= btnAB.y + btnAB.h) ||
        (x >= btnB.x && x <= btnB.x + btnB.w && y >= btnB.y && y <= btnB.y + btnB.h) ||
		(x >= btnBB.x && x <= btnBB.x + btnBB.w && y >= btnBB.y && y <= btnBB.y + btnBB.h) ||
        (x >= btnL.x && x <= btnL.x + btnL.w && y >= btnL.y && y <= btnL.y + btnL.h)) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "auto";
    }
}

//////////////////SETTINGS SCREEN////////////////////
function settings(canvas, context) {
    var events = new Events("myCanvas");
    var message = "";
    // Set background color
    document.getElementById("myCanvas").style.background = 'RGB(18,107,79)';
	// Clear the screen
    context.clearRect(0, 0, cw, ch);

    btnA = { //Audio Button
        x: cw * 0.65,
        y: ch * 0.40,
        w: cw * 0.10,
        h: ch * 0.10,
        selected: audio
    };

    btnL = { //Language Button
        x: cw * 0.65,
        y: ch * 0.55,
        w: cw * 0.10,
        h: ch * 0.10,
        selected: language
    };

    btnB = { //Back Button 
        x: cw * 0.55,
        y: ch * 0.75,
        w: cw * 0.30,
        h: ch * 0.10,
        selected: false
    };

    //Title text, background and graphics
    document.getElementById("myCanvas").style.background = 'rgb(34,110,172)';
    context.fillStyle = "black";
    context.font = "bold 112px Calibri";
    context.fillText("Settings", cw * 0.28, ch * 0.35);
    context.font = "bold 38px Calibri";
    context.fillText("Settings Screen", cw * 0.025, ch * 0.05);
    context.font = "44px Calibri";
    context.fillText("Audio: ", cw * 0.30, ch * 0.45);
    context.font = "44px Calibri";
    context.fillText("Language: ", cw * 0.28, ch * 0.60);

    //Draw buttons
    drawButton(context, btn, "Start", "bold 44px Calibri", cw * 0.265, ch * 0.81);
    drawButton(context, btnA, "o", "bold 80px Calibri", cw * 0.685, ch * 0.465);
    drawButton(context, btnL, "x", "bold 80px Calibri", cw * 0.685, ch * 0.615);
    drawButton(context, btnB, "Back", "bold 44px Calibri",  cw * 0.67, ch * 0.81);
// Buttons are already live because their event listener was created already.
}

//////////////////BOARD VIEW SCREEN/////////////////////
function boardView(canvas, context) {
	canvas = events.getCanvas();
	context = events.getContext();
    var message = "";
    document.getElementById("myCanvas").style.background = 'RGB(18,107,79)';

	btnBB = { //BoardView Back Button 
        x: cw * 0.79,
        y: ch * 0.92,
        w: cw * 0.17,
        h: ch * 0.06,
        selected: false
    };
	
    events.setStage(function() {
        this.clear();
		
		// Only show pop up here on first run
		if(firstTimeBoard){		
			startPopUp = false;
			startPopUp = drawPopup(events, canvas, context, this, cw * 0.36, ch * 0.42, 300, 300, "Welcome to the journey board."
			,"Touch to begin.");
		}
		
		if(startPopUp){
			tilesActive = true;
			firstTimeBoard = false;
			drawButton(context, btnBB, "Back", "bold 34px Calibri", cw * 0.85, ch * 0.96);
			context.font = "Bold 38px Calibri";
			context.fillText("Board View Screen", cw * 0.025, ch * 0.05);
			context.font = "Bold 32px Calibri";
			context.fillText("Features: tracks and listens to all mouse events, zooms on hovered tile", cw * 0.05, ch * 0.97);

			// Add tiles to the journey board
			message = addTile(events, canvas, context, message, this, cw * 0.07, ch * 0.26, cw * 0.11, ch * 0.16, "phase0");
			message = addTile(events, canvas, context, message, this, cw * 0.07, ch * 0.1, cw * 0.11, ch * 0.16, "phase1");
			message = addTile(events, canvas, context, message, this, cw * 0.18, ch * 0.1, cw * 0.11, ch * 0.16, "phase2");
			message = addTile(events, canvas, context, message, this, cw * 0.29, ch * 0.1, cw * 0.11, ch * 0.16, "phase3");
			message = addTile(events, canvas, context, message, this, cw * 0.4, ch * 0.1, cw * 0.11, ch * 0.16, "phase4");
			message = addTile(events, canvas, context, message, this, cw * 0.51, ch * 0.1, cw * 0.11, ch * 0.16, "phase5");
			message = addTile(events, canvas, context, message, this, cw * 0.62, ch * 0.1, cw * 0.11, ch * 0.16, "phase6");
			message = addTile(events, canvas, context, message, this, cw * 0.73, ch * 0.1, cw * 0.11, ch * 0.16, "phase7");
			message = addTile(events, canvas, context, message, this, cw * 0.73, ch * 0.26, cw * 0.11, ch * 0.16, "phase8");
			message = addTile(events, canvas, context, message, this, cw * 0.73, ch * 0.42, cw * 0.11, ch * 0.16, "phase9");
			message = addTile(events, canvas, context, message, this, cw * 0.73, ch * 0.58, cw * 0.11, ch * 0.16, "phase10");
			message = addTile(events, canvas, context, message, this, cw * 0.73, ch * 0.74, cw * 0.11, ch * 0.16, "phase11");
			message = addTile(events, canvas, context, message, this, cw * 0.62, ch * 0.74, cw * 0.11, ch * 0.16, "phase12");
			message = addTile(events, canvas, context, message, this, cw * 0.51, ch * 0.74, cw * 0.11, ch * 0.16, "phase13");
			message = addTile(events, canvas, context, message, this, cw * 0.51, ch * 0.58, cw * 0.11, ch * 0.16, "phase14");
			message = addTile(events, canvas, context, message, this, cw * 0.51, ch * 0.42, cw * 0.11, ch * 0.16, "phase15");
			message = addTile(events, canvas, context, message, this, cw * 0.4, ch * 0.42, cw * 0.11, ch * 0.16, "phase16");
			message = addTile(events, canvas, context, message, this, cw * 0.29, ch * 0.42, cw * 0.11, ch * 0.16, "phase17");
			message = addTile(events, canvas, context, message, this, cw * 0.29, ch * 0.58, cw * 0.11, ch * 0.16, "phase18");
			message = addTile(events, canvas, context, message, this, cw * 0.18, ch * 0.58, cw * 0.11, ch * 0.16, "phase19");
			message = addTile(events, canvas, context, message, this, cw * 0.18, ch * 0.74, cw * 0.11, ch * 0.16, "phase20");
			message = addTile(events, canvas, context, message, this, cw * 0.07, ch * 0.74, cw * 0.11, ch * 0.16, "phase21");
			
			// Draw red circle
			context.beginPath();
			context.arc(560, canvas.height / 2 - 34, 20, 0, Math.PI * 2, true);
			context.fillStyle = "red";
			context.fill();
			context.stroke();
			context.closePath();
			
			// If one of the tiles is clicked
			if (clicked > 1) {
				clicked = 0;
				tilesActive = false;
				events.destroyStage();
				avatarScreen(canvas, context);
			}
			if (back) {
				back = false;
				tilesActive = false;
				events.destroyStage();
				//events.stage = undefined;
				main(canvas, context);
			}
			if(tilesActive === true){
				writeMessage(context, message);			
			}
		}
    });
}

//////////////////AVATAR VIEW SCREEN/////////////////////
function avatarScreen(canvas, context) {
	btnAB = { //AvatarView Back Button 
        x: cw * 0.77,
        y: ch * 0.03,
        w: cw * 0.20,
        h: ch * 0.06,
        selected: false
    };
	btnAD = { //Avatarview Draw Button 
        x: cw * 0.03,
        y: ch * 0.03,
        w: cw * 0.20,
        h: ch * 0.06,
        selected: false
    };
	
    // draw background
    context.drawImage(slide0, 0, 0, cw, ch);
    // draw avatar
    context.drawImage(avatar, 0, 0, 104, 150,	 0, ch * 0.66, cw * 0.14, ch * 0.3);
    // add text
    context.fillStyle = "black";
    context.font = "Bold 48px Calibri";
    context.fillText("Avatar Walk Screen", cw * 0.37, ch * 0.07);
	drawButton(context, btnAB, "Back","bold 34px Calibri", cw * 0.85, ch * 0.07);
	drawButton(context, btnAD, "Draw", "bold 34px Calibri",cw * 0.11, ch * 0.07);
}

var avatar = document.createElement("img");
avatar.src = "http://i.imgur.com/6c6IoUo.png";
var slide0 = document.createElement("img");
slide0.src = "http://i.imgur.com/kqMhwHQ.jpg";
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

// Actually starts the animation
function drawThing() {
	console.log("Okay Draw!" + index);
	drawOne(slide0, slide1);
}

// Draws the animation, should be followed by draw2, draw3, etc but needs looping.
function drawOne(current, next) {
    var image = document.getElementById("avatar");
    var width = 104; // avatar width
    var height = 150; // avatar height	
    var posX = (index * width); // source x
    var animateOne;

    context.clearRect(0, 0, cw, ch);
    context.drawImage(current, 0, 0, cw, ch);
    context.drawImage(image, posX, 0, width, height, canvasX, ch * 0.66, cw * 0.14, ch * 0.3);
	
    if (canvasX < cw) {
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
		avatarScreen(canvas, context);
		
    }
}