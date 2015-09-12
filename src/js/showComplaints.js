chrome.storage.sync.get({
    showcomplaints: false,
  }, function(items) {
	if(items.showcomplaints)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="'+ chrome.extension.getURL("css/complaints.css") +'">');
	}
  });