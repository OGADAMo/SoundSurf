class User {
    username = '';
    email = '';
    password = '';
    defaultBackgroundColor = '#dfe7ef';
    defaultCardColor = '#eef3f7';
    defaultTextColor = '#acb8cc';
    api_url = 'https://63ca9e41d0ab64be2b56cc1a.mockapi.io';
  
    // Method to create a new user
    create() {
        let data = {
            username: this.username,
            email: this.email,
            password: this.password,
        };
    
        // Convert data to JSON string
        data = JSON.stringify(data);
    
        // Send a POST request to create a new user
        fetch(this.api_url + "/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            // Create a session and set the user ID
            let session = new Session();
            session.user_id = data.id;
            this.user_id = data.id;
    
            // Start the session and redirect to player.html
            session.startSession();
            window.location.href = "player.html";
        });
    }
  
    // Method to delete a user
    deleteUser(user_id) {
        fetch(`${this.api_url}/users/${user_id}`, {
            method: 'DELETE',
        })
        .then(response => {
            // Destroy the session and redirect to "/"
            let session = new Session();
            session.destroySession();
            window.location.href = "/";
            return response.json();
        });
    }
  
    // Method to log in
    login() {
        fetch(this.api_url + "/users")
        .then(response => response.json())
        .then(data => {
            let loggi_success = 0;
            data.forEach(db_user => {
            if(db_user.email === this.email && db_user.password === this.password){
                // Create a session and set the user ID
                let session = new Session();
                session.user_id = db_user.id;
                session.startSession();
                loggi_success = 1;
                window.location.href = "player.html";
            }
            });
    
            if(loggi_success === 0){
            alert("Error: Invalid credentials");
            }
        });
    }
  
    // Method to save the theme settings for a user
    saveTheme(user_id, background, card, text) {
        let data = {
            background: background,
            card: card,
            text: text
        };
    
        // Send a PUT request to update the user's theme settings
        return fetch(`${this.api_url}/users/${user_id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Theme saved successfully:', data);
        });
    }
  
    // Method to get the theme settings for a user
    getTheme() {
        return fetch(`${this.api_url}/users/${this.user_id}`)
            .then(response => response.json())
            .then(data => {
                let { background } = data;
                let { backgroundColor, cardColor, textColor } = background;
                this.setTheme(backgroundColor, cardColor, textColor);
            })
            .catch(error => {
                console.log('Failed to get theme:', error);
            });
    }
  
    // Method to set the theme for a user
    setTheme(backgroundColor, cardColor, textColor) {
        // Set the background color
        document.body.style.backgroundColor = backgroundColor;
    
        // Set the card color
        let cards = document.querySelectorAll(".player, #eq, .modal, .album-info, use, .player-controls-item, label, button");
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = cardColor;
        }
    
        // Set the text color
        let textElements = document.querySelectorAll("body, .player, #eq, .modal, .album-info, use, .player-controls-item, label, button");
        for (let i = 0; i < textElements.length; i++) {
            textElements[i].style.color = textColor;
        }
    }
    
    // Method to reset the theme to default
    resetTheme() {
        this.setTheme(
            this.defaultBackgroundColor,
            this.defaultCardColor,
            this.defaultTextColor
        );
    }
  
    // Method to get account details
    getAccountDetails(id) {
        fetch(`${this.api_url}/users/${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('ime').value = data.username;
                document.getElementById('email').value = data.email;
            });
    }
  
    // Method to save changes to the account
    saveChanges(id) {
        let newName = document.getElementById('ime').value;
        let newEmail = document.getElementById('email').value;
        let newPassword = document.getElementById('nova-lozinka').value;
    
        let data = {
            username: newName,
            email: newEmail,
            password: newPassword
        };
    
        fetch(`${this.api_url}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json());
    }

    async checkDuplicateUser(name, email) {
        try {
          // Provjera postoje li korisnici s istim imenom ili e-mailom
          const response = await fetch('https://mockapi.io/api/users?name=' + name + '&email=' + email);
          const data = await response.json();
    
          // Ako je vraćen odgovor i postoji barem jedan korisnik, znači da postoje duplicirani podaci
          if (response.ok && data.length > 0) {
            return true; // Duplicirani podaci
          }
    
          return false; // Nema dupliciranih podataka
        } catch (error) {
          return false; // Greška pri provjeri dupliciranih podataka
        }
      }
    
      

    
}
  