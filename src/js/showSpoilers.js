posttwo.ddd("showSpoilers.js has been loaded");
$("body").addClass("PT_showSpoilers");
$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    el.find('.spoilerImg').click();
});