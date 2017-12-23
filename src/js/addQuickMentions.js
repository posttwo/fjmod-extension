//as this doesnt need use of any posttwo. helper functions lets build up the namespace incase it doesnt exist
try{
    posttwo.ddd("addQuickMentions.js has been loaded");
} catch (e) {
    if(typeof posttwo != 'function'){
        posttwo = function(){};
    }
    console.log("addQuickMentions.js has been laoded");     
}
if(typeof posttwo.mentions != 'function'){
    posttwo.mentions = function(){};
}
jQuery.expr[':'].parents = function(a,i,m){
    return jQuery(a).parents(m[3]).length < 1;
};
$('#replyCommentForm').append('<button type="button" class="ui-button ui-corner-all ui-widget" id="PT_MentionAllMods" onclick="posttwo.mentions.allMods()">Mention All Mods</button><button type="button" class="ui-button ui-corner-all ui-widget" id="PT_MentionActiveMods" onclick="posttwo.mentions.onlineMods()">Mention Online Mods</button>');
posttwo.mentions.onlineMods = function() {
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
            $('textarea#replyComment').val($('textarea#replyComment').filter(':parents(.hidden)').val() + '[spoiler]' + tomato + '[/spoiler]');
        }
    });
};
posttwo.mentions.allMods = function () {
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
            $('textarea#replyComment').val($('textarea#replyComment').filter(':parents(.hidden)').val() + '[spoiler]' + tomato + '[/spoiler]');
        }
    });
};