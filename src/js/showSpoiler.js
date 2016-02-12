chrome.storage.sync.get({
    showspoilers: false,
	highlightgayponies: false,
	interactivedialog: false,
	forcesidebarshow: false,
	highlightporn: false,
	adminisdumb: false,
	
  }, function(items) {
	if(items.showspoilers)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/spoiler.css") +'">');
	}
	if(items.highlightgayponies)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/gayponies.css") +'">');
	}
	if(items.highlightporn)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/nsfwwarning.css") +'">');
	}
	if(items.interactivedialog)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/interactivedialogs.css") +'">');
	}
	if(items.forcesidebarshow)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/showsidebar.css") +'">');
	}
	if(items.adminisdumb)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/adminisdumb.css") +'">');
	}
  });