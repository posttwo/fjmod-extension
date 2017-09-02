posttwo.ddd("rateBottom.js has been loaded");

// Skin + PC rating go before thumbs
$('#ctInfo').children().first().before('<div class="PT_bottomRate"></div>');
$('#ctInfo').children().last().after('<div class="PT_bottomRate"></div>');
$("#siteContent").children().each(function(index, element){
	if (element.id == 'catControls')
		return false;
	$('.PT_bottomRate').first().append(element);
});

// Category ratings go under thumbs
$('.PT_bottomRate').last().append($("#catControls"));
