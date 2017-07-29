posttwo.ddd("flagAllComments.js has been loaded");

var place = $('#userCommentsList > .title > h2');
if (!place.length)
	place = $('.contentTitle:first');

place.append(' <input type="button" class="modBtn" id="PT_Flag_All_Button" value="Mass flag comments">');


//Get all comments visible
$('#PT_Flag_All_Button').click(function(){
	posttwo.ddd('Mass flag button pressed');
	var menuDialog = $.extend($('<div id="PT_MassFlagForm">'), {
		addComment: function (url, commentID, text) {
            menuDialog.append('<div class="comm">' + text + '<br/><small>@<a href="' + url + '">'+ url +'</a></small></div>');
        },
    });

	var comments = $.map($(".cl_tx a"), function(li) {
		return $(li).attr("href");
	});
	var commentIDs = $.map($(".cl_tx a"), function(li) {
		return $(li).find('span').text();
	});
	var texts = $.map($(".cl_tx a"), function(li) {
		return $(li).find('span').parent().clone().children().remove().end().text().substring(3);
	});


	$.each(comments, function(index, value){
		menuDialog.addComment(comments[index], commentIDs[index], texts[index]);
	});

    menuDialog.dialog({
        title: "Are you sure you want to flag the following comments?",
        closeOnEscape: true,
        resizable: false,
        width: 600,
        minHeight: 450,
        buttons: {
            "Maybe not": function () {
                $(this).dialog("close");
            },
            "Purge 'em": function () {
                posttwo.ddd('Mass flagging comments begins');
				$.each(comments, function(index, value) {
					posttwo.ddd("\tGetting: " + value);
					$.ajax({
						url:"https://funnyjunk.com" + value,
						type:'GET',
						success: function(data){
						   var x = $(data).find('a' + commentIDs[index]).parent().find('.ctBox3').attr('data-aid')
						   posttwo.ddd("\tFlagging: " + x);
						   posttwo.flagCommentSpam(x);
						}
					});
				});
				posttwo.ddd('Mass flagging comments ended');
				$(this).dialog("close");
            },
        }
    }).parent().attr("id", "setboxthing");
    $("div.ui-draggable").css("overflow", "visible")
});

//$('a#89').parent().find('.ctBox3').attr('data-aid')