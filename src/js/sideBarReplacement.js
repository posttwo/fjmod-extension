posttwo.ddd("sideBarReplacement.js has been loaded");
posttwo.sidebarReplacement = function(){};

posttwo.sidebarReplacement.replaceSidebar = function() {
    $.get("/sfw_mod/contents/10/1/-1000", function (data) {
        $("#tUploads").ready(function () {
            $("#tUploads").html(data);

        });
    });
}
posttwo.sidebarReplacement.replaceSidebar();
setInterval(posttwo.sidebarReplacement.replaceSidebar, 10000);