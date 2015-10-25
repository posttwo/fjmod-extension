	  console.log('DICKS');
chrome.runtime.onInstalled.addListener(function(details) {
  if(details.reason == "install" || true){
	//chrome.windows.create({url: "/src/options/index.html", type: "popup"});
  }
  registerGCM();
});


var lastNotificationTab = {};

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log('%c Received ChromeMessage: ' + request.action, 'color: green');
	if(request.action == "notify_load")
	{
		chrome.pageAction.show(sender.tab.id);
		sendResponse();
	}
	if(request.action == "notify_load_imgur")
	{
		chrome.pageAction.show(sender.tab.id);
		sendResponse();
	}
	if(request.action == 'got_contentId')
	{
		console.log('Received got_contentId');
		console.log(request.data);
		sendResponse();
	}
	if(request.action == 'got_notification')
	{
		request.data.alert.forEach(function(noti)
		{
			console.log('running notification')
			var title = noti.t.replace(/<(?:.|\n)*?>/gm, '');
			var text = noti.tx.replace(/<(?:.|\n)*?>/gm, '');
			var guid = guidGenerator();
			//lastNotificationTab = request.data.alert[0].t.match(/href="([^"]*)/)[1];
			var td = noti.t.match(/href="([^"]*)/g)[1];
			lastNotificationTab["ALERT-" + guid] = td.match(/href="([^"]*)/)[1];
			var options = {
			  type: "basic",
			  title: title,
			  message: text,
			  iconUrl: "/icons/fj128.png"
			}
			chrome.notifications.create("ALERT-" + guid, options);
		});
		sendResponse();
	}
	if(request.action == 'addnote')
	{
		 chrome.tabs.create({
            url: chrome.extension.getURL('/src/popups/addnotes.html?user=' + request.user),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,
                height: 300,
                width: 300
                // incognito, top, left, ...
            });
        });
		sendResponse('thanks');
	}
	if(request.action == 'request_user_ban')
	{
		 chrome.tabs.create({
            url: chrome.extension.getURL('/src/popups/requestban.html?user=' + request.user),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,
                height: 300,
                width: 300
                // incognito, top, left, ...
            });
        });
		sendResponse('thanks');
	}
  });
  
  chrome.notifications.onClicked.addListener(function(notificationId){

	  var url = lastNotificationTab[notificationId];;
	  if (url.substring(0, 4) != "http") {
		  url = "https://funnyjunk.com" + url;  //@TODO MAKE IT FJ2 COMPATIBLE
	  }
	chrome.tabs.create({url: url});
  })

/*chrome.webRequest.onBeforeRequest.addListener(
  function() {
	  console.log('%c[PATCH] STOPPED REQUEST TO THUMBNAIL', 'background: yellow');
      return {cancel: true};
  },
  {
      urls: ["*://*.fjcdn.com/thumbnails//*"]
  },
  ["blocking"]
);

/*chrome.webRequest.onBeforeRequest.addListener(function (details) {
	var newUrl = details.url.replace('/thumbnails//', '/thumbnails/comments/');
        return {
            redirectUrl: newUrl
        };
}, {
    urls: ["*://*.fjcdn.com/thumbnails//*"] /* List of URL's
}, ["blocking"]); // Block intercepted requests until this handler has finished*/

chrome.webRequest.onCompleted.addListener(
    function(details) {
		chrome.storage.local.set({commentReloaded: Date.now()});
		if(details.url != 'https://funnyjunk.com/comment/anonymous/content/5101341/-999/checked/parent_id/undefined/1/desc/125719964')
			chrome.tabs.sendMessage(details.tabId, {'action': 'comment_reload'});
    },
    {urls: ["*://*.funnyjunk.com/comment/anonymous/content/*"]}
);

chrome.webRequest.onCompleted.addListener(
    function(details) {
		console.log('new user');
        chrome.tabs.sendMessage(details.tabId, {'action': 'new_user_reload'});
    },
    {urls: ["*://*.funnyjunk.com/newusers/*"]}
);

//CLOUD MESSAGING

function registerCallback(registrationId) {
	console.log('REGISTERD: ' + registrationId);
	chrome.storage.local.set({registrationId: registrationId});
	chrome.storage.local.set({registered: true});
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }

  // Send the registration token to your application server.
  sendRegistrationId(registrationId);
}

function sendRegistrationId(registrationId) {
   chrome.storage.sync.get({
	accesstoken: ""
 }, function(items) {
 	if(items.accesstoken)
 	{
 		$.ajax({
 		type:"POST",
 		dataType: "json",
 		url: "https://fjmod.posttwo.pt/setGCM",
		data: {token: items.accesstoken, gcm: registrationId},
 		success: function(html){
 			console.log('SUCCESS SENT');
 		},
		error: function(html){
			console.log('FAILED SENT');
		}
 	});
 	}
 });
}
function registerGCM(){
	console.log('CHECKING');
    chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
	{
	  console.log('EXISTING' + result);
      return;
	}
	console.log('REGISTERING');
    // Up to 100 senders are allowed.
    var senderIds = ["252944155813"];
    chrome.gcm.register(senderIds, registerCallback);
  });
}
chrome.runtime.onStartup.addListener(function() {
	registerGCM();
});

chrome.gcm.onMessage.addListener(function(message) {
	chrome.storage.local.get("commentReloaded", function(result) {
		console.log('MESSAGE: ' + message.data.title + result["commentReloaded"] + ' VS ' + Date.now());
		var options = {
		  type: "basic",
		  title: message.data.title,
		  message: message.data.message,
		  iconUrl: "/icons/fj128.png"
		}
	  chrome.notifications.create(null, options);
	});
});