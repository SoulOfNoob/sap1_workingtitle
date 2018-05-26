chrome.runtime.onInstalled.addListener(function () {
    chrome.webNavigation.onCompleted.addListener(function (details) {
        var newURL = "http://www.google.de/maps/timeline?pb=!1m2!1m1!1s2018-05-25";
        //chrome.tabs.create({ url: newURL });
        chrome.tabs.create({'url': newURL,
            'active': true}, function(tab){
            var selfTabId = tab.id;
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                if (changeInfo.status == "complete" && tabId == selfTabId){
                    // send the data to the page's script:
                    var tabs = chrome.extension.getViews({type: "tab"});
                    tabs.executeScript(
                        tabs[0].id,
                        { code: 'alert("hi")'}
                    );
                }
            });
        });


        //
        // chrome.tabs.query({active: true, activeWindow: true}, function(tabs) {
        //     chrome.tabs.executeScript(tab.id, {
        //         code: 'alert("it works");'
        //     });
        // });
        //
        // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        //     if (changeInfo.status == "complete" && tabId == selfTabId){
        //         // send the data to the page's script:
        //         var tabs = chrome.extension.getViews({type: "tab"});
        //         tabs[0].doSomething("some long data");
        //     }
        // });
    },
    {
        url: [{
            // Runs on example.com, example.net, but also example.foo.com
            hostContains: 'hpi'
        }]
    });

    chrome.webNavigation.onCompleted.addListener(function (details) {
            alert("it works");
    },
    {
        url: [{
            // Runs on example.com, example.net, but also example.foo.com
            hostContains: 'google.de/maps/timeline'
        }]
    });
});