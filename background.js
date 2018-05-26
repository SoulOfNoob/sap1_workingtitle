chrome.runtime.onInstalled.addListener(function () {
    var location_data = [];
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        //alert(message+" received");
        location_data = JSON.parse(message);
        chrome.storage.sync.set({location_data: location_data}, function() {
            console.log('Value is set to ' + JSON.stringify(location_data));
        });
    });

    chrome.webNavigation.onCompleted.addListener(function (details) {
        chrome.storage.sync.get(['location_data'], function(result) {
            console.log('Value currently is ' + JSON.stringify(result.location_data));
            console.log(result.location_data);
            location_data = result.location_data;
        });
        chrome.tabs.getSelected(null, function(tab){
            chrome.tabs.executeScript(tab.id, {
                code: 'var location_data = ' + JSON.stringify(location_data) + ';'
            }, function() {
                chrome.tabs.executeScript(tab.id, {file: "output.js"});
            });
        });
        // var newURL = "http://www.google.de/maps/timeline?pb=!1m2!1m1!1s2018-05-25";
        // chrome.tabs.create({ url: newURL });
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