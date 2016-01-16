console.log('test')
chrome.storage.sync.get({
    showcommentipbutton: false,
    showcommentbanbutton: false,
    showanoniphash: false,
    showimagespoiler: false
}, function(items) {
    if (items.showcommentipbutton) {
        $('#commentsList .com .r').prepend(' <div class="sbtBzttn"><input type="button" value="IP" class="modToolsPT" onclick=\'var e=$(this).parent().parent().siblings(".uName").text();getUserId(e,function(e){usersWithSameIP(e,"")})\' id="userWithSameIPPT" /></div>');
    }
    if (items.showcommentbanbutton) {
        $('#commentsList .com .r').prepend(' <div class="sbtBzttn"><input type="button" value="Ban" class="modToolsPT" onclick=\'var e=$(this).parent().parent().siblings(".uName").text();getUserId(e,function(e){banUser(e)})\' id="banUserPT" /></div>');
    }
    if (items.showanoniphash) {
        $('input[value="Users with same IP"]').attr('value', function() {
            var str = $(this).attr('onclick')
            return HumanHash.humanize(str.split(", '")[1].split("'")[0]);
        });
    }
    if (items.showimagespoiler) {
        $(window).load(function() {
            $('.spoilerImg').parent().parent().prev().prev().prev().prev().append(' <span style="color: red">*SPOILER*</span>')
            $('.spoilerImg').click();
        });
    }
    if (items.showcommentbanbutton || items.showcommentipbutton || items.showanoniphash || items.showimagespoiler) {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.action == "comment_reload") {
                    if (items.showcommentipbutton) {
                        $('#commentsList .com .r').prepend(' <div class="sbtBzttn"><input type="button" value="IP" class="modToolsPT" onclick=\'var e=$(this).parent().parent().siblings(".uName").text();getUserId(e,function(e){usersWithSameIP(e,"")})\' id="userWithSameIPPT" /></div>');
                    }
                    if (items.showcommentbanbutton) {
                        $('#commentsList .com .r').prepend(' <div class="sbtBzttn"><input type="button" value="Ban" class="modToolsPT" onclick=\'var e=$(this).parent().parent().siblings(".uName").text();getUserId(e,function(e){banUser(e)})\' id="banUserPT" /></div>');
                    }
                    if (items.showanoniphash) {
                        $('input[value="Users with same IP"]').attr('value', function() {
                            var str = $(this).attr('onclick')
                            return HumanHash.humanize(str.split(", '")[1].split("'")[0]);
                        });
                    }
                    if (items.showimagespoiler) {
                        $('.spoilerImg').parent().parent().prev().prev().prev().prev().append(' <span style="color: red">*SPOILER*</span>')
                        $('.spoilerImg').click();
                    }
                }
            });
    }
});