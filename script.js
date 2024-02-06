function pageLoader(path) {
    fetch(path).then((response) => {
        return response.text();
    }).then((data) => {
        document.querySelector(".info-container").innerHTML = data;
    }).catch((err) => {
        console.log("error fetching data")
    });
}

const navLinks = document.querySelectorAll(".nav-bar ul li");

function loadAbout() {
    pageLoader("pages/about/about.html");
    navLinks.forEach(val => val.classList.remove("active"));
    navLinks[1].classList.add("active");
}

function loadResume() {
    pageLoader("pages/resume/resume.html");
    navLinks.forEach(val => val.classList.remove("active"));
    navLinks[2].classList.add("active");
}

function loadPortfolio() {
    pageLoader("pages/portfolio/portfolio.html");
    navLinks.forEach(val => val.classList.remove("active"));
    navLinks[3].classList.add("active");
}

function loadContact() {
    pageLoader("pages/contact/contact.html");
    navLinks.forEach(val => val.classList.remove("active"));
    navLinks[4].classList.add("active");
}

function reloadPage() {
    window.location.reload();
}