posttwo.ddd("disableTextColor.js has been loaded");
var PT_SombraUsers = [];
PT_SombraUsers = posttwo.getStoredArray('DisabledColoredText');

$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    var menu = el.find('.ctBox3');
    var cid = menu.data('aid');
    var username = el.find('.uName').text().trim();
    if(username != ''){
        if ($.inArray(username, PT_SombraUsers) >= 0) {
            posttwo.addModTool('<div onclick="posttwo_enableColors(this)">Enable Colors</div>', cid);
            el.find('.t>span').css('color', 'white');
        } else {
            posttwo.addModTool('<div onclick="posttwo_disableColors(this)">Disable Colors</div>', cid);
        }    
    }
});
function posttwo_enableColors(e)
{
    var PT_CommentUsername = posttwo.getButtonCaller(e);
    PT_SombraUsers.splice($.inArray(PT_CommentUsername, PT_SombraUsers), 1);
    posttwo.storeArray('DisabledColoredText', PT_SombraUsers);
    comments.loadCommentsList();
}
function posttwo_disableColors(e)
{
    var PT_CommentUsername = posttwo.getButtonCaller(e);
    PT_SombraUsers.push(PT_CommentUsername);
    posttwo.storeArray('DisabledColoredText', PT_SombraUsers);
    comments.loadCommentsList();
}