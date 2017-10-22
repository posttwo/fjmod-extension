posttwo.ddd("toolkit.js has been loaded");
posttwo.toolkit = function(){};
if (IS_FLAG_MODERATOR == true)
    $('#contentLeft > span:nth-child(3)').after('<span style="cursor:pointer;color:#5e075b;font: 400 14px Arial, Helvetica, sans-serif;" class="smallLeftMenu" id="PT_toolkit"><strong>Mod Toolkit</strong></span>');
else
    $('.comOptionsMenu > .dropdown-menu').append('<span style="cursor:pointer;color:#5e075b;font: 400 14px Arial, Helvetica, sans-serif;" class="smallLeftMenu" id="PT_toolkit"><strong>Posttwo Tookit</strong></span>');


$("#PT_toolkit").click(function () {
    var penis = '<div id="PT_ToolkitForm">String: <input type="text" class="txt PT_Input" id="PT_SearchString"></input><br />';
    penis += '<button class="ui-button ui-corner-all ui-widget" onclick=\'posttwo.toolkit.getInfo("comment")\'>Comment By ID</button>';
    penis += '<button class="ui-button ui-corner-all ui-widget" onclick=\'posttwo.toolkit.getInfo("user")\'>UserID by Name</button>';
    penis += '<button class="ui-button ui-corner-all ui-widget" onclick=\'posttwo.toolkit.getInfo("user")\'>Username by ID</button>';
    penis += '<button class="ui-button ui-corner-all ui-widget" onclick=\'posttwo.toolkit.getInfo("content")\'>Content By ID</button>';
    penis += '<button class="ui-button ui-corner-all ui-widget" onclick=\'posttwo.toolkit.getInfo("comment")\'>Comment Image By URL</button>';
    penis += '<button class="ui-button ui-corner-all ui-widget" onclick=\'posttwo.toolkit.getInfo("content")\'>Content Image By URL</button>';
    penis += '</div>'
    var menuDialog = $(penis);

    menuDialog.dialog({
        title: "Moderator Toolkit",
        closeOnEscape: true,
        resizable: false,
        width: 600,
        minHeight: 450,
        buttons: {
            Close: function () {
                $(this).dialog("close")
            }
        }
    }).parent().attr("id", "setboxthing");
    $("div.ui-draggable").css("overflow", "visible")
    
});

posttwo.toolkit.getInfo = function(stuff, id){
    var id = id;
    if(typeof id == "undefined") {
        id = $("#PT_SearchString").val();
    }
    posttwo.ddd("Getting " + stuff + " | " + id);
    $.ajax({
        url:"https://funnyjunk.com/find/" + stuff + "/" + id,
        type:'GET',
        success: function(data){
           var x = $(data)
           dialog.alert(x);
        }
    });
}