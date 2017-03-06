posttwo.ddd("rateBottom.js has been loaded");

// Skin + PC rating go before thumbs
$('#ctInfo').children().first().before('<div style="display: inline-block; text-align: left;"></div>');
$("#siteContent").children().each(function(index, element){
	if (element.id == 'catControls')
		return false;
	$('#ctInfo').children().first().append(element);
});

// Category ratings go under thumbs
$('#ctDetails').after($('#catControls'));
$('#catControls').css('margin-bottom', '6px');
