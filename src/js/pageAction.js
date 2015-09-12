chrome.storage.sync.get({
    sidebarupdate: false,
	sidebarreplace: false,
	showspoilers: false,
	showcomplaints: false,
	headercomplaints: false,
	usernotes: false,
	uploadtimehelper: false,
	dragimgurvideo: false
  }, function(items) {
    if(items.sidebarupdate)
	{
		$('.jamie').text('Enabled');
	}
	if(items.sidebarreplace)
	{
		$('.courtney').text('Enabled');
	}
	if(items.showspoilers)
	{
		$('.jeremy').text('Enabled');
	}
	if(items.showcomplaints)
	{
		$('.frank').text('Enabled');
	}
	if(items.headercomplaints)
	{
		$('.jack').text('Enabled');
	}
	if(items.usernotes)
	{
		$('.dork').text('Enabled');
	}
	if(items.uploadtimehelper)
	{
		$('.fag').text('Enabled');
	}
	if(items.dragimgurvideo)
	{
		$('.draggable').text('Enabled');
	}
  });