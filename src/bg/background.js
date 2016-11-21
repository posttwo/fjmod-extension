chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse();
  });

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      var url = details.url;
      url = url.replace("www.", "");
      return {redirectUrl: url};
    },
    {
      urls: [
          "https://www.funnyjunk.com/*",
      ],
      types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);
