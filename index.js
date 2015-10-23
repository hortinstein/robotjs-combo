//Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
var async = require("async");

DELAY = 5

var test_console = {
	log: function (string) {
			if (process.env.NODE_ENV === 'test'){
				console.log(string);
			}
}}

var executeKeyDown = function (command, callback) {
	test_console.log('holding down '+command)
	robot.keyToggle(command,'down');
	setTimeout(function() {
		callback();
	}, DELAY);
}
var executeKeyUp = function (command, callback) {
	test_console.log('releasing '+command)
	robot.keyToggle(command,'up');
	callback();
}
 
var processCommand = function (command,callback) {
	test_console.log('pressing ' + command);
	if (Array.isArray(command)){
		holds = command.slice(0,-1); //cuts off all but the last key
        async.map(holds, executeKeyDown, function(){
   	 		test_console.log('tapping ' + command.slice(-1)[0] );
   	 		robot.keyTap(command.slice(-1)[0] );
   	 		async.map(holds,executeKeyUp,function () {
   	 			callback();
   	 		});
		});
    } else {
        //console.log("single element detected")
    	robot.keyTap(command);
    	callback();
    }
}

var processComplexCommand = function(commands, callback, OPTdelay){
	if(typeof OPTdelay !== "undefined") {
		test_console.log('setting delay to '+ OPTdelay )
		DELAY = OPTdelay;
    }
	if (Array.isArray(commands) && Array.isArray(commands[0])){
		async.mapSeries(commands, processCommand,function () {	
			callback();	
		})
	} else if (Array.isArray(commands)){
		processCommand(commands,function () {
        	callback();
        });		
    } else {
        processCommand(commands,function () {
        	callback();
        });
    }
}

var commands = [["alt","control","right"],
				["alt","control","down"],
				["alt","control","left"],
				["alt","control","up"]]

module.exports = processComplexCommand



