chrome.extension.sendMessage({action: "notify_load"}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		//console.log("%c PT_AUTH OK. READ_WRITE_10", 'color: green');
		
		var s = document.createElement('script');
		// TODO: add "script.js" to web_accessible_resources in manifest.json
		s.src = chrome.extension.getURL('src/js/displayLatest.js');
		s.onload = function() {
			this.parentNode.removeChild(this);
		};
		(document.head||document.documentElement).appendChild(s);
		// ----------------------------------------------------------
		// Pass any messages to background
		window.addEventListener("message", function(event) {
			console.log("Received Window : " + event.data.action);
			chrome.runtime.sendMessage(event.data, function(response) {
				console.log('Message Sent To Background. Response Received.');
			});
		}, false);
		console.log('EOL');
	}
	}, 10);
});