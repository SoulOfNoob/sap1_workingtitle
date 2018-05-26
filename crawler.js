console.log( "loaded!" );

var location_data = [];

document.addEventListener("hello", function(data) {
    chrome.runtime.sendMessage(JSON.stringify(location_data));
});

$(function() {
    console.log( "jQ ready!" );

    $('.activities-wrapper').each(function(){
        //console.log($(this));
        var type = $(this).find('.activity-type').text();
        var distance = $(this).find('.activity-type').parent().attr('data-distance');
        var time = $(this).parent().parent().prev().find('.segment-duration-part').last().text();

        console.log('type: ', type);
        console.log('distance: ', distance);
        console.log('time: ', time);

        location_data.push({type: type, distance: distance, time: time});
    });
    console.log(location_data);

    var event = document.createEvent('Event');
    event.initEvent('hello');
    document.dispatchEvent(event);
});