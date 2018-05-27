var location_data = [];
$(function () {
    chrome.storage.sync.get(['location_data'], function(result) {
        //$('#output').html(JSON.stringify(result.location_data));
        //location_data = JSON.stringify(result.location_data);
        location_data = result.location_data;
        console.log(location_data);
        var emission_sum = 0;
        var emission_mode_array = [];
        var emission_distance_array = [];
        $('#emissions').append($('<tr><th scope="col">Uhrzeit</th><th scope="col">Verkehrsmittel</th><th scope="col">Entfernung</th><th scope="col">Emissionen</th></tr>'));
        $(location_data).each(function () {
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
            var emissions = $('<td style="color: ' + font_color + '"></td>').html(emission_val + "kg");
            emission_sum += emission_val;
            emission_mode_array.push(this.type);
            emission_distance_array.push(this.distance);

            console.log(this.time, this.type, this.distance);
            console.log(row, time, type, distance);

            $('#emissions').append($(row).append($(time)).append($(type)).append($(distance)).append($(emissions)));
        });
        $('#emissions').append($('<tr><th colspan="3" >Gesamt: </th><th>' + emission_sum + 'kg(' + calculatePoints(emission_mode_array, emission_distance_array) + ')</th></tr>'));
    });

});
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
    return emissions[mode_id] * distance / 1000000;
}

function calculatePoints(modes, distances) {
    var points = 0;
    for (var i = 0; i < modes.length; i++) {
        points += (140 - emissions[modes[i]]) * distances[i];
        points -= emissions[modes[i]] * distances[i];
    }
    return points + 1400;
}

function getTypeName(type_id) {
    var names = [];
    names[2] = "Zu Fuß";
    names[29] = "Auto";
    names[36] = "Taxi";
    names[7] = "Bus";
    names[3] = "Fahrrad";
    names[9] = "U-Bahn";
    names[8] = "Zug";
    names[5] = "Flugzeug";
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
    names[6] = "Laufen";
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
    names[0] = "Unterwegs";

    return names[type_id];
}