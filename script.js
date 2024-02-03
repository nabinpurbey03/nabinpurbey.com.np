function pageLoader(path){
    fetch(path).then((response) => {
        return response.text();
    }).then((data) => {
        document.querySelector(".info-container").innerHTML = data;
    }).catch((err) => {
        console.log("error fetching data")
    });
}
function loadAbout() {
    pageLoader("pages/about/about.html");
}

function loadResume() {
    pageLoader("pages/resume/resume.html");
}
function loadPortfolio() {
    pageLoader("pages/portfolio/portfolio.html");
}

function loadContact() {
    pageLoader("pages/contact/contact.html");
}

function reloadPage(){
    window.location.reload();
}