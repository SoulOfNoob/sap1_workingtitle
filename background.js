chrome.runtime.onInstalled.addListener(function () {
    chrome.webNavigation.onCompleted.addListener(function (details) {
        // chrome.tabs.getSelected(null, function(tab){
        //     chrome.tabs.executeScript(tab.id, {file: "start.js"});
        // });
        var newURL = "http://www.google.de/maps/timeline?pb=!1m2!1m1!1s2018-05-25";
        chrome.tabs.create({ url: newURL });
    },
    {
        url: [{
            // Runs on example.com, example.net, but also example.foo.com
            hostContains: 'hpi'
        }]
    });

    chrome.webNavigation.onCompleted.addListener(function (details) {
        chrome.tabs.getSelected(null, function(tab){
            chrome.tabs.executeScript(tab.id, {file: "crawler.js"});
        });
    },
    {
        url: [{
            // Runs on example.com, example.net, but also example.foo.com
            pathContains: 'timeline'
        }]
    });
});