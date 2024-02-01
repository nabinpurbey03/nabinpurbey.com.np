function loadAbout() {
    fetch("pages/about/about.html").then((response) => {
        return response.text();
    }).then((data) => {
        document.querySelector(".info-container").innerHTML = data;
    }).catch((err) => {
        console.log("error fetching data")
    });
}

function loadResume() {
    fetch("pages/resume/resume.html").then((response) => {
        return response.text();
    }).then((data) => {
        document.querySelector(".info-container").innerHTML = data;
    }).catch((err) => {
        console.log("error fetching data")
    });
}
function loadPortfolio() {
    fetch("pages/portfolio/portfolio.html").then((response) => {
        return response.text();
    }).then((data) => {
        document.querySelector(".info-container").innerHTML = data;
    }).catch((err) => {
        console.log("error fetching data")
    });
}

function loadContact() {
    fetch("pages/contact/contact.html").then((response) => {
        return response.text();
    }).then((data) => {
        document.querySelector(".info-container").innerHTML = data;
    }).catch((err) => {
        console.log("error fetching data")
    });
}

function reloadPage(){
    window.location.reload();
}