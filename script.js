/**
 * Navigation — show/hide sections (no fetch/XHR needed).
 * Works on file://, http://, and https:// without any server.
 */

const navLinks = document.querySelectorAll(".nav-bar ul li");

const SECTIONS = {
    home:      document.getElementById("home-section"),
    about:     document.getElementById("about-section"),
    resume:    document.getElementById("resume-section"),
    portfolio: document.getElementById("portfolio-section"),
    contact:   document.getElementById("contact-section")
};

/** Hide all sections, show the requested one, scroll to top. */
function showSection(name) {
    Object.values(SECTIONS).forEach((s) => (s.style.display = "none"));
    const target = SECTIONS[name];
    target.style.display = "block";

    // Re-trigger CSS entry animations by forcing a reflow
    const animated = target.querySelector(
        ".scale-in-ver-top, .scale-in-ver-bottom, .bounce-in-left, .slide-in-elliptic-left-fwd"
    );
    if (animated) {
        const cls = [...animated.classList].find((c) =>
            ["scale-in-ver-top", "scale-in-ver-bottom", "bounce-in-left", "slide-in-elliptic-left-fwd"].includes(c)
        );
        if (cls) {
            animated.classList.remove(cls);
            void animated.offsetWidth; // force reflow to reset animation
            animated.classList.add(cls);
        }
    }

    // Scroll info-container back to top
    document.querySelector(".info-container").scrollTop = 0;
}

/** Set the active nav item highlight. */
function setActive(index) {
    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");
}

/* Public nav functions called by onclick attributes */
function showHome() {
    showSection("home");
    setActive(0);
}

function showAbout() {
    showSection("about");
    setActive(1);
}

function showResume() {
    showSection("resume");
    setActive(2);
}

function showPortfolio() {
    showSection("portfolio");
    setActive(3);
}

function showContact() {
    showSection("contact");
    setActive(4);
}