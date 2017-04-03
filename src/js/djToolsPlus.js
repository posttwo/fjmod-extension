posttwo.ddd("djToolsPlus.js has been loaded");

/*
Copyright 2014 Mike Dunn
http://upshots.org/
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!function(a){a.fn.getStyles=function(a,b){var d,e,c={};if(a&&a instanceof Array)for(var f=0,g=a.length;f<g;f++)e=a[f],c[e]=this.css(e);else if(this.length){var h=this.get(0);if(window.getComputedStyle){var i=/\-([a-z])/g,j=function(a,b){return b.toUpperCase()},k=function(a){return a.replace(i,j)};if(d=window.getComputedStyle(h,null)){var l,m;if(d.length)for(var f=0,g=d.length;f<g;f++)e=d[f],l=k(e),m=d.getPropertyValue(e),c[l]=m;else for(e in d)l=k(e),m=d.getPropertyValue(e)||d[e],c[l]=m}}else if(d=h.currentStyle)for(e in d)c[e]=d[e];else if(d=h.style)for(e in d)"function"!=typeof d[e]&&(c[e]=d[e])}if(b&&b instanceof Array)for(var f=0,g=b.length;f<g;f++)e=b[f],delete c[e];return c},a.fn.copyCSS=function(b,c,d){var e=a(b).getStyles(c,d);return this.css(e),this}}(jQuery);

function addDJ(user, slot){
    $("#dj" + slot).click();
    $("#dj"+slot+"user").attr('value', user);
    $("#djCSubmit").click();
}

function DJdialog(user){
    var list = $("<div>");
    for (i = 1; i < 4; i++){
        var li = $("<span>");
        li.text($("#dj"+i).text()).attr("onclick", "addDJ(\"" + user + "\", " + i + ")").copyCSS("#dj"+i, null, ['display', 'width']).css({'display': 'block', 'margin-bottom': '6px'});
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

        posttwo.addModTool('<div onclick="DJdialog(\'' + username + '\')">Add DJ</div>', cid);
    });
}