class User {
  user_id = ''; username = ''; email = ''; password = '';
  api_url = 'https://63ca9e41d0ab64be2b56cc1a.mockapi.io';

  create() {
    let data = {
      username: this.username,
      email: this.email,AbortController,
      password: this.password,

    }
    data = JSON.stringify(data)
      fetch(this.api_url + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data
      }).then(response => response.json) .then(data => {
        let session = new Session();
        session.user_id = data.id;
        session.startSession();
        window.location.href = "player.html"
      })
  }

  deleteUser() {
    fetch(this.api_url + "/users/:1", {
      method: 'DELETE',
    }).then(response => {
      return response.json();
    })
  }

  login() {
    fetch(this.api_url + "/users")
    .then(response => response.json())
    .then(data => {
      let loggi_success = 0;
        data.forEach(db_user => {
            if(db_user.email === this.email && db_user.password === this.password){
                session = new Session();
                session.user_id = db_user.id;
                session.startSession();
                loggi_success = 1;
                window.location.href = "player.html"

            }
        });

        if(loggi_success === 0){
            alert("greska")
        }
    })


}

}