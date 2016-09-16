chrome.storage.sync.get({
    uploadtimehelper: false,
  }, function(items) {
	if(items.uploadtimehelper)
	{
(function ($) {

/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler A function to execute at the time when the element is inserted
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $(selector).waitUntilExists(function);
*/

$.fn.waitUntilExists    = function (handler, shouldRunHandlerOnce, isChild) {
    var found       = 'found';
    var $this       = $(this.selector);
    var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

    if (!isChild)
    {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
            window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
        ;
    }
    else if (shouldRunHandlerOnce && $elements.length)
    {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }

    return $this;
}

}(jQuery));

$('#date').waitUntilExists(function(){
	$('#date').after($('<input type="button" class="pt_TimeAdd" value="5m" data-id="5"><input type="button" class="pt_TimeAdd" value="10m" data-id="10"><input type="button" class="pt_TimeAdd" value="30m" data-id="30"><input type="button" class="pt_TimeAdd" value="1h" data-id="60"><input class="pt_TimeAdd" type="button" value="12h" data-id="720"><input class="pt_TimeAdd" type="button" value="24h" data-id="1440"><input class="pt_TimeReset" type="button" value="Reset">'));
	$('#date').val(localStorage.getItem("pt_TimeLastUpload") || 0);
	$(".pt_TimeAdd").bind( "click", function() {
		$value = parseInt($( this ).attr("data-id"), 10);
		$ll = localStorage.getItem("pt_TimeLastUpload") || 0;
		$lastUpload = parseInt($ll, 10);
		$timeToLive = $lastUpload + $value;
		localStorage.setItem("pt_TimeLastUpload", $timeToLive);
		$('#date').val($timeToLive);
		
		
	});
	$(".pt_TimeReset").bind( "click", function() {
		localStorage.setItem("pt_TimeLastUpload", "0");
		$('#date').val(0);
	});
});



	}
});