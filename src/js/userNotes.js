posttwo.ddd("userNotes.js has been loaded");
posttwo.userNotes = function(){};

posttwo.userNotes.currentUserName = $("#profile > div.title > h2 > span").text();
$.ajax({
    type:"POST",
    dataType: "json",
    url: "https://fjmod.posttwo.pt/notes/get/" + posttwo.userNotes.currentUserName,
    data: {token: localStorage.getItem('PT_accessToken')},
    success: function(html){
        $(document).ready(function(){
            $('#profileInfo > tbody').prepend('<tr> <td class="profileLegend" id="notesbuttoner"><span style="font-size:9px; color:red;">Add</span> Notes:</td> <td style="color:#C8C8C8; font-weight: bold;width:99%" id=""> <div style="text-align: left;" class="inner" id="usernotes"><table id="user_notes"></table></div> </td> </tr>');
            $.each (html, function (bb) {
                $('#user_notes').append('<tr style="color: ' + html[bb].color + '"><td>' + html[bb].message +  '</td><td>' + html[bb].updated_at + '</td><td>' + html[bb].added_by +'</td></tr>');
            });
            $("#notesbuttoner").click( function()
                {
                posttwo.userNotes.addNote();
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
posttwo.userNotes.addNote = function() {
    $.cachedScript(CACHED_MEDIA_URL + "site/js/0900-colorpicker.js").done(function (s, t) {
        var noteAddForm = $("<form>").html('Note: <textarea id="privMsgMessage" name="message"></textarea>Text Color: <input type="text" id="textcolor" name="color" value="#FFFFFF" class="txt mt3" style="width:120px" maxlength="7"><div class="colorpicker_submit" style="margin:0 0 -3px 2px;display:inline-block;position:static;"></div>').attr({
            id: "PT_NoteAddForm"
        }).submit(function (e) {
            posttwo.userNotes.currentUserName = $("#profile > div.title > h2 > span").text();
            $("#PT_NoteAddForm").append('<input type="hidden" name="token" value="' + localStorage.getItem('PT_accessToken') + '" /> ');
            $.ajax({
                type: "POST",
                //dataType: "json",
                url: "https://fjmod.posttwo.pt/notes/post/" + posttwo.userNotes.currentUserName,
                data: $("#PT_NoteAddForm").serialize(),
                success: function (data) {
                    flashMessage.showSuccess("Note has been added");
                    location.reload();
                },
                error: function (data) {
                    console.log(data);
                    flashMessage.showSuccess("Note addition failed");
                }
            });
            e.preventDefault(e);
            return false;
        })
        noteAddForm.dialog({
            title: "Add a Note",
            closeOnEscape: true,
            resizable: false,
            width: 'auto',
            minHeight: 0,
            buttons: {
                Submit: function () {
                    $("#PT_NoteAddForm").trigger("submit");
                    $(this).dialog("close")
                    return false;
                },
                Close: function () {
                    $(this).dialog("close")
                }
            }
        }).parent().attr("id", "setboxthing");
        $("div.ui-draggable").css("overflow", "visible")
        $('.colorpicker_submit').ColorPicker({
            color: $("#textcolor").val().replace("#", ""),
            onShow: function (e) {
                $(e).fadeIn(500);
                return false
            },
            onSubmit: function (e, s, t, o) {
                $("#textcolor").val(("#" + s).toUpperCase());
                $("#textcolor").ColorPickerHide()
            },
            onChange: function (e, s, i) {
                $("#textcolor").val(("#" + s).toUpperCase());
            }
        });
    });
}