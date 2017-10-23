var posttwo = new function(){
    this.ddd = function(message, color) {
        console.log("%c PT:%c " + message, 'background: red; color: black; font-weight: bolder;', 'background: white, color: black;');
    };
    this.isEnabled = function (name) {
        var x = localStorage.getItem('PT_' + name);
        if (x == "true")
            return "PT_enabled";
        return "";
    }
    this.getStoredArray = function(name) {
        var z = JSON.parse(localStorage.getItem('PT_ARRAY_' + name));
        if (z != null)
            return z;
        return [];
    }
    this.storeArray = function(name, array) {
        localStorage.setItem("PT_ARRAY_" + name, JSON.stringify(array));
    }
    this.getButtonCaller = function(e) {
        var z = $(e).parent().parent().parent().find('.uName:not(".avaC")').text();
        return z.trim();
    }
    this.notify = new function () {
        originalTitle = document.title;
        interval = null;

        this.on = function(notification)
        {
            interval = setInterval(function () {
                document.title = (originalTitle == document.title)
                    ? notification
                    : originalTitle;
            }, 1000);
        }
        this.off = function()
        {
            clearInterval(interval);
            document.title = originalTitle;
        }
    };
    this.addModTool = function (html, cid) {
        if (typeof commA[cid] === 'undefined')
            return false;    
        commA[cid] = commA[cid].slice(0, -7);
        commA[cid] += html;
        commA[cid] += '</div> ';
    }
	this.flagCommentSpam = function(commentID) {
		$.ajax({
			type: "POST",
			url: "https://funnyjunk.com/ajax/flag_CommentPicture/" + commentID + "/6969",
			data: {flag: "spam", CommentId: commentID, userId: contentId},
			success: function(data){
				posttwo.ddd("Flagged: " + commentID);
				flashMessage.showSuccess("Flagged " + commentID);
			},
			dataType: "html"
		});
	}

    this.contentQuery = function(contentId) {
        $.ajax({
			type: "POST",
			url: "https://funnyjunk.com/ms/getContent/" + contentId,
			data: {isAndroid: "true"},
			success: function(data){
				flashMessage.showSuccess("Thanks Boi");
                var table = '<table border="1">';

                table += '<tr><td>Content ID</td><td>' + data.id + '</td></tr>';
                table += '<tr><td>Visiblity</td><td>' + data.content_visibility + '</td></tr>';
                table += '<tr><td>Down Thumbs</td><td>' + data.counted_thumbs_down + '</td></tr>';
                table += '<tr><td>UP Thumbs</td><td>' + data.counted_thumbs_up + '</td></tr>';
                table += '<tr><td>Posted</td><td>' + data.date + '</td></tr>';
                table += '<tr><td>MD5</td><td>' + data.filemd5hash2 + '</td></tr>';
                table += '<tr><td>Flagged Date</td><td>' + data.flagged_date + '</td></tr>';
                table += '<tr><td>Poster IP</td><td>' + data.ip + '</td></tr>';
                table += '<tr><td>Reposted From</td><td>' + data.repost_content_id + '</td></tr>';
                table += '<tr><td>Displays Ads</td><td>' + data.show_ads + '</td></tr>';
                table += '<tr><td>Visible to Anons</td><td>' + data.visible_to_nonlogged + '</td></tr>';
                table += '<tr><td>Hot Index</td><td>' + data.hot_index + '</td></tr>';
                
                
                table += '</table>';
                var contentQueryDialog = $("<div>").html(table).attr({
                    id: "PT_ContentQuery"
                })
                contentQueryDialog.dialog({
                    title: "Content Query",
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
			dataType: "json"
		});
    }

    this.parse_url = function(url){
        var a   = document.createElement("a");
        a.href  = url;
        return {
            scheme:     a.protocol,
            host:       a.hostname,
            porn:       a.port,
            path:       a.pathname,
            query:      a.search,
            fragment:   a.hash
        };
    }
};
posttwo.ddd("main.js has been loaded");
/* Extension Options */

if (IS_FLAG_MODERATOR == true)
    $('#contentLeft > span:nth-child(3)').replaceWith('<span style="cursor:pointer;color:#5e075b;font: 400 14px Arial, Helvetica, sans-serif;" class="smallLeftMenu" id="PT_menu"><strong>Mod Settings</strong></span>');
else
    $('.comOptionsMenu > .dropdown-menu').append('<span style="cursor:pointer;color:#5e075b;font: 400 14px Arial, Helvetica, sans-serif;" class="smallLeftMenu" id="PT_menu"><strong>Posttwo Settings</strong></span>');

$("#PT_menu").click(function () {
    
    posttwo.ddd("Menu has been opened");

    /* <BR> <BR> MOTHERFUCKER */
    var menuDialog = $.extend($('<div id="PT_SettingsForm">'), {
        addOption: function (name, humanName, modOnly) {
            if((modOnly && IS_FLAG_MODERATOR) || !modOnly)
                menuDialog.append('<div class="addCommentLink PT_Toggle ' + posttwo.isEnabled(name) + '" data-name="' + name + '">' + humanName +'</div>');
        },
        addInput: function (name, humanName, modOnly) {
            if((modOnly && IS_FLAG_MODERATOR) || !modOnly)
                menuDialog.append("<br />" + humanName + ': <input data-name="' + name +'" type="text" class="txt PT_Input" id="privMsgSubject" value="' + localStorage.getItem('PT_' + name) +'">')
        }
    })
    menuDialog.addOption('showSpoilers', 'Show Spoilers');
    menuDialog.addOption('banRequestsForm', 'Ban Requests', true);
    menuDialog.addOption('banRequestsTicker', 'Ban Request Ticker', true);
    menuDialog.addOption('userNotes', 'User Notes', true);
    menuDialog.addOption('sideBarReplacement', 'Replace Sidebar', true);
    menuDialog.addOption('showComplaints', 'Show Complaints Ticker', true);
    menuDialog.addOption('commentExtraButtons', 'Extra Buttons on Comments', true);
    //menuDialog.addOption('removeUselessButtons', 'Remove Useless Buttons', true);
    menuDialog.addOption('addQuickMentions', 'Quick Mentions', true);
    menuDialog.addOption('newCommentAlert', 'Alert on AutoRefresh', true);
    menuDialog.addOption('hideFlaggedContent', 'Hide Flagged Content', true);
    menuDialog.addOption('disableDoubleClick', 'Disable Double Click');
    //menuDialog.addOption('redirectCancer', 'Redirect Cancer');
    menuDialog.addOption('disableAutoplay', 'Disable Autoplay');
    menuDialog.addOption('disableTextColor', 'Disable Colored Text', true);
    menuDialog.addOption('disableCustomCSS', 'Disable Custom CSS');
    menuDialog.addOption('viewLatestComments', 'Latest Comments', true);
	menuDialog.addOption('flagAllUserComments', 'Flag All By User', true);
    menuDialog.addOption('fuckRainbows', 'Disable Rainbow Text');
    menuDialog.addOption('rateBottom', 'Move Ratings To Bottom', true);
    menuDialog.addOption('djTools', 'DJ Tools');
    menuDialog.addOption('djToolsPlus', 'Easy DJ replacer', true);
    menuDialog.addOption('first', 'Faggot Catcher', true);
    menuDialog.addOption('userHistory', 'User History', true);
    menuDialog.addOption('verboseContent', 'Verbose Content', true);
    menuDialog.addOption('discordResolver', 'Discord Resolver', true);
    menuDialog.addOption('disableBlurHandlers', 'Disable Blur Handlers');
    menuDialog.addOption('sfwRatingsAlert', 'Unrated SFW Alerts');
    menuDialog.addOption('oc', 'Enhanced OC');
    menuDialog.addOption('stringFlag', 'Comment String Flag');
    menuDialog.append('<br />');
    menuDialog.addInput('accessToken', 'Access Token', true);
    menuDialog.addInput('memeToken', 'Meme Token', true);

    menuDialog.append("<br /><a href='https://github.com/posttwo/fjmod-extension/issues/new'> Report An Issue</a> | <a href='https://fjmod.posttwo.pt/token'>Token Recovery</a> | <a href=\"#\" onclick=\"sessionRefresh();\">Clear cookies</a></div>");
    if (posttwo.isEnabled("viewLatestComments"))
    {
        menuDialog.append("<br /><br /><button onclick='getLatestComments(236155, 1)'> Admins Comments</button>");
    }    
    menuDialog.dialog({
        title: "Edit Moderator Settings",
        closeOnEscape: true,
        resizable: false,
        width: 600,
        minHeight: 450,
        buttons: {
            Reload: function () {
                location.reload();
                return false
            },
            Close: function () {
                $(this).dialog("close")
            }
        }
    }).parent().attr("id", "setboxthing");
    $("div.ui-draggable").css("overflow", "visible")

    $("#PT_SettingsForm .PT_Toggle").click(function () {
        var permissionName = 'PT_';
        var permissionName = permissionName + $(this).data('name');
        var current = localStorage.getItem(permissionName);
        if (current == "true") {
            localStorage.setItem(permissionName, 'false');
            $(this).toggleClass("PT_enabled", false);
        }
        else {
            localStorage.setItem(permissionName, 'true');
            $(this).toggleClass("PT_enabled", true);
        }
        flashMessage.showSuccess("Setting " + $(this).text() + " has been updated.");
    });
    $("#PT_SettingsForm .PT_Input").keyup(function () {
        var permissionName = 'PT_';
        var permissionName = permissionName + $(this).data('name');
        var current = localStorage.getItem(permissionName);
        localStorage.setItem(permissionName, $(this).val());
    })
});

//Event Listeners
$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    var menu = el.find('.ctBox3');
    var cid = menu.data('aid');
    var username = el.find('.uName').text().trim();
    var text = el.find('.t').text();
    var element = el;
    $(this).trigger('posttwo_newComment', [menu, cid, username, text, el]);    
});

$('#ajax_mod_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    var menu = el.find('.ctBox3');
    var cid = menu.data('aid');
    var username = el.find('.uName').text().trim();
    var text = el.find('.t').text();
    var element = el;
    $(this).trigger('posttwo_newModComment', [menu, cid, username, text, el]);    
});
