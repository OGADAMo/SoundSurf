// Player class for managing player functionality
class Player {
    api_url = 'https://63ca9e41d0ab64be2b56cc1a.mockapi.io';

    // Format time in minutes and seconds
    formatTime(seconds) {
        let minutes = (Math.floor(seconds / 60)).toFixed(0);
        let secondsLeft = (seconds % 60).toFixed(0);
        let formattedTime = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
        return formattedTime;
    }

    // Set default values for player
    setDefault() {
        progressBar.style.width = 0 + '%'; // Reset progress bar width
        currentTimeHtml.innerText = "0:00"; // Reset current time display
        durationHtml.innerText = ""; // Reset duration display
        playIcon.setAttribute('href', '#icon-play'); // Set play icon
    }

    // Update play/pause icon based on player state
    updateIcon() {
        playIcon.setAttribute('href', wavesurfer.isPlaying() ? '#icon-pause' : '#icon-play');
    }
}
