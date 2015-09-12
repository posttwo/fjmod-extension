var url = window.location.href;
 	url = url.split("/");
 	var user = url[4];
 function getUserNotes(accesstoken){
 	$.ajax({
 		type:"POST",
 		dataType: "json",
 		url: "https://fjmod.posttwo.pt/notes/get/" + user,
		data: {token: accesstoken},
 		success: function(html){
 			$(document).ready(function(){
 				$('#profileInfo > tbody').prepend('<tr> <td class="profileLegend" id="notesbuttoner"><span style="font-size:9px; color:red;">Add</span> Notes:</td> <td style="color:#C8C8C8; font-weight: bold;width:99%" id=""> <div style="text-align: left;" class="inner" id="usernotes"><table id="user_notes"></table></div> </td> </tr>');
 				$.each (html, function (bb) {
 					$('#user_notes').append('<tr style="color: ' + html[bb].color + '"><td>' + html[bb].message +  '</td><td>' + html[bb].updated_at + '</td><td>' + html[bb].added_by +'</td></tr>');
 				});
 				$("#notesbuttoner").click( function()
		           {
		             chrome.runtime.sendMessage({action: 'addnote', user: user}, function(response) {
							console.log(response);
						});
		           }
		      );
 			});
 		},
		error: function(html){
			$(document).ready(function(){
 				$('#profileInfo > tbody').prepend('<tr> <td class="profileLegend" id="notesbuttoner">Notes:</td> <td style="color:#C8C8C8; font-weight: bold;width:99%" id=""> <div style="text-align: left;" class="inner" id="usernotes"><table id="user_notes"></table></div> </td> </tr>');
 				$('#user_notes').append('<tr style="color: ' + "red" + '; background-color: yellow;"><td>' + "[!] Youre not authorised to view this function. If youre a mod please contact posttwo for an access token else disable this feature." +  '</td></tr>');
 			});
		}
 	});
 }
 chrome.storage.sync.get({
 	usernotes: false,
	accesstoken: ""
 }, function(items) {
 	if(items.usernotes)
 	{
 		getUserNotes(items.accesstoken);
 	}
 });