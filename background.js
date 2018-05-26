chrome.runtime.onInstalled.addListener(function () {
    chrome.webNavigation.onCompleted.addListener(function (details) {
        var newURL = "http://www.google.com/maps";
        chrome.tabs.create({ url: newURL });
    }, {
            url: [{
                // Runs on example.com, example.net, but also example.foo.com
                hostContains: 'hpi'
            }],
        });
});