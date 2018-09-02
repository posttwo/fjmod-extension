posttwo.ddd("first.js has been loaded");

$(document).on("posttwo_newComment", catchTheFaggot);
$(document).on("posttwo_newSideContent", catchTheFaggot);
$(document).on("posttwo_newModComment", catchTheFaggot);

function catchTheFaggot(event, menu, cid, username, text, el){
	var el = $(event.target);

	var fag = el.find("img[alt*='Careful not to close this page']");
	if (fag.length)
		fag.first().closest('.com').addClass('faggot');
}