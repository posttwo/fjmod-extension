posttwo.ddd("showSpoilers.js has been loaded");
posttwo.requireArrive();
$("body").addClass("PT_showSpoilers");
$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    el.find('.spoilerImg').click();
});