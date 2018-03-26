$(document).ready(function() {

})

$(function() {
    $('#bpmToMs').on('input', function () {
        var newVal = (60000)/(document.getElementById('bpmToMs').value);
        newVal = newVal.toFixed(2);
        document.getElementById('msToBpm').value = newVal;
    })

    $('#msToBpm').on('input', function () {
        var newVal = (60000)/(document.getElementById('msToBpm').value);
        newVal = newVal.toFixed(2);
        document.getElementById('bpmToMs').value = newVal;
    })

    $('#freqToMidi').on('input', function () {
        var newMidi = 69 + 12*(Math.log((document.getElementById('freqToMidi').value/440))/Math.log(2));
        newMidi = newMidi.toFixed(2);
        document.getElementById('midiToFreq').value = newMidi;
    })

    $('#midiToFreq').on('input', function () {
        var newFreq = 440*(Math.pow(2, ((document.getElementById('midiToFreq').value-69)/12)));
        newFreq = newFreq.toFixed(2);
        document.getElementById('freqToMidi').value = newFreq;
    })

    $('#temp').on('input', function () {
        var velocity = 331 + 0.6*document.getElementById("temp").value;
        var newMs = document.getElementById('distance').value*1000/velocity;
        newMs = newMs.toFixed(2);
        document.getElementById('msToDist').value = newMs;
    })

    $('#distance').on('input', function () {
        var velocity = 331 + 0.6*document.getElementById("temp").value;
        var newMs = document.getElementById('distance').value*1000/velocity;
        newMs = newMs.toFixed(2);
        document.getElementById('msToDist').value = newMs;
    })

    $('#msToDist').on('input', function () {
        var velocity = 331 + 0.6*document.getElementById("temp").value;
        var newDist = document.getElementById('msToDist').value*velocity/1000;
        newDist = newDist.toFixed(2);
        document.getElementById('distance').value = newDist;
    })
})
