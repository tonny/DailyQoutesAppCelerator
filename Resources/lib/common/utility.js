exports.alertMsg = function (title, msg) {
    var message = Ti.UI.createAlertDialog({
            message: msg,
            buttonNames: ['Ok'],
            title: title
    });
    message.show();
};