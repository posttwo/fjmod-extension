chrome.extension.sendMessage({action: "notify_load"}, function(response) { console.log('notify_load respone received'); });
function displayLatest()
{
	$.get( "/sfw_mod/contents/10/1/-1000", function( data ) {
	  $("#tUploads>.smallLeftNav:first").ready(function() {
		$( "#tUploads>.smallLeftNav:first" ).html( data );
		console.log('Upadted Header');
		userTicker();
		});	
	});
}
 
 function userTicker()
 {
	$.ajax({
		type:"GET",
		url: "/newusers/10/1/-24",
		success: function(html){
			var $response=$(html);
			var test = $response.find('.uName').first();
			$('.tickerPacker').remove();
			$('#userbarInfo ul').append( '<li class="forLogged tickerPacker"> <a href="/user/'+ test.html() +'" class="white no_decoration" title="ticker" id="ticker">' + test.html() +'</a><div class="sbtBzttn"><input type="button" value="IP" class="modToolsPT" style="width: 25px; height: 16px; font-size: 10px; padding: 0px 0px;" onclick=\'var e=$("#ticker").text();getUserId(e,function(e){usersWithSameIP(e,"")})\' id="userWithSameIPPT" /></div><div class="delim"></div> </li>' )
		}
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