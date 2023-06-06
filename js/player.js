// Create a new session and get the session ID
let session = new Session();
session = session.getSession();

// Get the user ID from the session
const id = session;

// Create a new user instance
const user = new User();
user.user_id = id; // Set the user ID
user.getAccountDetails();

user.getTheme();

// Check if the session is valid
if (session !== "") {
    // Session is valid, continue with the rest of the code
} else {
    // Session is invalid, redirect to the homepage
    window.location.href = "/";
}

// Create a new WaveSurfer instance
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
});

// Initialize variables
let currentTrackIndex = 0;
let player = new Player();
let eq = new Equalizer();
let song = new Song();

// Select DOM elements
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

// Set the current track
song.setTrack(currentTrackIndex);

// Play button
play.addEventListener('click', function () {
    wavesurfer.playPause(); // Play if paused, pause if playing
    player.updateIcon();
});

// Next button
next.addEventListener('click', function () {
    song.getLength().then(length => {
        if (currentTrackIndex < length - 1) {
            currentTrackIndex++;
        } else {
            currentTrackIndex = 0;
        }
        song.setTrack(currentTrackIndex);
    });
});

// Previous button
back.addEventListener('click', function () {
    song.getLength().then(length => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
        } else {
            currentTrackIndex = length - 1;
        }
        song.setTrack(currentTrackIndex);
    });
});

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
        song.addLikes(currentTrackIndex);
    }
});

// Audio update
wavesurfer.on('audioprocess', function () {
    let currentTime = wavesurfer.getCurrentTime(); // Get the current time in seconds
    let duration = wavesurfer.getDuration(); // Get the audio duration in seconds

    // Update the width of the progress bar to reflect the current progress of the audio
    progressBar.style.width = (currentTime / duration) * 100 + '%';

    currentTimeHtml.innerText = player.formatTime(currentTime);
    durationHtml.innerText = player.formatTime(duration);
});

// Finish event
wavesurfer.on('finish', function () {
    wavesurfer.playPause();
    player.updateIcon();
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0;
    }
    song.setTrack(currentTrackIndex);
});

eq.initialization();
wavesurfer.backend.setFilter(...Object.values(equalizer));

// Gain value for equalizer
document.querySelectorAll("#equalizer div input").forEach((frequency, i) => {
    frequency.addEventListener("input", item => {
        equalizer[i].gain.value = item.target.value;
    });
});

// Create buttons to select presets
document.querySelectorAll(".pressets button").forEach(buttons => {
    buttons.addEventListener("click", item => {
        presets.forEach(bass => {
            if (bass.name === item.target.innerHTML) {
                eq.setPreset(bass.values);
            }
        });
    });
});


// Sign out
document.querySelector("#sign-out").addEventListener("click", item => {
    let session = new Session();
    session = session.destroySession();
    window.location.href = "/";
});

// Open modal
document.querySelector(".link").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "block";
});

// Close modal
document.querySelector("#closeModal").addEventListener("click", () => {
    document.querySelector(".subsettings .account").style.display = "none";
    document.querySelector(".subsettings .addsong").style.display = "none";
    document.querySelector(".subsettings .theme").style.display = "none";
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".settings").style.display = "block";
});

// Delete user
document.querySelector("#delete").addEventListener("click", () => {
    let user = new User();
    user.deleteUser(id);
});

// Volume slider
$("#volume-slider").roundSlider({
    sliderType: "min-range",
    handleShape: "round",
    width: 17,
    radius: 50,
    value: 100,
    mouseScrollAction: true,
    value: '1',
    step: "1",
    min: "0",
    max: "10",
    startAngle: 313,
    endAngle: "+275",
    change: function (e) {
        wavesurfer.setVolume(e.value);
    }
});

// Bass slider
$("#bass-slider").roundSlider({
    sliderType: "min-range",
    handleShape: "round",
    width: 17,
    radius: 50,
    value: 100,
    mouseScrollAction: true,
    value: '1',
    step: "1",
    min: "0",
    max: "100",
    startAngle: 313,
    endAngle: "+275",
    change: function (e) {
        wavesurfer.backend.setFilterType(0, 'lowsheft'); // Postavljanje prvog filtera kao lowshelf filter
        wavesurfer.backend.setFilterFrequency(0, 200); // Postavljanje frekvencije za lowshelf filter
        wavesurfer.backend.setFilterGain(0, e.value); // Postavljanje pojačanja za lowshelf filter
    }
});

