posttwo.ddd("banRequestsTicker.js has been loaded");
$(document).ready(function(){
	getAwaitingCount();
	setInterval(getAwaitingCount, 50000);
	
	$('#topUserbar').on('click', '#PT_BanRequest', function(){
		getBanRequests();
		return false;
	});
});
function getAwaitingCount()
{
    $.ajax({
        type: "GET",
        url: "https://fjmod.posttwo.pt/banRequest/countAwaiting",
        success: function(html){
            var count = html;
            
            if($('#ban_count').length == 0)
            {
                $('#userbarInfo ul').append( '<li class="forLogged"> <a href="#PT_BanRequest" class="white no_decoration" title="ban" id="PT_BanRequest">Ban ( <span class="green_u" id="ban_count">' + count +'</span> )<div class="delim"></div> </li>' )
            }
            $('#ban_count').text(count);
        }
    });
}
function getBanRequests()
{
	$.ajax({
      type: "GET",
      url: "https://fjmod.posttwo.pt/banRequest/getAllAwaiting",
	  dataType: "json",
      success: function(json){
				var table = '<tr><td>User</td><td>Reason</td><td>From</td><td>Action</td></tr>';
				$.each(json, function() {	
					table += '<tr id="ban-row-'+ this.id +'">';
					table += '<td><a href="/user/'+ this.user_name +'">' + this.user_name + '</a></td>';
					table += '<td>' + this.reason + '</td>';
					table += '<td><a href="/user/'+ this.requester_name +'">' + this.requester_name + '</a></td>';
					table += '<td><button class="DENY" data-requestid="'+ this.id +'">DENY</button><button class="OK" data-requestid="'+ this.id +'">OK</button><button class="BAN" data-requestid="'+ this.id +'" data-userid="' + this.user_id + '">Ban</button></td>';
					table += '</tr>';
				});
                $('<div><table border="1" width="100%" align="center" cellspacing="0">' + table + '</table></div>').dialog({
                closeOnEscape: true,
				resizable: false,
				id: "flashM",
				width: 600,
				position:{ my: "center top", at: "center top", of: "#content" },
				title: 'Ban Requests',
				open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
				buttons: {
					Close: function() {
						$(this).dialog("close")
					},
				}
			}).parent('.ui-dialog').css('zIndex',9999);
			$('.DENY').click(function(){
				console.log('DENY');
				var id = $(this).attr("data-requestid");
				handle(id, 'DENIED');
			})
			$('.OK').click(function(){
				var id = $(this).attr("data-requestid");
				handle(id, 'PERMITTED');
			})
		 $('.BAN').click(function(){
				var id = $(this).attr("data-requestid");
				handle(id, 'PERMITTED');
				banUser($(this).attr("data-userid"));
			}) 
		}
	});
}
function handle(id, type)
{
        $.ajax({
		  type: "POST",
		  url: "https://fjmod.posttwo.pt/banRequest/handle/" + id,
		  data: { resolution: type, token: localStorage.getItem("PT_accessToken") },
		  dataType: "json",
          success: function (html) {
            flashMessage.showSuccess("Thank you for your service");
			$('#ban-row-' + html.id).remove();
		},
		 error: function(html)
		 {
			flashMessage.showError("Unable to comply.");
		 }
		});
}