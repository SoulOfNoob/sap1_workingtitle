var location_data = [];
var emission_sum = 0;
var emission_mode_array = [];
var emission_distance_array = [];
var slider_values = [];

$(function () {
    chrome.storage.sync.get(['location_data'], function(result) {
        //$('#output').html(JSON.stringify(result.location_data));
        //location_data = JSON.stringify(result.location_data);
        location_data = result.location_data;
        console.log(location_data);

        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: (24*60),
            values: [ (9*60), (18*60) ],
            change: function( event, ui ) {
                console.log("slider changed");
                chrome.storage.sync.set({slider_values: [$( "#slider-range" ).slider( "values", 0 ), $( "#slider-range" ).slider( "values", 1 )]}, function() {

                });
                refreshTable();
            },
            slide: function( event, ui ) {
                $( "#amount" ).val( pad((ui.values[ 0 ] / 60).toFixed(0), 2) + ":" + pad((ui.values[ 0 ] % 60).toFixed(0), 2) + " - " + pad((ui.values[ 1 ] / 60).toFixed(0), 2) + ":" + pad((ui.values[ 1 ] % 60).toFixed(0), 2));
            }
        });
        chrome.storage.sync.get({'slider_values': [(9*60), (18*60)]}, function(result) {
            slider_values = result.slider_values;
            $( "#slider-range" ).slider( "values", 0, slider_values[0]);
            $( "#slider-range" ).slider( "values", 1, slider_values[1]);

            console.log(slider_values[0], (slider_values[0] / 60).toFixed(0), pad((slider_values[0] / 60).toFixed(0), 2));
            $( "#amount" ).val( "" + pad((slider_values[0] / 60).toFixed(0), 2) + ":" + pad((slider_values[0] % 60).toFixed(0), 2) + " - " + pad((slider_values[1] / 60).toFixed(0), 2) + ":" + pad((slider_values[1] % 60), 2) );
            refreshTable();
        });

    });

});

function refreshTable() {
    emission_sum = 0;
    emission_mode_array = [];
    emission_distance_array = [];
    $('#emissions').html("<thead></thead><tbody></tbody>");
    $('#emissions').append($('<tr><th scope="col">Time</th><th scope="col">Transport</th><th scope="col">Distance</th><th scope="col">Emissions</th></tr>'));
    $(location_data).each(function () {
        if(inRange(this.time, $( "#slider-range" ).slider( "values", 0 ), $( "#slider-range" ).slider( "values", 1 ))) {
            var row = $('<tr></tr>');
            var time = $('<td></td>').html(this.time);
            var type = $('<td></td>').html(getTypeName(this.type));
            var distance_val = this.distance;
            if(distance_val < 1000) {
                distance_val = distance_val  + "m";
            }else{
                distance_val = Number((distance_val / 1000).toFixed(1)) + "km";
            }
            var distance = $('<td></td>').html(distance_val);
            var emission_val = getEmissions(this.type, this.distance);
            var font_color = "green";
            if(emission_val > 0){
                font_color = "red";
            }
            var emissions = $('<td style="color: ' + font_color + '"></td>').html(emission_val + "g");
            emission_sum += emission_val;
            emission_mode_array.push(this.type);
            emission_distance_array.push(this.distance);

            console.log(this.time, this.type, this.distance);
            console.log(row, time, type, distance);

            $('#emissions').append($(row).append($(time)).append($(type)).append($(distance)).append($(emissions)));
        }
    });
    if(emission_sum < 1000) {
        emission_sum = emission_sum.toFixed(0) + "g"
    }else{
        emission_sum = (emission_sum / 1000).toFixed(2) + "kg"
    }
    $('#emissions').append($('<tr><th colspan="3" >Gesamt Emissionen: </th><th>' + emission_sum + '</th></tr>'));
    $('#emissions').append($('<tr><th colspan="3" >SAPlings: </th><th>' + calculatePoints(emission_mode_array, emission_distance_array) + '</th></tr>'));
}

var emissions = [];
emissions[2] = 0;
emissions[29] = 140;
emissions[36] = 140;
emissions[7] = 60;
emissions[3] = 0;
emissions[9] = 65;
emissions[8] = 50;
emissions[5] = 214;
emissions[10] = 65;
emissions[30] = 140; //Motorrad
//11,31,34,13
emissions[12] = 65;
//24,15,16
emissions[6] = 0;
emissions[32] = 0;
emissions[37] = 0;
emissions[35] = 0;
emissions[33] = 0;
emissions[17] = 0;
emissions[22] = 0;
emissions[25] = 0;
emissions[27] = 0;
emissions[18] = 0;
emissions[21] = 0;
emissions[19] = 0;
emissions[20] = 0;
emissions[23] = 0;
emissions[26] = 0;
emissions[14] = 0;
emissions[0] = 0;

function getEmissions(mode_id, distance) {
    return emissions[mode_id] * distance / 1000;
}

function inRange(time, start, end) {
    var min = (time.split(':')[0] * 60) + (time.split(':')[1] % 60);
    console.log(start, end, min, min >= start && min <= end);
    return min >= start && min <= end;
}

function calculatePoints(modes, distances) {
    var points = 0;
    for (var i = 0; i < modes.length; i++) {
        points += (140 - emissions[modes[i]]) * (distances[i] / 1000);
        points -= emissions[modes[i]] * (distances[i] / 1000);
    }
    points += 1400;
    if(points<0) points = 0;
    return (points / 100).toFixed(0);
}

function getTypeName(type_id) {
    var names = [];
    names[2]  = "Zu Fuß";
    names[29] = "Auto";
    names[36] = "Taxi";
    names[7]  = "Bus";
    names[3]  = "Fahrrad";
    names[9]  = "U-Bahn";
    names[8]  = "Zug";
    names[5]  = "Flugzeug";
    names[10] = "Tram";
    names[30] = "Motorrad";
    names[11] = "Fähre";
    names[31] = "Boot";
    names[34] = "Gondelbahn";
    names[13] = "Standseilbahn";
    names[12] = "Straßenbahn";
    names[24] = "Schneemobil";
    names[15] = "Kajakfahren";
    names[16] = "Kitesurfen";
    names[6]  = "Laufen";
    names[32] = "Mit dem Rollstuhl";
    names[28] = "Nordic Walking";
    names[37] = "Paragliding";
    names[35] = "Pokémon fangen";
    names[33] = "Reiten";
    names[17] = "Rudern";
    names[22] = "Schlittenfahren";
    names[25] = "Schneeschuhwandern";
    names[27] = "Schwimmen";
    names[18] = "Segeln";
    names[21] = "Skateboardfahren";
    names[19] = "Skaten";
    names[20] = "Skifahren";
    names[23] = "Snowboarden";
    names[26] = "Surfen";
    names[14] = "Wandern";
    names[0]  = "Unterwegs";

    return names[type_id];
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
