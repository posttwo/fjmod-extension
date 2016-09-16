chrome.storage.sync.get({
    dragimgurvideo: false,
}, function(items) {
    if (items.dragimgurvideo) {
        $('video').attr("draggable", "true");
        $('video').on('dragstart', function(event) {
            var cc = $(this).find('source:eq(1)').attr('src')
            event.originalEvent.dataTransfer.setData('text/html', '<source type="video/webm" src="https:' + cc + '">');
        });
    }
});
chrome.runtime.sendMessage({
    action: "notify_load_imgur"
}, function(response) {});