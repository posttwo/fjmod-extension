posttwo.ddd("showComplaints.js has been loaded");
posttwo.complaints = function(){};

$('#userbarInfo ul').append( '<li class="forLogged"> <a href="/sfw_mod/complaints/" class="white no_decoration" title="complaints" id="complaints">Complaints ( <span class="green_u" id="complaints_count">0</span> )<div class="delim"></div> </li>' )
posttwo.complaints.getComplaints = function()
{
	$.ajax({
		type:"GET",
		url: "/sfw_mod/complaints/10/1/-24",
		success: function(html){
			var $response=$(html);
			var test = $response.find('.currentStatus[rel^=0]').length;
			$('#complaints_count').text(test);
		}
	});
}
posttwo.complaints.getComplaints();
setInterval(posttwo.complaints.getComplaints, 50000);