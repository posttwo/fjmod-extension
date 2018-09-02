posttwo.ddd("viewLatestComments.js has been loaded");
//getLatestComments(236155, 1)

$(document).on("posttwo_newComment", function (event, menu, cid, username) {
    if(username != '')
    {
        posttwo.addModTool('<div onclick="getLatestComments(posttwo.getUserId(\'' + username + '\',1));">Latest Comments</div>', cid);
    }
});

var PT_CurrentID = 0;
var PT_CurrentPage = 0;
function getLatestComments(id, page)
{
    PT_CurrentID = id;
    PT_CurrentPage = page;
	$.ajax({
      type: "GET",
      url: "https://funnyjunk.com/base_content/userComment/" + id + "/" + page,
	  dataType: "html",
      success: function (data) {
          getLatestCommentsCallback(data);
		}
	});
}

function getLatestCommentsCallback(data)
{
    var html = $(data);
    html.find('.commentsCounter').remove();
    html.find('.userComExpCol').remove();
    $('<div id="ajax_comm1">' + html.html() + '</div>').dialog({
        closeOnEscape: true,
        resizable: false,
        width: 800,
        position:{ my: "center top", at: "center top", of: "#content" },
        title: 'Latest Comments',
        open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
        buttons: {
            Close: function () {
                $(this).dialog("close")
            },
            Next: function () {
                $(this).dialog("close")
                getLatestComments(PT_CurrentID, PT_CurrentPage + 1);
            },
            Previous: function () {
                $(this).dialog("close")
                getLatestComments(PT_CurrentID, PT_CurrentPage - 1);
            }
        }
    }).parent('.ui-dialog').css('zIndex', 9999);
    
}