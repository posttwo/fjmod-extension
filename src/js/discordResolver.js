posttwo.ddd("discordResolver.js has been loaded");
$('.contentTitle:first').append('<div class="sbtBzttn"><input type="button" onclick="posttwo.discordResolver.getDiscordById(contentId)" class="modBtn" id="PT_Discord_Resolve" style="display:inline;" value="Discord Resolve"></div>');
posttwo.discordResolver = function(){};

posttwo.discordResolver.getDiscordById =  function(contentId)
 {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://fjme.me/api/fjuser/discordByID/" + contentId,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('PT_memeToken') },
        success: function(data){
            flashMessage.showSuccess("Discord resolved!");
            var table = '<table border="1">';
            table += '<tr><td>Nickname</td><td>Meme ID</td><td>Discord ID</td><td>Verify Date</td></tr>';
            $.each(data, function(i, v) {	
					table += '<tr>';
					table += '<td>' + v.nickname + '</td>';
                    table += '<td>' + v.id + '</td>';
                    table += '<td>' + v.discord_id + '</td>';
                    table += '<td>' + v.created_at + '</td>';
					table += '</tr>';
				});
            table += '</table>';
            var resolverDialog = $("<div>").html(table).attr({
                    id: "PT_ResolverDialog"
                })
            resolverDialog.dialog({
                title: "Discord Query",
                closeOnEscape: true,
                resizable: true,
                width: 'auto',
                minHeight: 0,
                buttons: {
                    Close: function () {
                        $(this).dialog("close")
                    }
                }
            }).parent().attr("id", "setboxthing");
            $("div.ui-draggable").css("overflow", "visible")
        },
        error: function (data)
        {
            flashMessage.showError("Could not resolve user");
        }    
    }); 
}