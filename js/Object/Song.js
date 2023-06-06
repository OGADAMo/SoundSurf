class Song {
  length = '';
  songID = '';
  likes = '';
  api_url = 'https://63ca9e41d0ab64be2b56cc1a.mockapi.io';

  // Method to set the track
  setTrack(params) {
    fetch(this.api_url + "/song")
      .then(response => response.json())
      .then(data => {
        // Load the track
        wavesurfer.load(data[params].source);
        
        // Set track info
        this.songID = data[params].id;
        title.innerText = data[params].name;
        singer.innerText = data[params].artist;
        img.style.background = `url('${data[params].cover}')`;

        document.querySelector(".heart div").innerText = data[params].likes;
      });
  }

  // Method to get the length of songs
  getLength() {
    return fetch(this.api_url + "/song")
      .then(response => response.json())
      .then(data => {
        this.length = data.length;
        return this.length;
      });
  }

  // Method to add likes to a song
  addLikes() {
    fetch(`${this.api_url}/song/${this.songID}`)
      .then(response => response.json())
      .then(song => {
        let currentLikes = song.likes;
        let newLikes = currentLikes + 1;

        // Update the number of likes in the MOCKAPI database
        fetch(`${this.api_url}/song/${this.songID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ likes: newLikes })
        })
          .then(response => response.json())
          .then(updatedSong => {
            // Update the display of the number of likes
            document.querySelector(".heart div").innerText = updatedSong.likes;
          });
      });
  }

  // Method to add a new song
  addSong() {
    let name = document.getElementById('name').value;
    let artist = document.getElementById('artist').value;
    let cover = document.getElementById('cover').value;
    let source = document.getElementById('source').value;

    let data = {
      likes: 0,
      name: name,
      artist: artist,
      cover: cover,
      source: source
    };

    fetch(`${this.api_url}/song`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('New song added:', data);
      });
  }
}
