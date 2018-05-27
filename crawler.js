console.log( "loaded!" );

var location_data = [];

$(function() {
    console.log( "jQ ready!" );
    crawlData()
});

$('.timeline-subtitle').bind("DOMSubtreeModified",function(){
    window.setTimeout(function () { crawlData(); },1000);
});


function crawlData() {
    location_data = [];
    $('.activities-wrapper').each(function(){
        //console.log($(this));
        var type = $(this).find('.activity-type').closest('.timeline-item-title-content').attr('data-activity');
        var distance = $(this).find('.activity-type').parent().attr('data-distance');
        var time = $(this).parent().parent().prev().find('.segment-duration-part').last().text();

        console.log('type: ', type);
        console.log('distance: ', distance);
        console.log('time: ', time);

        location_data.push({type: type, distance: distance, time: time});
    });
    console.log(location_data);
    saveToStorage();
}

function saveToStorage() {
    chrome.storage.sync.set({location_data: location_data}, function() {
        console.log('Value is set to ' + JSON.stringify(location_data));
    });
}