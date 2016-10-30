// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
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