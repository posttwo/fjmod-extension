chrome.storage.sync.get({
    showreban: false,
  }, function(items) {
	if( items.showreban && $('#ban_status').is(':visible') )
	{
		$('.contentTitle').first().append('<input type="button" id="ban_user" style="display:inline;" value="Ban this user" class="banuser" onclick="banUser(contentId);">');
		console.log('test');
	}
  });
  