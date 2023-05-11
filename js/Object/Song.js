class Song {
    length;
    api_url = 'https://63ca9e41d0ab64be2b56cc1a.mockapi.io';

    setTrack(params) {
        fetch(this.api_url + "/song").then(response => response.json()).then(data => {
            wavesurfer.load(data[params].source);
            
            // Set track info
            title.innerText = data[params].name;
            singer.innerText = data[params].artist;
            img.style.background = `url('${data[params].cover}')`;

            document.querySelector(".heart div").innerText = data[params].likes
            
    })
    }

    length() {
        fetch(this.api_url + "/song").then(response => response.json()).then(data => {
            console.log("da");
            this.length = data.length
            console.log(length);
            
     
    })

    }

    addLikes() {
        console.log("+1");
    }


    
}