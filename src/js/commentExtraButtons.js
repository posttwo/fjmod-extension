posttwo.ddd("commentExtraButtons.js has been loaded");
$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    var menu = el.find('.myButtonMenu');
    var cid = menu.data('cid');
    var username = el.find('.uName').text().trim();
    if(username != '')
    {
        posttwo.addModTool('<div onclick="var e = \'' + username + '\';getUserId(e,function(e){usersWithSameIP(e,\'\')});">Users With Same IP</div>', cid);
        posttwo.addModTool('<div onclick="var e = \'' + username + '\';getUserId(e,function(e){banUser(e,\'\')});">Ban User</div>', cid);
    }
});