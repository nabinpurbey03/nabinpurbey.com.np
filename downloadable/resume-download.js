const form = document.getElementById("myForm");
form.addEventListener("submit", event => {
    event.preventDefault();
    // Form input initialization
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const desc = document.getElementById("reason").value;
    let nameErr = document.getElementById("nameErr");
    let emailErr = document.getElementById("emailErr");
    let descErr = document.getElementById("descErr");
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //Error message clear if any
    let inputError = document.querySelectorAll("div");
    inputError.forEach(val => val.innerText = "");

    // Validation
    if (!name.includes(" ")) {
        nameErr.innerText = "Firstname and Lastname must be filled out";
    }
    if (!email.match(emailRegex)) {
        emailErr.innerText = "Please enter valid email address!";
    }
    if (desc.length < 60) {
        descErr.innerText = "Please provide some more details.";
    }
});



