//FirstView Component Constructor
function LoginView() {
	//create object instance, a parasitic subclass of Observable

	var Cloud = require('ti.cloud');
	var appUtil = Ti.App.appUtil;
	 
	var self = Titanium.UI.createWindow({
		backgroundColor : '#9f9f9f',
		navBarHidden: true
	});
	
	Ti.API.info('======>>>>>> Here Login view '); 

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	//create a navigation UI
	var viewUI = Ti.UI.iOS.createNavigationWindow({
			window: self
		});
	
	// create view
	var view = Ti.UI.createView({
	   borderRadius:10,
	   backgroundColor: '#9f9f9f',
	   width: Ti.UI.FILL,
	   height: Ti.UI.FILL,
	});
		
	//Login to cloud 
	var txtUserName = Ti.UI.createTextField({
		color: '#000000',
		top : 170,
		width: 250,
		height: 40,
		hintText: 'Username',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	
	var txtPassword = Ti.UI.createTextField({
		color: '#000000',
		top : 220,
		width: 250,
		height: 40,
		hintText: 'Password',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		backgroundColor: '#FFFFFF',
		passwordMask: true,
		editable: true
	});
	
	var btnLogin = Ti.UI.createButton({
		width: 250,
		height: 40,
		top: 270,
		title: L('Login'),
		backgroundColor: '#cc0000',
		color: '#FFFFFF',
		font: {fontFamily: 'Helvetica', fontSize: 16, fontWeigth: 'normal'}
		
	});
	
	btnLogin.addEventListener('click', function(){
		
		if (txtUserName.value === '' || txtUserName.value === null || txtUserName.value === undefined ) {
			appUtil.util.alertMsg(L('loginError'), L('msgUsernameEmpty'));
		} else if (txtPassword.value === '' || txtPassword.value === null || txtPassword.value === undefined ) {
			appUtil.util.alertMsg(L('loginError'), L('msgPasswordEmpty'));
		}else {
			Cloud.Users.login({
			    login: txtUserName.value,
			    password: txtPassword.value
			}, function (e) {
			    if (e.success) {
			        var user = e.users[0];
			        console.log('Success:\n' +
			            'id: ' + user.id + '\n' +
			            'sessionId: ' + Cloud.sessionId + '\n' +
			            'first name: ' + user.first_name + '\n' +
			            'last name: ' + user.last_name);
			        var quotesWindow = require('ui/common/QuotesView');
					var quotesWindowInstance = new quotesWindow();
					quotesWindowInstance.open();
			    } else {
			    	appUtil.util.alertMsg(L('loginError'),"Your credentials are wrong!!");
			        console.log('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			});	
		}
				
	});
	
	var registerLabel = Ti.UI.createLabel({
		color:'#000000',
		text:L('Create an account'),
		height:'auto',
		width:'auto'
	});
	
	//Add event to register label to load a register UI
	registerLabel.addEventListener('click', function(e) {
		var registerWindow = require('/ui/common/RegisterView');
		var registerWindowInstance = new registerWindow();
		registerWindowInstance.open();
	});
	
	view.add(registerLabel);
	view.add(txtUserName);
	view.add(txtPassword);
	view.add(btnLogin);
	//view.show();
	self.add(view);

	//return view;
	return viewUI;
}

module.exports = LoginView;
