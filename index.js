const form = document.querySelector("form");
const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
let pseudo, email, passeword, confirmPassword;

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = message;
    }
};

const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
        pseudo = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay(
            "pseudo",
            "Le pseudo ne doit pas contenir de caractères spéciaux"
        );
        pseudo = null;
    } else {
        errorDisplay("pseudo", "", true);
        pseudo = value;
    }
};

const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "L'adresse mail n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

const passwordChecker = (value) => {
    progressBar.classList = "";

    if (
        !value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
    ) {
        errorDisplay(
            "password",
            "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
        );
        progressBar.classList.add("progressRed");
        passeword = null;
    } else if (value.length < 12) {
        progressBar.classList.add("progressBlue");
        errorDisplay("password", "", true);
        passeword = value;
    } else {
        progressBar.classList.add("progressGreen");
        errorDisplay("password", "", true);
        passeword = value;
    }
    if (confirmPassword) confirmChecker(confirmPassword);
};

const confirmChecker = (value) => {
    if (value !== passeword) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPassword = false;
    } else {
        errorDisplay("confirm", "", true);
        confirmPassword = true;
    }
};

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "passeword":
                passwordChecker(e.target.value);
                break;
            case "confirm":
                confirmChecker(e.target.value);
                break;
            default:
                nul;
        }
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pseudo && email && passeword && confirmPassword) {
        const data = {
            pseudo,
            email,
            passeword,
        };
        console.log(data);

        inputs.forEach((input) => (input.value = ""));
        progressBar.classList = "";

        pseudo = null;
        email = null;
        passeword = null;
        confirmPassword = null;
        alert("Inscription validée !");
    } else {
        alert("Veuillez remplir correctement les champs requis");
    }
});
