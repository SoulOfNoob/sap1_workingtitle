console.log( "loaded!" );
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
    });
});