class Equalizer {
    equalizer = {}; // Object to store equalizer filters
    frequencyRanges = [60, 230, 910, 3000, 14000]; // Array of frequency ranges

     // Method for initializing the equalizer
    initialization() {
        [60, 230, 910, 3000, 14000].forEach((frequency, i) => {
            equalizer[i] = wavesurfer.backend.ac.createBiquadFilter();
            equalizer[i].type = 'peaking';
            equalizer[i].frequency.value = frequency;
            equalizer[i].Q.value = 1;
            equalizer[i].gain.value = 0;
        });
    }

    // Method for setting predefined equalizer presets
    setPreset(preset) {
        let inputElements = document.querySelectorAll("#equalizer div input");
        inputElements.forEach((frequency, i) => {
             // Set the input values and equalizer gains based on the preset
            frequency.value = preset[`band${i}`]
            equalizer[i].gain.value = preset[`band${i}`];
        });
    }
}
