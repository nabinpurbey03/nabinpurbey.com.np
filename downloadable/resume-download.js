const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const desc = document.getElementById("reason").value;
const nameErr = document.getElementById("nameErr");
const emailErr = document.getElementById("emailErr");
const descErr = document.getElementById("descErr");

function validation(){
    if(!name.contains(" ") === " "){
        nameErr.innerHTML = "Please enter Firstname and Last name.";
    }
}

