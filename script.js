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
    navLinks.forEach(val => val.classList.remove("puff-in-center"));
    navLinks[1].classList.add("puff-in-center");
}

function loadResume() {
    pageLoader("pages/resume/resume.html");
    navLinks.forEach(val => val.classList.remove("active"));
    navLinks[2].classList.add("active");
    navLinks.forEach(val => val.classList.remove("puff-in-center"));
    navLinks[2].classList.add("puff-in-center");
}

function loadPortfolio() {
    pageLoader("pages/portfolio/portfolio.html");
    navLinks.forEach(val => val.classList.remove("active"));
    navLinks[3].classList.add("active");
    navLinks.forEach(val => val.classList.remove("puff-in-center"));
    navLinks[3].classList.add("puff-in-center");
}

function loadContact() {
    pageLoader("pages/contact/contact.html");
    navLinks.forEach(val => val.classList.remove("active"));
    navLinks[4].classList.add("active");
    navLinks.forEach(val => val.classList.remove("puff-in-center"));
    navLinks[4].classList.add("puff-in-center");
}

function reloadPage() {
    window.location.reload();
    navLinks.forEach(val => val.classList.remove("puff-in-center"));
    navLinks[0].classList.add("puff-in-center");
}