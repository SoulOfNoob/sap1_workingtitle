var location_data = [];
$(function () {
    chrome.storage.sync.get(['location_data'], function(result) {
        //$('#output').html(JSON.stringify(result.location_data));
        //location_data = JSON.stringify(result.location_data);
        location_data = result.location_data;
        console.log(location_data);
        var table = $('<table></table>');
        $(table).append($('<tr><th>time</th><th>type</th><th>distance</th></tr>'));
        $(location_data).each(function () {
            var row = $('<tr></tr>');
            var time = $('<td></td>').html(this.time);
            var type = $('<td></td>').html(this.type);
            var distance = $('<td></td>').html(this.distance);

            console.log(this.time, this.type, this.distance);
            console.log(row, time, type, distance);

            $(table).append($(row).append($(time)).append($(type)).append($(distance)));
        });
        $('body').html($(table).html())
    });

});