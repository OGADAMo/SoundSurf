let session = new Session();
session = session.getSession();

if (session !== "") {
    window.location.href = "player.html"

}
document.querySelector(".registration").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "block"
})

document.querySelector("#closeModal").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none"
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
        maxlength: 50
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

    if (validator.validationPassed()) {
        let user = new User();
        user.username = document.querySelector("#korisnicko_ime").value;
        user.email = document.querySelector("#email").value;
        user.password = document.querySelector("#lozinka").value ;
        user.create();
    }
})

document.querySelector("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    
    let email = document.querySelector("#login_email").value;
    let password = document.querySelector("#login_lozinka").value;

    let user = new User();
    user.email = email;
    user.password = password;
    user.login();
})