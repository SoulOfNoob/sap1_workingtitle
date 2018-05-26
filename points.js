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
    var p = emissions[mode_id];
    return p * (distance / 1000);
}

function calculatePoints(modes, distances) {
    var points = 0;
    for (var i = 0; i < modes.length; i++) {
        points += (140 - emissions[modes[i]]) * (distances[i] / 1000);
        points -= emissions[modes[i]] * (distances[i] / 1000);
    }
    return points + 1400;
}

