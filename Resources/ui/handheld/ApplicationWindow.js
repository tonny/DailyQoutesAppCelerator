//Application Window Component Constructor
function ApplicationWindow() {
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden: true
	});
	var navWin = Ti.UI.iOS.createNavigationWindow({
			window: self
		});

	//function to see if an user is logged
	/*
	var logged = true;
	if(logged){
		var quotesWindow = require('/ui/common/QuotesView');
		var quotesWindowInstance = new quotesWindow();
		quotesWindowInstance.open();
		//self.add(quotesWindowInstance);
	}else{
		var loginWindow = require('/ui/common/LoginView');
		var loginWindowInstance = new loginWindow();
		self.add(loginWindowInstance);
		//loginWindowInstance.open();
	} 
	*/
	var loginWindow = require('/ui/common/LoginView');
	var loginWindowInstance = new loginWindow();
	self.add(loginWindowInstance);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
