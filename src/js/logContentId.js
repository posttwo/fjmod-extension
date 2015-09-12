window.postMessage({ action: "got_contentId", data: contentId }, "*");
$(document).ajaxSuccess(function(event, xhr, ajaxOptions) {
    /* Method        */ ajaxOptions.type
    /* URL           */ ajaxOptions.url
    /* Response body */ xhr.responseText
    /* Request body  */ ajaxOptions.data
	//console.log('ajaxSuccess! Type: ' + ajaxOptions.type + '\n URL: ' + ajaxOptions.url + '\n Response: ' + xhr.responseText);	
	if(ajaxOptions.url == '/ajax/get_users_with_same_ip/')
		console.log('Moderator accessed users with same IP for ' + location.pathname.split("/")[2])
});