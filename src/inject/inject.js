chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			ddd("Injecting Scripts", "white");
			// ----------------------------------------------------------

			inject('arrive');
			inject('main');
			injectIf('viewLatestComments');
			injectIf('showSpoilers');
			injectIfUrl('banRequestsForm', '/user');
			injectIf('banRequestsTicker');
			injectIfUrl('userNotes', '/user');
			injectIfUrl('newCommentAlert', '/sfw_mod');
			injectIf('sideBarReplacement');
			injectIf('showComplaints');
			injectIf('commentExtraButtons');
			injectIf('removeUselessButtons')
			injectIf('addQuickMentions');
			injectIf('disableDoubleClick');
			injectIf('disableTextColor');
			injectIfUrl('hideFlaggedContent', '/sfw_mod');
			injectIfUrl('redirectCancer', '/cancer');
			injectIfUrl('disableCustomCSS', '/america');
			injectIfUrl('flagAllUserComments', '/user');
			injectIf('sfwRatingsAlert');
			injectIf('disableAutoplay');
			injectIf('fuckRainbows');
			injectIf('rateBottom');
			injectIf('djTools');
			injectIf('djToolsPlus');
			injectIf('verboseContent');
			injectIfUrl('userHistory', '/user');
			injectIfUrl('discordResolver', '/user');
			injectIf("disableBlurHandlers");
			injectIfUrl('oc', '/oc_review');
		}
	}, 10);
});

/* Injection Functions */
function injectIf(name) {
	if (isEnabled(name))
		inject(name)
	else
		ddd("NOT INJECTING: " + name, 'pink')	
}
function injectIfUrl(name, url)
{
	if(window.location.href.indexOf(url) > -1) {
		injectIf(name);
    } else {
		ddd("NOT INJECTING: " + name, 'pink')	
	}
}
function inject(name) {
	ddd("INJECTING: " + name, 'lightgreen');
	var s = document.createElement('script');
		s.src = chrome.extension.getURL('src/js/' + name + '.js');
		s.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(s);
}

/* Options Functions*/
function isEnabled(name) {
	var x = localStorage.getItem('PT_' + name);
	if (x == "true")
		return true;
	return false;
}
/* Development Only Functions */
function ddd(message, color) {
	console.log("%c PT:%c " + message, 'background: red; color: black; font-weight: bolder;', 'background: ' + color +'; color: black;');
}
