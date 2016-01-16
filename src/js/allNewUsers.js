chrome.storage.sync.get({
    shownewuseripbutotn: false,
  }, function(items) {
	if(items.shownewuseripbutotn)
	{
		$('#ajax_mod_comm .uName').after(' <div class="sbtBzttn"><input type="button" value="IP" class="modToolsPT" onclick=\'var e=$(this).parent().siblings(".uName").text();getUserId(e,function(e){usersWithSameIP(e,"")})\' id="userWithSameIPPT" /></div>');
	
	  chrome.runtime.onMessage.addListener(
		  function(request, sender, sendResponse) {
			if(request.action == "new_user_reload")
			{
				$('#ajax_mod_comm .uName').after(' <div class="sbtBzttn"><input type="button" value="IP" class="modToolsPT" onclick=\'var e=$(this).parent().siblings(".uName").text();getUserId(e,function(e){usersWithSameIP(e,"")})\' id="userWithSameIPPT" /></div>');
				$('#ajax_mod_comm .uName').after(' <div class="sbtBzttn"><input type="button" value="Ban" class="modToolsPT" onclick=\'var e=$(this).parent().siblings(".uName").text();getUserId(e,function(e){banUser(e,"")})\' id="banUserPT" /></div>');

			}
		});
	}
  });