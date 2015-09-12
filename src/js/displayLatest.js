chrome.extension.sendMessage({action: "notify_load"}, function(response) { console.log('notify_load respone received'); });
function displayLatest()
{
	$.get( "/sfw_mod/contents/10/1/-1000", function( data ) {
	  $("#contentLeft>.c:first").ready(function() {
		$( "#contentLeft>.c:first" ).html( data );
		console.log('Upadted Header');
		});	
	});
}
chrome.storage.sync.get({
    sidebarupdate: false,
	sidebarreplace: false
  }, function(items) {
	if(items.sidebarreplace)
	{
		displayLatest();
	}
    if(items.sidebarupdate && items.sidebarreplace)
	{
		setInterval(displayLatest, 10000);
	}
  });