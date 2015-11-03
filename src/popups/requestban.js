function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function getModList(){
	return $.ajax({
		type: "GET",
		url: "https://funnyjunk.com/comment/anonymous/content/5101341/-999/checked/parent_id/undefined/1/desc/125719964"
	});
}

function requestUserBan(msg, user, activeMods)
{
	console.log(activeMods);
    $.ajax({
      type: "POST",
      url: "https://funnyjunk.com/comment/add/content/4878704",
      data: { mainid: 12, contentId: 4878704, replyCommentId: 140267626, do:"comment", username:"anonymous", text: "**Requesting Ban For: ** https://www.funnyjunk.com/user/" + user + "\n **Reason: ** " + msg + "\n **Mentions: **[spoiler]" + activeMods.join(", ") + "[/spoiler] \n Please reply to this comment once you've banned the requested user"},
      success: function(html){
        console.log('added note');
        window.close();
    },
	error: function(html){
		alert('It did not post');
		window.close();
	}
});
}
var user = getUrlParameter('user');
document.getElementById('username').value = user;
$("#submitter").click( function()
{
    var user = document.getElementById('username').value
    var msg = document.getElementById('msg').value;
	getModList().done(function(data){
			var activeMods = $(".adminComment > span", data).contents().eq(1).text();
			var arrayOfActiveMods = activeMods.split(", ");
			var arrayOfBannableMods = ['joshlol', 'corporate', 'EdwardNigma', 'lightarcanine', 'lucky', 'Marker', 'Pleinair', 'postingloudly', 'tridaak', 'yojo', 'admin'];
			var arrayOfActiveBannableMods = arrayOfActiveMods.filter(function(n) {
								return arrayOfBannableMods.indexOf(n) != -1
							});
			requestUserBan(msg, user, arrayOfActiveBannableMods);
	});
}
);