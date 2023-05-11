class Player {
    api_url = 'https://63ca9e41d0ab64be2b56cc1a.mockapi.io';

    formatTime(seconds) {
        // function to format the current time and duration into a more readable format
        let minutes = (Math.floor(seconds / 60)).toFixed(0);
        let secondsLeft = (seconds % 60).toFixed(0);
        let formattedTime = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
        return formattedTime;
    }

    
    setDefault() {
        progressBar.style.width = 0 + '%';
        currentTimeHtml.innerText = "0:00";
        durationHtml.innerText = "";
        playIcon.setAttribute('href', '#icon-play');
    }
    
    updateIcon() {
        playIcon.setAttribute('href', wavesurfer.isPlaying() ? '#icon-pause' : '#icon-play');
    }
}