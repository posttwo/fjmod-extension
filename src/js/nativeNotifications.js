  $( document ).ajaxComplete(function( event, xhr, settings ) {
	if(settings.url === "/userbar/getnewdata/?ss=1&st=1&lm=0&cpm=0&abm=0")
	{
		var poop = JSON.parse(xhr.responseText);
		//console.log(poop);
		if(poop.alert[0])
			window.postMessage({ action: "got_notification", data: poop }, "*");
	}
  });