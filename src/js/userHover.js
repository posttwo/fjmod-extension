chrome.storage.sync.get({
    hovereffect: false,
  }, function(items) {
	  if(items.hovereffect)
	  {
		function addHover(){
		$(".uName").qtip({
			  content: {
					text: function(event, api) {
						$.ajax({
							url: api.elements.target.attr('href') // Use href attribute as URL
						})
						.then(function(content) {
							content = content.replace(/<img\b[^>]*>/ig, '');
							profile = $(content).find('#profileInfo');
							signedUp = $(profile).find('td:contains("Date Signed Up:")').siblings().html();
							
							profileLeft = $(content).find('#profileAvatar');
							userLevel = $(profileLeft).find('.permissionsLink').children().html();
							data = "Signed Up: <strong>" + signedUp + "</strong><br />" + userLevel;
							api.set('content.text', data);
						}, function(xhr, status, error) {
							// Upon failure... set the tooltip content to error
							api.set('content.text', status + ': ' + error);
						});
			
						return 'Loading...'; // Set some initial text
					}
				},
				 show: {
					 solo: true
				 },
				 hide: {
					 fixed: true,
					 delay: 1000
				 }
			 });
		}
		addHover();

			 
			 
			  chrome.runtime.onMessage.addListener(
			  function(request, sender, sendResponse) {
				if(request.action == "comment_reload")
				{
					addHover();
				}
		});
	  }
});