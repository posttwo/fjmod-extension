posttwo.ddd("disableDoubleClick.js has been loaded");

$(document).on("posttwo_newComment", function (event, menu, cid, username) {
    var el = $(event.target);
    var menu = el.off('dblclick')
});