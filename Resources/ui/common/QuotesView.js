function QuotesView() {
	
	var Cloud = require('ti.cloud');
	var appUtil = Ti.App.appUtil;
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#9f9f9f',
		title: 'Quotes View'
	});
	
	var navWin = Ti.UI.iOS.createNavigationWindow({
			window: self
		});
	
	var container = Ti.UI.createView({
	   borderRadius:10,
	   backgroundColor: '#9f9f9f',
	   width: Ti.UI.FILL,
	   height: Ti.UI.FILL,
	});
	
	// log out a account
	var logout = Ti.UI.createButton({
		height: 44,
		width: 80,
		title: L('btnLogout'),
		top : 15,
        left : 10,
		font: {fontFamily: 'Helvetica', fontSize: 16, fontWeigth: 'normal'}
	});
	logout.addEventListener('click',function(){
		Cloud.Users.logout(function (e) {
		    if (e.success) {
		        //alert('Success: Logged out');
		        self.close();
		        var loginWindow = require('/ui/common/LoginView');
				var loginWindowInstance = new loginWindow();
				self.add(loginWindowInstance);
		    } else {
		    	appUtil.util.alertMsg(L('loginError'),"Something is wrong!!");
		        console.log('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	});
	
	
	container.add(logout);
	
	self.add(container);
			
	Ti.API.info('======>>>>>> Here quotes view '); 

	return self;
};

module.exports = QuotesView;
