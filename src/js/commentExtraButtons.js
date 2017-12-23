posttwo.ddd("commentExtraButtons.js has been loaded");
posttwo.requireArrive();

$(document).on("posttwo_newComment", function (event, menu, cid, username) {
    if(username != '')
    {
        posttwo.addModTool('<div onclick="var e = \'' + username + '\';getUserId(e,function(e){usersWithSameIP(e,\'\')});">Users With Same IP</div>', cid);
        posttwo.addModTool('<div onclick="var e = \'' + username + '\';getUserId(e,function(e){banUser(e,\'\')});">Ban User</div>', cid);
    }
});