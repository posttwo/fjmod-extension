posttwo.ddd("djToolsPlus.js has been loaded");
posttwo.requireArrive();
if(typeof posttwo.djTools != 'function'){
   posttwo.djTools = function(){};
}
!function(a){a.fn.getStyles=function(a,b){var d,e,c={};if(a&&a instanceof Array)for(var f=0,g=a.length;f<g;f++)e=a[f],c[e]=this.css(e);else if(this.length){var h=this.get(0);if(window.getComputedStyle){var i=/\-([a-z])/g,j=function(a,b){return b.toUpperCase()},k=function(a){return a.replace(i,j)};if(d=window.getComputedStyle(h,null)){var l,m;if(d.length)for(var f=0,g=d.length;f<g;f++)e=d[f],l=k(e),m=d.getPropertyValue(e),c[l]=m;else for(e in d)l=k(e),m=d.getPropertyValue(e)||d[e],c[l]=m}}else if(d=h.currentStyle)for(e in d)c[e]=d[e];else if(d=h.style)for(e in d)"function"!=typeof d[e]&&(c[e]=d[e])}if(b&&b instanceof Array)for(var f=0,g=b.length;f<g;f++)e=b[f],delete c[e];return c},a.fn.copyCSS=function(b,c,d){var e=a(b).getStyles(c,d);return this.css(e),this}}(jQuery);

posttwo.djTools.addDJ = function(user, slot){
    $("#dj" + slot).click();
    $("#dj"+slot+"user").attr('value', user);
    $("#djCSubmit").click();
}

posttwo.djTools.changeDialog = function (user){
    var list = $("<div>");
    for (i = 1; i < 4; i++){
        var li = $("<span>");
        li.text($("#dj"+i).text()).attr("onclick", "posttwo.djTools.addDJ(\"" + user + "\", " + i + "); $(this).parent().dialog('close');").copyCSS("#dj"+i, null, ['display', 'width']).css({'display': 'block', 'margin-bottom': '6px'});
        list.append(li);
    }
    list.dialog({
        closeOnEscape: true,
        resizable: false,
        // id: "djReplace",
        width: 300,
        position:{ my: "center top", at: "center top", of: "#content" },
        title: 'Give DJ to "' + user + '"',
        open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
        buttons: {
            Close: function() {
                $(this).dialog("close")
            },
        }
    });
    list.prepend('<div style="padding: 6px;">Which spot to replace?</div>');
}

var work = $("#dj1").length;
if (work){
    $(document).on("posttwo_newComment", function (event, menu, cid, username, text, el) {
        var el = $(event.target);

        posttwo.addModTool('<div onclick="posttwo.djTools.changeDialog(\'' + username + '\')">Add DJ</div>', cid);
    });
}