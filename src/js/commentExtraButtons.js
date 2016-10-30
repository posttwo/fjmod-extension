posttwo.ddd("commentExtraButtons.js has been loaded");
$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    var menu = el.find('.adminButtonMenu');
    var username = el.find('.uName').text().trim();
    if(username != '')
    {
        menu.append('<div onclick="var e = \'' + username + '\';getUserId(e,function(e){usersWithSameIP(e,\'\')});">Users With Same IP</div>');
        menu.append('<div onclick="var e = \'' + username + '\';getUserId(e,function(e){banUser(e,\'\')});">Ban User</div>')
    }
});