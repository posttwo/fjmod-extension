$(document).ready(function(){
	console.log('PE');
	getAwaitingCount();
	setInterval(getAwaitingCount, 50000);
	
	$('#topUserbar').on('click', '#banana', function(){
		getBanRequests();
		return false;
	});
});

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
					table += '<td><button class="DENY" data-requestid="'+ this.id +'">DENY</button><button class="OK" data-requestid="'+ this.id +'">OK</button></td>';
					table += '</tr>';
				});
				$('<div><table border="1" width="100%" align="center" cellspacing="0">'+ table +'</table></div>').dialog({
				modal: true,
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
		}
	});
}

function handle(id, type)
{
	chrome.storage.sync.get({
        accesstoken: "",
    }, function(items) {
		console.log('test');
        $.ajax({
		  type: "POST",
		  url: "https://fjmod.posttwo.pt/banRequest/handle/" + id,
		  data: { resolution: type, token: items.accesstoken },
		  dataType: "json",
		  success: function(html){
			  console.log(html.id);
			$('#ban-row-' + html.id).remove();
		},
		 error: function(html)
		 {
			console.log(html.id);
			$('#ban-row-' + html.id).remove();
		 }
		});
    });
}
function getAwaitingCount()
{
	console.log('PEN');
	$.ajax({
      type: "GET",
      url: "https://fjmod.posttwo.pt/banRequest/countAwaiting",
      success: function(html){
		var count = html;
		
		if($('#ban_count').size() == 0)
		{
			$('#userbarInfo ul').append( '<li class="forLogged"> <a href="#banana" class="white no_decoration" title="ban" id="banana">Ban ( <span class="green_u" id="ban_count">' + count +'</span> )<div class="delim"></div> </li>' )
		}
		$('#ban_count').text(count);
    }
});
}