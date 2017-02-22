posttwo.ddd("hideFlaggedContent.js has been loaded");

$('#ajax_mod_comm').arrive('.com', { existing: true }, function () {
    var el = $(this);
    el.find('.r:contains("Content has been flagged")').parent().toggle();
    el.find('.coloredNotice').parent().parent().toggle();
});