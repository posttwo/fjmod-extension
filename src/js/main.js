/* Development Only Functions */
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
};
posttwo.ddd("main.js has been loaded");

/* Extension Options */
//Add myself to the mods menu
//$("#siteContent .adminButtonMenu").append("<div id='PT_menu'>Mod Settings</div>");
$('#contentLeft > span:nth-child(3)').after('<span style="cursor:pointer;color:#5e075b;font: 400 12px Arial, Helvetica, sans-serif;" class="smallLeftMenu" id="PT_menu"><strong>Mod Settings</strong></span>');
$("#PT_menu").click(function () {
    
    posttwo.ddd("Menu has been openned");

    var menuDialog = $.extend($('<div id="PT_SettingsForm">Um hi.</div>'), {
        addOption: function (name, humanName) {
            menuDialog.append('<div class="addCommentLink PT_Toggle ' + posttwo.isEnabled(name) + '" data-name="' + name + '">' + humanName +'</div>');
        },
        addInput: function (name, humanName) {
            menuDialog.append("<br />" + humanName + ': <input data-name="' + name +'" type="text" class="txt PT_Input" id="privMsgSubject" value="' + localStorage.getItem('PT_' + name) +'">')
        }
    })
    menuDialog.addOption('showSpoilers', 'Show Spoilers');
    menuDialog.addOption('banRequestsForm', 'Ban Requests');
    menuDialog.addOption('banRequestsTicker', 'Ban Request Ticker');
    menuDialog.addOption('userNotes', 'User Notes');
    menuDialog.addOption('sideBarReplacement', 'Replace Sidebar');
    menuDialog.addOption('showComplaints', 'Show Complaints Ticker');
    menuDialog.addOption('commentExtraButtons', 'Extra Buttons on Comments');
    menuDialog.addOption('removeUselessButtons', 'Remove Useless Buttons');
    menuDialog.addOption('addQuickMentions', 'Quick Mentions');
    menuDialog.addOption('newCommentAlert', 'Alert on AutoRefresh');
    menuDialog.addInput('accessToken', 'Access Token');
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