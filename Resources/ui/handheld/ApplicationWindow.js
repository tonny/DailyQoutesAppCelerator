//Application Window Component Constructor
function ApplicationWindow() {
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden: true
	});
	/*
	var navWin = Ti.UI.iOS.createNavigationWindow({
			window: self
		});
	*/
	var loginWindow = require('/ui/common/LoginView');
	var loginWindowInstance = new loginWindow();
	self.add(loginWindowInstance);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
