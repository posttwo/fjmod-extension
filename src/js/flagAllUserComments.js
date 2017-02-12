posttwo.ddd("flagAllComments.js has been loaded");
$('.contentTitle:first').append('<div class="sbtBzttn"><input type="button" class="modBtn" id="PT_Flag_All_Button" style="display:inline;" value="Flag Comments Page"></div>');
//Get all comments visible
$('#PT_Flag_All_Button').click(function(){
	var comments = $.map($(".cl_tx a"), function(li) {
		return $(li).attr("href");
	});
	var commentIDs = $.map($(".cl_tx a"), function(li) {
		return $(li).find('span').text();
	});
	$.each(comments, function(index, value) {
		posttwo.ddd("Getting :" + value);
		$.ajax({
			url:"https://funnyjunk.com" + value,
			type:'GET',
			success: function(data){
			   var x = $(data).find('a' + commentIDs[index]).parent().find('.ctBox3').attr('data-aid')
			   posttwo.ddd("Flagging: "+x);
			   posttwo.flagCommentSpam(x);
			}
		});
	});
});
//$('a#89').parent().find('.ctBox3').attr('data-aid')