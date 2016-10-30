posttwo.ddd("addQuickMentions.js has been loaded");
$('body').arrive('#commentReplyForm', {existing: true}, function(){
    var el = $(this);
    el.find('.extraInfo ').html('<button type="button" class="ui-button ui-corner-all ui-widget" id="PT_MentionAllMods">Mention All Mods</button><button type="button" class="ui-button ui-corner-all ui-widget" id="PT_MentionActiveMods">Mention Online Mods</button>');
    var textArea = el.find('textarea#replyComment');
    $('#PT_MentionActiveMods').click(function () {
        $.ajax({
            type: "GET",
            url: "https://funnyjunk.com/ajax/getOnlineModList",
            dataType: "json",
            async: true,
            success: function (json) {
                var tomato = ''
                $.each(json, function (i, item) {
                    tomato = tomato + ' ' + json[i].username;
                });
                textArea.val(textArea.val() + '[spoiler]' + tomato + '[/spoiler]');
            }
        });
    });
    $('#PT_MentionAllMods').click(function () {
        $.ajax({
            type: "GET",
            url: "https://funnyjunk.com/ajax/getModRanksList",
            dataType: "json",
            async: true,
            success: function (json) {
                var tomato = ''
                $.each(json, function (i, item) {
                    tomato = tomato + ' ' + json[i].username;
                });
                textArea.val(textArea.val() + '[spoiler]' + tomato + '[/spoiler]');
            }
        });
    });
});