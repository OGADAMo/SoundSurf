class Session {
  user_id = {}; // Stores the user ID
  
  // Method to start a session
  startSession() {
    const d = new Date();
    d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000)); // Set expiration to 2 days in milliseconds
    let expires = "expires=" + d.toUTCString();
    document.cookie = "user_id=" + this.user_id + ";" + expires;
  }
  
  // Method to get the session
  getSession() {
    let name = "user_id=";
    let ca = document.cookie.split(";");
  
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      // Check if the cookie starts with the specified name
      if (c.indexOf(name) === 0) {
        // Return the value of the cookie
        return c.substring(name.length, c.length);
      }
    }
    return ""; // Return an empty string if session is not found
  }
  
  // Method to destroy the session
  destroySession() {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      // Expire the cookie by setting the expiration date to the past
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
}
