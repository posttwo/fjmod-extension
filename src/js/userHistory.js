posttwo.ddd("userHistory.js has been loaded");
$('.contentTitle:first').append(' <input type="button" class="modBtn" id="PT_View_History" value="History">');
$(document).on("click",'#PT_View_History',function () {
    var userName = $("#profile > div.title > h2 > span").text();
    $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://fjme.me/api/fjuser/modUserByName/" + userName,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('PT_memeToken') },
            success: function(data)
            {
                flashMessage.showSuccess("History request guci gasm");
                
                console.log(data.username);
                var table = '<table border="1">';

                table += '<tr><td>Username</td><td>' + data.username + '</td></tr>';
                table += '<tr><td>UserID</td><td>' + data.userId + '</td></tr>';
                table += '<tr><td>Joined</td><td>' + data.joined + '</td></tr>';
                table += '<tr><td>Last Online</td><td>' + data.last_online + '</td></tr>';
                table += '<tr><td>Contributor</td><td>' + data.contributor_account + '</td></tr>';
                table += '<tr><td>Role</td><td>' + data.role_description + '</td></tr>';
                table += '<tr><td>OC</td><td>' + data.has_oc_item + '</td></tr>';

                table += '</table>';
                table += '<hr /><table border="1">';
                table += '<tr><td>Date</td><td>Reason</td><td>Moderator</td><td>IP Ban</td><td>User Ban</td></tr>';
				$.each(data.ban_history, function(i, v) {	
					table += '<tr>';
					table += '<td>' + v.date + '</td>';
                    table += '<td>' + v.reason + '</td>';
                    table += '<td>' + v.moderator_username + '</td>';
                    table += '<td>' + v.ip_ban_time + '</td>';
                    table += '<td>' + v.user_ban_time + '</td>';
					table += '</tr>';
				});
                table += '</table>';
                var historyDialog = $("<div>").html(table).attr({
                    id: "PT_HistoryDialog"
                })
                historyDialog.dialog({
                    title: "User Query",
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
                flashMessage.showError("History request failed?");
            }    
        }); 
})
