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
	var x = $.ajax({
		type: "GET",
		url: "https://funnyjunk.com/ajax/getOnlineModList",
		async: false,
	}).responseText;
	var x = JSON.parse(x);
	var tomato = '';
	$.each(x, function(i, item){
		tomato = tomato + ' ' + x[i].username;
	});
	return tomato;
}

function getUserId(username){
	return $.ajax({
        url: 'https://funnyjunk.com/ajax/getUserId',
        data: {username: username},
		async: false,
		method: "POST",
    }).responseText;
	//https://funnyjunk.com/ajax/getUserId
}

function requestUserBan(msg, username, user_id, token)
{
	$.ajax({
      type: "POST",
      url: "https://fjmod.posttwo.pt/banRequest/request",
      data: { user_id: user_id, user_name: username, reason: msg, token: token },
      success: function(html){
        console.log('added note');
        window.close();
    }
});
}
var user = getUrlParameter('user');
document.getElementById('username').value = user;
$("#submitter").click( function()
{
    var user_name = document.getElementById('username').value
    var msg = document.getElementById('msg').value;
	var user_id = getUserId(user_name);
	chrome.storage.sync.get({
        accesstoken: "",
    }, function(items) {
        requestUserBan(msg, user_name, user_id, items.accesstoken);
    });
}
);