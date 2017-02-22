posttwo.ddd("sideBarReplacement.js has been loaded");
function sidebarReplacement() {
    $.get("/sfw_mod/contents/10/1/-1000", function (data) {
        $("#tUploads").ready(function () {
            $("#tUploads").html(data);

        });
    });
}
sidebarReplacement();
setInterval(sidebarReplacement, 10000);