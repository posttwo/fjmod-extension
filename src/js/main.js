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
    menuDialog.addOption('disableTextColor', 'Disable Colored Text', true);
    //menuDialog.addOption('redirectCancer', 'Redirect Cancer');
    menuDialog.addOption('disableAutoplay', 'Disable Autoplay');
    menuDialog.addOption('disableCustomCSS', 'Fuck Secretzx');
    menuDialog.addOption('viewLatestComments', 'Latest Comments', true);
	menuDialog.addOption('flagAllUserComments', 'Flag All By User', true);
    menuDialog.addOption('fuckRainbows', 'Cum inside Rainbow Dash');
    menuDialog.append('<br />');
    menuDialog.addInput('accessToken', 'Access Token', true);

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
    $(this).trigger('posttwo_newComment', [menu, cid, username]);    
});