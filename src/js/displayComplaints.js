function getComplaints()
{
	$.ajax({
		type:"GET",
		url: "/sfw_mod/complaints/10/1/-24",
		success: function(html){
			var $response=$(html);
			var test = $response.find('.currentStatus[rel^=0]').size();
			if($('#complaints_count').size() == 0)
			{
				$('#userbarInfo ul').append( '<li class="forLogged"> <a href="/sfw_mod/complaints/" class="white no_decoration" title="complaints" id="complaints">Complaints ( <span class="green_u" id="complaints_count">0</span> )<div class="delim"></div> </li>' )
			}
			$('#complaints_count').text(test);
			if($('#complaints_count').text() > 0)
			{
				$('#complaints_count').toggleClass('green_u');
				$('#complaints_count').toggleClass('pink_u');
			}
			console.log("Got Complaints")
		}
	});
}
chrome.storage.sync.get({
    headercomplaints: false,
  }, function(items) {
	if(items.headercomplaints)
	{
		getComplaints();
		setInterval(getComplaints, 50000);
	}
  });