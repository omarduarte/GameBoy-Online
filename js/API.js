// dataUriOpen(String)
// returns: null
//
// WHAT IT DOES
//--------------
// It takes in an ESCAPED base64 enconded version of the ROM.
// It thens loads the game and starts it.
//
var dataUriOpen = function(datauri) {
	if (datauri != null && datauri.length > 0) {
		try {
			cout(Math.floor(datauri.length * 3 / 4) + " bytes of data submitted by form (text length of " + datauri.length + ").", 0);
			initPlayer();
			start(mainCanvas, base64_decode(datauri));
		}
		catch (error) {
			alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
		}
	}
};

// restart()
// returns: null
//
// WHAT IT DOES
//--------------
// It restarts the ROM that is currently running.
// 
var restart = function() {
	if (GameBoyEmulatorInitialized()) {
		try {
			if (!gameboy.fromSaveState) {
				initPlayer();
				start(mainCanvas, gameboy.getROMImage());
			}
			else {
				initPlayer();
				openState(gameboy.savedStateFileName, mainCanvas);
			}
		}
		catch (error) {
			alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
		}
	}
	else {
		cout("Could not restart, as a previous emulation session could not be found.", 1);
	}
};

// resume()
// returns: null
//
// WHAT IT DOES
//--------------
// It unpauses the game.
//
var resume = function() {
	run();
};

// saveFreezeState()
// returns: Array
//
// WHAT IT DOES
//--------------
// It returns the current Freeze State of the game
// as an Array.
//
var saveFreezeState = function() {
	return gameboy.saveState();
};

// openFreezeState(Array)
// returns: null
//
// WHAT IT DOES
//--------------
// It returns the current Freeze State of the game
// as an Array.
//
function openFreezeState(state) {
	try {
		clearLastEmulation();
		cout("Attempting to run a saved emulation state.", 0);
		gameboy = new GameBoyCore(mainCanvas, "");				
		gameboy.returnFromState(state);
		run();
	}
	catch (error) {
		cout("ERROR: "+ error.message + ". Could not open the saved emulation state.", 2);
	}
}
