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
function addUserNotes(msg, color, user, token)
{
    $.ajax({
      type: "POST",
      url: "https://fjmod.posttwo.pt/notes/post/" + user,
      data: { message: msg, color: color, token: token },
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
    var user = document.getElementById('username').value
    var msg = document.getElementById('msg').value;
    var color = document.getElementById('color').value;
    chrome.storage.sync.get({
        accesstoken: "",
    }, function(items) {
        addUserNotes(msg, color, user, items.accesstoken);
    });
}
);