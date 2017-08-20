posttwo.ddd("oc.js has been loaded");
if (typeof posttwo.oc != 'function')
   posttwo.oc = function(){};

posttwo.oc.createImg = function(id, json){
	var pic = false;
	switch (json.type_name){
		case "youtube":
			pic = "//img.youtube.com/vi/"+json.content_url+"/maxresdefault.jpg";
			break;
		case "text":
			pic = json.thumbnail_url;
			break;
		default:
			pic = json.large_image_url;
	}
	
	return '\
	<div id="image_div' + id + '" class="noFt if2">\
		<img src="'+pic+'" alt="If missing, link this comment to Hunman!" class="cdn_switchable_img av_img boxed5 boxed2" title="I know it doesn\'t enlarge when hover, but too lazy to fix.">\
	</div>\
	';
}

posttwo.oc.saveDetails = function(comment){
	var actions = {
		approvedBy:	[],
		deniedBy:	[],
		actions:	[]
	};

	$(comment).contents().filter(function() {
		return (
			this.nodeType === 3 //Is a text node
			&&
			this.previousSibling && this.nextSibling // Has siblings
			&&
			this.previousSibling.nodeName !== "STRONG" // It's previous sibling is not strong
			&&
			this.nextSibling.nodeName === "A" // But it's next sibling is a link
		);
	}).each(function(){
		switch (this.textContent.trim()[0]){
			case "A":
			case "a":
				actions.approvedBy.push(this.nextSibling.textContent);
				break;
			case "D":
			case "d":
				actions.deniedBy.push(this.nextSibling.textContent);
				break;
			default:
				actions.wutBy.push(this.nextSibling.textContent);
		}
	});
	actions.actions = $(comment).find(".sbtBzttn").detach();
	return actions;
}

posttwo.oc.createTable = function(data, details){
	var table = '<table class="OCtable" border="1">';

	table += '<tr class="uploader"><th>Uploader</th><td class="center"><a href="/user/'+ data.username +'"><img class="avatar" src="' + (data.content_header_avatar_url ? data.content_header_avatar_url : 'https://new2.fjcdn.com/site/funnyjunk/images/def_avatar.gif') + '" alt="Link this comment to Hunman if missing"></a><br><a href="/user/'+ data.username +'"><span class="uName">' + data.username + '</span></a> <span class="cF1 '+ data.content_country_code +'"></span></td></tr>';
	// table += '<tr class="uploader_avatar"><th>Avatar</th><td><a href="/user/'+ data.username +'"></a></td></tr>';
	table += '<tr class="thumbs_total"><th>Total thumbs</th><td><img src="https://new1.fjcdn.com/site/funnyjunk/images/profile_thumbsUp2.gif"> ' + data.stat_thumbs_weight + '</td></tr>'; // It's on this page, so I'm assuming it's thumbs up
	table += '<tr class="content"><th>Content</th><td class="center"><a href="' + data.base_url + '">' + data.title + '</a></td></tr>';
	table += '<tr class="retoast"><th>Reposted?</th><td class="center">' + (data.repost_content_id ? '<strong class="repost" title="Content ID: ' + data.repost_content_id + '">yes</strong>' : 'no') + '</td></tr>';

	table += '<tr class="channel"><th>Channel</th><td class="center">' + (data.channel_id ? ('<a href="' + data.channel_name + '">' + data.channel_name + '</a>') : '<span class="anonUserComm">None</span>') + '</td></tr>';
	table += '<tr class="comments"><th>Comments</th><td class="center">' + data.comments.length + '</td></tr>';	
	
	if (details.approvedBy.length){
		table += '<tr class="approved"><th>Approved by</th><td><ul>';
		$.each(details.approvedBy, function(){
			table += '<li><a href="/user/' + this + '">' + this + '</a></li>';
		});
		table += '</ul></td></tr>';
	}
	
	if (details.deniedBy.length){
		table += '<tr class="denied"><th>Denied by</th><td><ul>';
		$.each(details.deniedBy, function(){
			table += '<li><a href="/user/' + this + '">' + this + '</a></li>';
		});
		table += '</ul></td></tr>';
	}

	if (details.actions.length){
		console.log(details.actions);
		table += '<tr class="actions"><th>Actions</th><td class="center"></td></tr>';
	}

	table += "</table>";
	return table;
}

$(document).on("posttwo_newComment", function (event, menu, cid, username, text, el) {
	var comm = $(event.target);
	if (username == "autosubmit"){
		var contentLink	= comm.find(".t a:not([href^='/user/'])").first().attr("href");
		$.ajax({
			type: "POST",
			url: "https://funnyjunk.com/ms/getByURL/",
			data: {
				isAndroid: "true",
				urlToPost: posttwo.parse_url(contentLink).path
			},
			success: function(data){
				// console.log(data);
				var text = comm.find(".t");
				if (data.success !== undefined){
					text.prepend('<strong class="warning">Content not found</strong><br>');
				}
				else{
					saved = posttwo.oc.saveDetails(text);
					text.text("");
					text.prepend(posttwo.oc.createImg(cid, data));
					text.append(posttwo.oc.createTable(data, saved));
					if (saved.actions){
						saved.actions.appendTo(text.find(".actions td"));
					}
				}
			},
			dataType: "json"
		});
	}
});