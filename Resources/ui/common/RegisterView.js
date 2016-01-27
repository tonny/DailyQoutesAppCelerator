function RegisterView() {
	
	var Cloud = require('ti.cloud');
	
	var posx = 100;
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#9f9f9f',
		title: 'Register User'
	});
	/*
	//create a navigation UI
	var navWin = Ti.UI.iOS.createNavigationWindow({
			window: self
		});
	*/
	var content = Titanium.UI.createView({
	   borderRadius:10,
	   backgroundColor: '#9f9f9f',
	   width: Ti.UI.FILL,
	   height: Ti.UI.FILL,
	});
	
	//register to cloud 
	var txtUserName = Ti.UI.createTextField({
		color: '#000000',
		top : 50+posx,
		width: 250,
		height: 40,
		hintText: 'Username',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	
	//register to cloud 
	var txtFirstName = Ti.UI.createTextField({
		color: '#000000',
		top : 100+posx,
		width: 250,
		height: 40,
		hintText: 'First Name',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	
	//register to cloud 
	var txtLastName = Ti.UI.createTextField({
		color: '#000000',
		top : 150+posx,
		width: 250,
		height: 40,
		hintText: 'Last Name',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	
	//register to cloud 
	var txtEmail = Ti.UI.createTextField({
		color: '#000000',
		top : 200+posx,
		width: 250,
		height: 40,
		hintText: 'Email',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
		backgroundColor: '#FFFFFF'
	});

	//register to cloud 
	var txtPassword = Ti.UI.createTextField({
		color: '#000000',
		top : 250+posx,
		width: 250,
		height: 40,
		hintText: 'Password',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		passwordMask: true,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	
	//register to cloud 
	var txtPasswordConfirm = Ti.UI.createTextField({
		color: '#000000',
		top : 300+posx,
		width: 250,
		height: 40,
		hintText: 'Password confirm',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		passwordMask: true,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	
	// create a account
	var button = Ti.UI.createButton({
		height:44,
		width:250,
		title:L('Create Account'),
		backgroundColor: '#cc0000',
		color: '#FFFFFF',
		top:350+posx,
		font: {fontFamily: 'Helvetica', fontSize: 16, fontWeigth: 'normal'}
	});
	
	button.addEventListener('click',function(){
	
		if (txtUserName.value === '' || txtUserName.value === null || txtUserName.value === undefined ||
		    txtEmail.value === '' || txtEmail.value === null || txtEmail.value === undefined ||
		    txtFirstName.value === '' || txtFirstName.value === null || txtFirstName.value === undefined ||
		    txtLastName.value === '' || txtLastName.value === null || txtLastName.value === undefined ||
		    txtPassword.value === '' || txtPassword.value === null || txtPassword.value === undefined ||
		    txtPasswordConfirm.value === '' || txtPasswordConfirm.value === null || txtPasswordConfirm.value === undefined 
		    ) 
		 {
             var message = Ti.UI.createAlertDialog({
	            message: "You need fill all fields",
	            buttonNames: ['Ok'],
	            title: "Fields empty"
	   		 });
	    	message.show();
         }else{
         	if(txtPassword.value === txtPasswordConfirm.value){
         		Cloud.Users.create({
					username : txtUserName.value,
				    email: txtEmail.value,
				    first_name: txtFirstName.value,
				    last_name: txtLastName.value,
				    password: txtPassword.value,
				    password_confirmation: txtPasswordConfirm.value
				}, function (e) {
				    if (e.success) {
				        var user = e.users[0];
				        alert('Success:\n' +
				            'id: ' + user.id + '\n' +
				            'sessionId: ' + Cloud.sessionId + '\n' +
				            'first name: ' + user.first_name + '\n' +
				            'last name: ' + user.last_name);
					        var quotesWindow = require('ui/common/QuotesView');
							var quotesWindowInstance = new quotesWindow();
							quotesWindowInstance.open();
				    } else {
				        alert('Error:\n' +
				            ((e.error && e.message) || JSON.stringify(e)));
				    }
				});
         	}else{
         		    var message = Ti.UI.createAlertDialog({
			            message: "is not the same the password",
			            buttonNames: ['Ok'],
			            title: "Not equals"
			   		 });
			    	message.show();		
			
				
         	}
         }
	
		
	});
	
	var btnBack = Ti.UI.createButton({
		 title: '< Back', 
		 color: "white", 
		 backgroundImage: "none",
		 top : 15,
         left : 10 });
         
    btnBack.addEventListener('click', function()
    {
    	self.close();
  	});
	
	content.add(txtUserName);
	content.add(txtFirstName);
	content.add(txtLastName);
	content.add(txtEmail);
	content.add(txtPassword);
	content.add(txtPasswordConfirm);
	content.add(button);
	content.add(btnBack);
	self.add(content);
			
	Ti.API.info('======>>>>>> Here Registers view '); 

	//return self;
	return self;
};

module.exports = RegisterView;