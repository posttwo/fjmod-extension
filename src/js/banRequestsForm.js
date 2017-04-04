posttwo.ddd("banRequestForm.js has been loaded");
$('.contentTitle:first').append('<div class="sbtBzttn"><input type="button" class="modBtn" id="PT_Request_Ban_button" style="display:inline;" value="Request Ban"></div>');
$('#PT_Request_Ban_button').click(function () {
    // If user is banned at the moment, use this for reason
    var cell = $("td:contains('Reason:')").text();
    var reason = cell.substr(cell.indexOf('Reason: ')+8);
    reason = reason.substr(0, reason.length - 1);
    var banRequestDialog = $("<form>").html('Reason: <textarea id="privMsgMessage" name="reason">' + reason + '</textarea>').attr({
        id: "PT_BanRequestForm"
    }).submit(function (e) {
        var userName = $("#profile > div.title > h2 > span").text();
        $(this).append('<input type="hidden" name="user_id" value="'+ contentId +'" /> ');
        $(this).append('<input type="hidden" name="user_name" value="'+ userName +'" /> ');
        $(this).append('<input type="hidden" name="token" value="' + localStorage.getItem('PT_accessToken') +'" /> ');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://fjmod.posttwo.pt/banRequest/request",
            data: $("#PT_BanRequestForm").serialize(),
            success: function(data)
            {
                flashMessage.showSuccess("Ban has been requested");
            },
            error: function (data)
            {
                flashMessage.showError("Ban request has failed?");
            }    
        });
        e.preventDefault();
    })
    banRequestDialog.dialog({
        title: "Request Ban",
        closeOnEscape: true,
        resizable: false,
        width: 'auto',
        minHeight: 0,
        buttons: {
            Request: function () {
                $("#PT_BanRequestForm").trigger("submit");
                $(this).dialog("close")
                return false
            },
            Close: function () {
                $(this).dialog("close")
            }
        }
    }).parent().attr("id", "setboxthing");
    $("div.ui-draggable").css("overflow", "visible")
})