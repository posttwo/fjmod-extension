posttwo.ddd("stringFlag.js has been loaded");
posttwo.stringFlag = function(){};
$('.comOptionsMenu > .dropdown-menu').append('<span style="cursor:pointer;color:#5e075b;font: 400 14px Arial, Helvetica, sans-serif;" class="smallLeftMenu" id="PT_MasterFlag" onclick="posttwo.stringFlag.currentPage()"><strong>String Flag</strong></span>');

posttwo.stringFlag.currentPage = function(){
    var string = prompt("Insert Search String");
    posttwo.ddd("String Flag "+ string);


    var menuDialog = $.extend($('<div id="PT_MassFlagForm">'), {
		addComment: function (url, commentID, text) {
            menuDialog.append('<div class="comm">' + text + '<br/><small>@<a href="' + url + '">'+ url +'</a></small></div>');
        },
    });

    var comments = $.map($(".com"), function(li) {
        if($(li).find('.t:contains("'+ string +'")').length != 0){
            console.log("true");
            return $(li);
        }
	});
	var commentIDs = $.map(comments, function(li) {
		return $(li).attr("id").slice(2);
	});
	var texts = $.map(comments, function(li) {
		return $(li).find('.t').text();
    });
    var urls = $.map(comments, function(li) {
		return $(li).find('.commentNumber').attr('href');
    });

    $.each(comments, function(index, value){
		menuDialog.addComment(urls[index], commentIDs[index], texts[index]);
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
					posttwo.ddd("\tGetting: " + commentIDs[index]);
					posttwo.flagCommentSpam(commentIDs[index]);
				});
				posttwo.ddd('Mass flagging comments ended');
				$(this).dialog("close");
            },
        }
    }).parent().attr("id", "setboxthing");
    $("div.ui-draggable").css("overflow", "visible")
}