// Dark mode toggle
const toggleCheckbox = document.getElementById('toggle_checkbox');
const toggleLabel = document.querySelector('.dark-mode label');
toggleCheckbox.addEventListener('change', function () {
    if (this.checked) {
        // Enable dark mode
        document.body.classList.add('dark-theme');
        document.querySelector(".player").classList.add("player-dark-theme");
        document.querySelector("#eq").classList.add("player-dark-theme");
        document.querySelector(".modal").classList.add("player-dark-theme");
        document.querySelector(".album-info").classList.add("player-dark-theme");
        document.querySelector("use").classList.add("player-dark-theme");

        document.querySelectorAll(".player-controls-item").forEach(e => {
            e.classList.add("player-dark-theme");
        });

        document.querySelectorAll("label").forEach(e => {
            e.classList.add("player-dark-theme");
        });

        document.querySelectorAll("button").forEach(e => {
            e.classList.add("player-dark-theme");
        });
    } else {
        // Disable dark mode
        document.body.classList.remove('dark-theme');
        document.querySelector(".player").classList.remove("player-dark-theme");
        document.querySelector("#eq").classList.remove("player-dark-theme");
        document.querySelector(".modal").classList.remove("player-dark-theme");
        document.querySelector(".album-info").classList.remove("player-dark-theme");
        document.querySelector("use").classList.remove("player-dark-theme");

        document.querySelectorAll(".player-controls-item").forEach(e => {
            e.classList.remove("player-dark-theme");
        });

        document.querySelectorAll("label").forEach(e => {
            e.classList.remove("player-dark-theme");
        });

        document.querySelectorAll("button").forEach(e => {
            e.classList.remove("player-dark-theme");
        });
    }
});

// Settings
const rightAlignElements = document.querySelectorAll('.right-align');
const modal = document.querySelector('.modal');

rightAlignElements.forEach(element => {
    element.addEventListener('click', () => {
        document.querySelector(".settings").style.display = "none";

        if (element.parentElement.classList.contains("theme")) {
            document.querySelector(".subsettings .theme").style.display = 'block';
        } else if (element.parentElement.classList.contains("account")) {
            document.querySelector(".subsettings .account").style.display = 'block';
            user.getAccountDetails(session);
        } else if (element.parentElement.classList.contains("addsong")) {
            document.querySelector(".subsettings .addsong").style.display = 'block';
        }

        if (element.classList.contains("sub")) {
            document.querySelector(".subsettings .addsong").style.display = 'none';
            document.querySelector(".subsettings .account").style.display = 'none';
            document.querySelector(".subsettings .theme").style.display = 'none';
            document.querySelector(".settings").style.display = "block";
        }
    });
});


// Change color
const themeDiv = document.querySelector('body');
const changeBgInput = document.querySelector("#change-bg");
const changeCardInput = document.querySelector("#change-card");
const changeTextInput = document.querySelector("#change-text");

// Event listener za spremanje promijenjenih boja
document.querySelector(".save-color").addEventListener('click', element => {
    const backgroundColor = changeBgInput.value;
    const cardColor = changeCardInput.value;
    const textColor = changeTextInput.value;

    // Postavljanje boja na temu
    themeDiv.style.backgroundColor = backgroundColor;
    const cardChange = document.querySelectorAll(".player, #eq, .modal, .album-info, use, .player-controls-item, label, button");
    cardChange.forEach(e => {
        e.style.backgroundColor = cardColor;
    });
    const textChange = document.querySelectorAll("body, .player, #eq, .modal, .album-info, use, .player-controls-item, label, button");

    textChange.forEach(e => {
        e.style.color = textColor;
    });

    // Spremanje promijenjenih boja
    const user = new User();
    user.saveTheme(session, { backgroundColor, cardColor, textColor });
});

// Event listener za promjenu boje pozadine
changeBgInput.addEventListener('input', element => {
    const backgroundColor = element.target.value;
    themeDiv.style.backgroundColor = backgroundColor;
});

// Event listener za promjenu boje kartice
changeCardInput.addEventListener('input', element => {
    const cardColor = element.target.value;
    const elementsToChange = document.querySelectorAll(".player, #eq, .modal, .album-info, use, .player-controls-item, label, button");
    elementsToChange.forEach(e => {
        e.style.backgroundColor = cardColor;
    });
});

// Event listener za promjenu boje teksta
changeTextInput.addEventListener('input', element => {
    const textColor = element.target.value;
    const elementsToChange = document.querySelectorAll("body, .player, #eq, .modal, .album-info, use, .player-controls-item, label, button");
    elementsToChange.forEach(e => {
        e.style.color = textColor;
    });
});

// Event listener za resetiranje boja
document.querySelector(".reset-color").addEventListener("click", () => {
    document.querySelectorAll("body .player, #eq, .modal, .album-info, use, .player-controls-item, label, button").forEach(element => {
        element.style.cssText = '';
    });
});

// Event listener za dohvaćanje i spremanje korisničkih podataka
document.querySelector('.account button').addEventListener('click', () => {
    const user = new User();
    user.getAccountDetails(session);
    user.saveChanges(session);
});

// Event listener za dodavanje pjesme
document.getElementById('dodaj').addEventListener('click', function() {
    let song = new Song();
    song.addSong();
});
