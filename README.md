
#robotjs-combos

Easy node API to allow for the easy use of key combinations in robot.js

I was trying to do a simple chain of keyboard commands, this one does a quick loop around my workspaces (2X2) in linux using the standard `ctrl+alt+arrow`:

#### Installation
``` sh
$ npm install robotjs-combos
```

#### Quick Usage 

``` js
robotjs_combo = require('robotjs-combos');


//takes an array of key combonations executed in order
var commands = 	[["alt","control","right"],
				["alt","control","down"],
				["alt","control","left"],
				["alt","control","up"]]
robotjsCombos(commands,function(){
	console.log("around the workspaces!");
},300);//(command,callback, optional_timeout)

//takes a single key combination
var command = ["alt","control","left"]
robotjsCombos(command,function(){
	console.log("just left");
},100); //(command,callback, optional_timeout);
```
API Spec:

`robotjs_combo(command_string,callback,optional_timeout); 

The optional timeout is the length of time between presses.  I may add other ways to tune this in the future

#### Explanation of why:

I was working on a project and wanted a simple API to do complex keypress sequences...here is the above multiple keypress thing i came up with...then decided to write a quick module to make easy.

``` js
robot.keyToggle("alt", 'down');
robot.keyToggle("control", 'down');

setTimeout(function(){
	robot.keyTap('right');
	setTimeout(function(){
		robot.keyTap('down');
		setTimeout(function(){
			robot.keyTap('left');
			setTimeout(function(){
				robot.keyTap('up');
				setTimeout(function(){
					robot.keyToggle("alt", 'up');
					robot.keyToggle("control", 'up');	
					setup()
				},300);	
			},300);
		},300);
	},300);
},300);
```
...ugly.

So instead I wrote a quick module that can be used instead

