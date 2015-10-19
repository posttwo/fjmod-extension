chrome.storage.sync.get({
    showspoilers: false,
	highlightgayponies: false,
	interactivedialog: false
  }, function(items) {
	if(items.showspoilers)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/spoiler.css") +'">');
	}
	if(items.highlightgayponies)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/gayponies.css") +'">');
	}
	if(items.interactivedialog)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/interactivedialogs.css") +'">');
	}
  });