$(document).ready(function(){
	$('.contentTitle').first().append('<input type="button" id="request_user_ban" style="display:inline" value="Request Ban" class="modBtn">');
	$("#request_user_ban").click( function()
	{
		var url = window.location.href;
		url = url.split("/");
		var user = url[4];
		chrome.runtime.sendMessage({action: 'request_user_ban', user: user}, function(response) {
			console.log(response);
		});
	});
});