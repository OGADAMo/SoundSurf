let session = new Session();
session = session.getSession();

if (session !== "") {
    window.location.href = "player.html"

}
document.querySelector(".registration").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "block";
})

document.querySelector("#closeModal").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
})



let config = {
    "korisnicko_ime" : {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    "register_email" : {
        required: true,
        minlength: 5,
        maxlength: 50,

    },
    "register_lozinka" : {
        required: true,
        minlength: 5,
        maxlength: 25,
        matching:"ponovi_lozinka"
    },
    "ponovi_lozinka" : {
        required: true,
        minlength: 5,
        maxlength: 25,
        matching:"register_lozinka"
    }
};

let validator = new Validator(config, "#registrationForm");
document.querySelector("#registrationForm").addEventListener("submit", e => {
    e.preventDefault();

    
    username = document.querySelector("#korisnicko_ime").value;
    email = document.querySelector("#email").value;
    password = document.querySelector("#lozinka").value ;

    let user = new User();
    const isDuplicate =  user.checkDuplicateUser(username, email);
    if (isDuplicate) {
    // Prikaži poruku o grešci - duplicirani korisnik

        alert('Korisnik s istim imenom ili e-mailom već postoji.');

        return;
    }
    if (!email || !password) {
        // Ako korisnik nije unio email ili lozinku, prikaži upozorenje
        alert("Molimo unesite vaš email i lozinku.");
        return; // Prekini daljnju izvršavanje koda
    }
    if (validator.validationPassed()) {
        let user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.create();
        
    }
       
})

document.querySelector("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    
    let email = document.querySelector("#login_email").value;
    let password = document.querySelector("#login_lozinka").value;
    
    if (!email || !password) {
        // Ako korisnik nije unio email ili lozinku, prikaži upozorenje
        alert("Molimo unesite vaš email i lozinku.");
        return; // Prekini daljnju izvršavanje koda
    }

    let user = new User();
    user.email = email;
    user.password = password;
    user.login();
});

document.addEventListener('keyup', (e) => {
    if (e.getModifierState('CapsLock')) {
        document.querySelectorAll(".error").forEach(e => {
            e.innerHTML = "<p>Caps Lock is on</p>";
        })
   

    } else {
        document.querySelectorAll(".error").forEach(e => {
            e.innerHTML = "<p></p>";
        })
        
    }
});