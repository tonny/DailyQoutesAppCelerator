function AddQuotesView() {
	var Cloud = require('ti.cloud');
	var appUtil = Ti.App.appUtil;
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#9f9f9f',
		title: 'Quotes View'
	});
	
	var container = Ti.UI.createView({
	   borderRadius:10,
	   backgroundColor: '#9f9f9f',
	   width: Ti.UI.FILL,
	   height: Ti.UI.FILL,
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
	
	//register to cloud 
	var txtQoute = Ti.UI.createTextArea({
	  borderWidth: 2,
	  borderColor: '#bbb',
	  borderRadius: 5,
	  color: '#888',
	  font: {fontSize:20, fontWeight:'bold'},
	  keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
	  returnKeyType: Ti.UI.RETURNKEY_GO,
	  textAlign: 'left',
		color: '#000000',
		top : 50,
		width: 250,
		height: 240,
		hintText: 'Qoutes',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	
	//register to cloud 
	var txtAuthorName =  Ti.UI.createTextField({
		color: '#000000',
		top : 300,
		width: 250,
		height: 40,
		hintText: 'Author',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
		backgroundColor: '#FFFFFF'
	});
	 
	// create a account
	var button = Ti.UI.createButton({
		height:44,
		width:250,
		title:L('shareQuotes'),
		backgroundColor: '#cc0000',
		color: '#FFFFFF',
		top:350	,
		font: {fontFamily: 'Helvetica', fontSize: 16, fontWeigth: 'normal'}
	});
	
	button.addEventListener('click',function(){
		if(txtAuthorName.value === '' || txtAuthorName.value === null || txtAuthorName.value === undefined ||
		    txtQoute.value === '' || txtQoute.value === null || txtQoute.value === undefined )
		{
		   appUtil.util.alertMsg(L('loginError'),"You need fill all fields!!");			
		}else{
			Cloud.Posts.create({
			    content: txtQoute.value,
			    title: txtAuthorName.value
			}, function (e) {
			    if (e.success) {
			        var post = e.posts[0];
			        console.log('Success:\n' +
			            'id: ' + post.id + '\n' +
			            'title: ' + post.title + '\n' +
			            'content: ' + post.content + '\n' +
			            'updated_at: ' + post.updated_at);
			         self.close();
			    } else {
			    	appUtil.util.alertMsg(L('loginError'),"Something is wrong!!");
			        console.log('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			});
		}
	});
	
	container.add(btnBack);
	container.add(txtQoute);
	container.add(txtAuthorName);
	container.add(button);	
	self.add(container);
	
	return self;
}

module.exports = AddQuotesView;
