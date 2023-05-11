class Equalizer {
    equalizer = {};
    frequencyRanges = [60, 230, 910, 3000, 14000];

    initialization() {
        [60, 230, 910, 3000, 14000].forEach((frequency, i) => {
            equalizer[i] = wavesurfer.backend.ac.createBiquadFilter();
            equalizer[i].type = 'peaking';
            equalizer[i].frequency.value = frequency;
            equalizer[i].Q.value = 1;
            equalizer[i].gain.value = 0;
        });
    }

    setPreset(preset) {
        let inputElements = document.querySelectorAll("#equalizer div input");
        inputElements.forEach((frequency, i) => {
            frequency.value = preset[`band${i}`]
            equalizer[i].gain.value = preset[`band${i}`];
        });
    }
}
