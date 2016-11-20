posttwo.ddd("disableDoubleClick.js has been loaded");

$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    var menu = el.off('dblclick')
});