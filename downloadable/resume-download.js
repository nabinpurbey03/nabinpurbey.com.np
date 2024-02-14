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
    let validated = true;

    //Error message clear if any
    let inputError = document.querySelectorAll("div");
    inputError.forEach(val => val.innerText = "");

    // Validation
    if (!name.includes(" ")) {
        nameErr.innerText = "Firstname and Lastname must be filled out";
        validated = false;
    }
    if (!email.match(emailRegex)) {
        emailErr.innerText = "Please enter valid email address!";
        validated = false;
    }
    if (desc.length < 5) {
        descErr.innerText = "Please provide some more details.";
        validated = false;
    }

    if(validated){
        form.remove();
        afterValidation();
    }
});

function afterValidation(){
    const body = document.querySelector("body");
    // let img = document.createElement("img");
    // img.src = "../assets/images/profile_pic.png";
    // body.appendChild(img);
    body.innerHTML = "<div class='done'><img src='../assets/images/done.gif' alt='Done'> <br> <button onclick='window.close()'>OK</button></div>";
}


