let session = new Session();
session = session.getSession();

if (session !== "") {
    
} else {
    window.location.href = "/"
}

let wavesurfer = WaveSurfer.create({
    container: '#wavesurfer',
    waveColor: '#acb8cc',
    progressColor: '#71829e',
    /*backend: 'MediaElement',*/
    barWidth: 2,
    barRadius: 0.2,
    cursorWidth: 2,
    height: 75,
    barGap: 2,
    cursorColor: 'red',
    responsive: true,
    fillParent: true,
    audioContext: new AudioContext()
}), currentTrackIndex = 0, player = new Player(), eq = new Equalizer(), song = new Song();

const play = document.querySelector(".play"),
    next = document.querySelector(".next"),
    back = document.querySelector(".previous"),

    progressBarContainer = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),

    currentTimeHtml = document.querySelector(".progress-current"),
    durationHtml = document.querySelector(".progress-duration"),

    playIcon = document.querySelector('.fa-play'),
    img = document.querySelector('.player-cover-item'),
    title = document.querySelector(".album-info-name"),
    singer = document.querySelector(".album-info-track"),
    heart = document.querySelector(".heart"),
    heartIcon = document.querySelector(".heart use"),
    wavesurferContainer = document.querySelector('#wavesurfer');


song.setTrack(currentTrackIndex)
y   
// Play button
play.addEventListener('click', function () {

    wavesurfer.playPause(); // Reproducira ako je pauzirana, pauzira ako se reproducira

    player.updateIcon();
});

// Next buttond
next.addEventListener('click', function () {
    wavesurfer.playPause();
    player.updateIcon();

    let a = song.length;
//TODO
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    
    song.setTrack(currentTrackIndex)
   
});

// Previous button
back.addEventListener('click', function () {
    wavesurfer.playPause();
    player.updateIcon();
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        currentTrackIndex = tracks.length - 1;
    }

    song.setTrack(currentTrackIndex)
})

// Song progress
progressBarContainer.addEventListener('click', (e) => {
    let position = e.clientX - progressBarContainer.getBoundingClientRect().left;
    let percentage = (position * 100) / progressBarContainer.clientWidth;
    wavesurfer.seekTo(percentage / 100);
});

// Like song
heart.addEventListener("click", function () {
    if (heartIcon.href.baseVal === "#icon-heart-o") {
        heartIcon.href.baseVal = "#icon-heart";
        
    } else {
        heartIcon.href.baseVal = "#icon-heart-o";
        song.addLikes()
    }
    
})

// Audio update
wavesurfer.on('audioprocess', function() {
    // It gets the current time and duration of the audio being played
    let currentTime = wavesurfer.getCurrentTime(), // Vraća trenutni napredak u sekundama
     duration = wavesurfer.getDuration(); // Vraća trajanje audio zapisa u sekundama

    // update the width of the progress bar to reflect the current progress of the audio
    progressBar.style.width = (currentTime / duration) * 100 + '%';
    
    currentTimeHtml.innerText = player.formatTime(currentTime);
    durationHtml.innerText = player.formatTime(duration);
});

// 
wavesurfer.on('finish', function() {
    wavesurfer.playPause();
    player.updateIcon();
    currentTrackIndex++;
    if(currentTrackIndex >= tracks.length){
      currentTrackIndex = 0;
    }

    song.setTrack(currentTrackIndex)
});

eq.initialization();
wavesurfer.backend.setFilter(...Object.values(equalizer));

// Gain value for equalizer
document.querySelectorAll("#equalizer div input").forEach((frequency, i) => {
    frequency.addEventListener("input", item => {
        equalizer[i].gain.value = item.target.value
        
    })
})

// Create buttons to select presets
document.querySelectorAll(".pressets button").forEach(buttons => {
    buttons.addEventListener("click", item => {
            presets.forEach(bass => {
            if (bass.name === item.target.innerHTML) {
                eq.setPreset(bass.values)
            }
        })
    });   
})

document.querySelector("#sign-out").addEventListener("click", item => {
    let session = new Session();
    session = session.destroySession()

    window.location.href = "/"

})


document.querySelector(".link").addEventListener("click", () => {
    
    document.querySelector(".modal").style.display = "block"
})

document.querySelector("#closeModal").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none"
    document.querySelector(".settings").style.display = "block"
    document.querySelector(".bluetooth").style.display = "none"

})

document.querySelector("#bluetooth_button").addEventListener("click", item => {
    item.preventDefault();

    document.querySelector(".settings").style.display = "none"
    document.querySelector(".bluetooth").style.display = "block"
    
})


document.querySelector("#delete").addEventListener("click", () => {
    console.log("da");
    let user = new User();
    user.deleteUser()
    
  
})

$("#volume-slider").roundSlider({
    value: 0,
    min: 0,
    max: 10,
    step: 0.5,
    sliderType: "min-range",
    handleShape: "round",
    width: 20,
    radius: 40,
    startAngle: -90,
    editableTooltip: false,
    change: function(e) {
        wavesurfer.setVolume(e.value);
    }
});

$("#bass-slider").roundSlider({
    value: 0,
    min: 0,
    max: 10,
    step: 0.5,
    sliderType: "min-range",
    handleShape: "round",
    width: 20,
    radius: 40,
    startAngle: -90,
    editableTooltip: false,
    change: function(e) {
        wavesurfer.setVolume(e.value); //Postavlja glasnoću reprodukcije na novu vrijednost
    }
});