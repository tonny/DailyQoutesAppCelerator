function QuotesView() {
	
	var Cloud = require('ti.cloud');
	var appUtil = Ti.App.appUtil;
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#9f9f9f',
		title: 'Quotes View'
	});
	/*
	var navWin = Ti.UI.iOS.createNavigationWindow({
			window: self
		});
	*/
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
		console.log("cliked logout");
		Cloud.Users.logout(function (e) {
		    if (e.success) {
		        console.log('Success: Logged out');
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
	
	// share quotes
	var qoutes = Ti.UI.createButton({
		height: 44,
		width: 280,
		title: L('btnShareQoutes'),
		bottom : 0,
        left : 20,
		font: {fontFamily: 'Helvetica', fontSize: 16, fontWeigth: 'normal'}
	});
	
	qoutes.addEventListener('click',function(){
	    var addQoutesWindow = require('/ui/common/AddQuotesView');
		var quotesWindowInstance = new addQoutesWindow();
			quotesWindowInstance.open();
	});
	
	var getData = function(){
		Cloud.Posts.query({
		    page: 1,
		    per_page: 20,
		    where: {
		        reviews_count: { '$gt': 1.0 }
		    }
		}, function (e) {
		    if (e.success) {
		        alert('Success:\n' +
		            'Count: ' + e.posts.length);
		        for (var i = 0; i < e.posts.length; i++) {
		            var post = e.posts[i];
		            console.log('id: ' + post.id + '\n' +
		                'id: ' + post.id + '\n' +
		                'title: ' + post.title + '\n' +
		                'content: ' + post.content + '\n' +
		                'updated_at: ' + post.updated_at);
		        }
		    } else {
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	};
	
	var tableView = Ti.UI.createTableView({
		top:50,
		height:450,
		scrollable:true
	});
			
	container.add(logout);
	container.add(tableView);
	container.add(qoutes);
	self.add(container);
	self.addEventListener('open', function(){
		getData();
	});
	
			
	Ti.API.info('======>>>>>> Here quotes view '); 

	return self;
};

module.exports = QuotesView;
