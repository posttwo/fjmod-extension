posttwo.ddd("commentExtraButtons.js has been loaded");
posttwo.requireArrive();

$(document).on("posttwo_newComment", function (event, menu, cid, username) {
    if(username != '')
    {
        posttwo.addModTool('<div onclick="usersWithSameIP(posttwo.getUserId(\'' + username + '\'));">Users With Same IP</div>', cid);
        posttwo.addModTool('<div onclick="banUser(posttwo.getUserId(\'' + username + '\'));">Ban User</div>', cid);
    }
});