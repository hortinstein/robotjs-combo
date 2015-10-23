process.env.NODE_ENV = 'test';

var robotjsCombos = require("../index.js");


it('should move a linux screen all about', function(done) {
    var commands = [["alt","control","right"],
			["alt","control","down"],
			["alt","control","left"],
			["alt","control","up"]]

	robotjsCombos(commands,done,300);
});

it('should move screen right', function(done) {
    var commands = ["alt","control","right"]
	robotjsCombos(commands,done,100);
});

it('should move return', function(done) {
    var commands = ["alt","control","left"]
	robotjsCombos(commands,done,100);
});