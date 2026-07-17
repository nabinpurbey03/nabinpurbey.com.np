/**
 * script.js — Portfolio UX logic
 * Handles: navigation, smooth transitions, scroll progress, toasts,
 *          form validation, click-to-copy, and keyboard navigation.
 * Works on file://, http://, and https:// without any server.
 */

/* ========================
   Constants & State
   ======================== */
const navLinks = document.querySelectorAll(".nav-bar ul li");

const SECTIONS = {
    home:      document.getElementById("home-section"),
    about:     document.getElementById("about-section"),
    resume:    document.getElementById("resume-section"),
    portfolio: document.getElementById("portfolio-section"),
    contact:   document.getElementById("contact-section")
};

let currentSection = "home";
let isTransitioning = false;

/* ========================
   Smooth Section Transitions
   ======================== */
function showSection(name) {
    if (name === currentSection || isTransitioning) return;
    isTransitioning = true;

    const leaving  = SECTIONS[currentSection];
    const entering = SECTIONS[name];
    const FADE_OUT = 160; // ms
    const FADE_IN  = 270; // ms

    // Fade-out the leaving section
    leaving.style.transition = `opacity ${FADE_OUT}ms ease, transform ${FADE_OUT}ms ease`;
    leaving.style.opacity    = "0";
    leaving.style.transform  = "translateY(10px)";

    setTimeout(() => {
        // Hide leaving, reset inline styles
        leaving.style.display   = "none";
        leaving.style.opacity   = "";
        leaving.style.transform = "";
        leaving.style.transition = "";

        // Determine the correct display value for the entering section
        const displayType = entering.classList.contains("page-section--centered") ? "flex" : "block";

        // Prepare entering section (invisible)
        entering.style.display   = displayType;
        entering.style.opacity   = "0";
        entering.style.transform = "translateY(10px)";
        entering.style.transition = `opacity ${FADE_IN}ms ease, transform ${FADE_IN}ms ease`;

        // Force reflow so transition fires
        void entering.offsetWidth;

        entering.style.opacity   = "1";
        entering.style.transform = "translateY(0)";

        // Re-trigger CSS entry animations inside the section
        triggerSectionAnimations(entering, name);

        // Scroll info-container back to top
        document.querySelector(".info-container").scrollTop = 0;

        currentSection = name;

        // Clean up inline transition styles after animation completes
        setTimeout(() => {
            entering.style.transition = "";
            entering.style.opacity    = "";
            entering.style.transform  = "";
            isTransitioning = false;
        }, FADE_IN + 20);

    }, FADE_OUT);
}

/** Re-trigger CSS animations on all animated elements inside a section. */
function triggerSectionAnimations(section, name) {
    const entryClasses = [
        "scale-in-ver-top",
        "scale-in-ver-bottom",
        "bounce-in-left",
        "slide-in-elliptic-left-fwd"
    ];

    // Re-trigger section-entry animations
    section.querySelectorAll(entryClasses.map(c => "." + c).join(",")).forEach(el => {
        entryClasses.forEach(cls => {
            if (el.classList.contains(cls)) {
                el.classList.remove(cls);
                void el.offsetWidth;
                el.classList.add(cls);
            }
        });
    });

    // Re-trigger ALL skill bars when entering the resume section
    if (name === "resume") {
        section.querySelectorAll(".scale-in-hor-left").forEach(el => {
            el.classList.remove("scale-in-hor-left");
            void el.offsetWidth;
            el.classList.add("scale-in-hor-left");
        });
    }
}

/* ========================
   Active Nav Highlight
   ======================== */
function setActive(index) {
    navLinks.forEach(link => link.classList.remove("active"));
    navLinks[index].classList.add("active");
}

/* ========================
   Public Nav Functions (called by onclick)
   ======================== */
function showHome()      { showSection("home");      setActive(0); }
function showAbout()     { showSection("about");     setActive(1); }
function showResume()    { showSection("resume");    setActive(2); }
function showPortfolio() { showSection("portfolio"); setActive(3); }
function showContact()   { showSection("contact");   setActive(4); }

/* ========================
   Keyboard Navigation
   ======================== */
navLinks.forEach(li => {
    li.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            li.click();
        }
    });
});

/* ========================
   Toast Notification System
   ======================== */
/**
 * Display a brief toast message.
 * @param {string} message  - Text to show
 * @param {"info"|"success"|"error"} type - Controls accent colour
 * @param {number} duration - Milliseconds before auto-dismiss
 */
function showToast(message, type = "info", duration = 3000) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    // Two rAF frames ensure the initial styles are painted before transitioning
    requestAnimationFrame(() => requestAnimationFrame(() => {
        toast.classList.add("toast-visible");
    }));

    setTimeout(() => {
        toast.classList.remove("toast-visible");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, duration);
}

/* ========================
   Scroll Progress Bar
   ======================== */
(function initScrollProgress() {
    const container = document.querySelector(".info-container");
    const bar       = document.getElementById("scroll-progress-bar");
    if (!bar || !container) return;

    container.addEventListener("scroll", () => {
        const scrollTop    = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress     = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width    = progress + "%";
    }, { passive: true });
})();

/* ========================
   Click-to-Copy Contact Info
   ======================== */
(function initCopyContacts() {
    document.querySelectorAll(".im-container[data-copy]").forEach(card => {
        card.addEventListener("click", () => {
            const text  = card.dataset.copy;
            const label = card.dataset.copyLabel || "Info";

            const doCopy = () => showToast(`${label} copied!`, "info", 2200);

            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(doCopy).catch(() => fallbackCopy(text, doCopy));
            } else {
                fallbackCopy(text, doCopy);
            }
        });
    });

    function fallbackCopy(text, callback) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); callback(); } catch (_) { /* silent */ }
        document.body.removeChild(ta);
    }
})();

/* ========================
   Contact Form — Validation & Simulated Submit
   ======================== */
(function initContactForm() {
    const btn = document.querySelector(".right-im-container > button");
    if (!btn) return;

    btn.addEventListener("click", handleFormSubmit);

    function handleFormSubmit() {
        const fields = {
            name:    document.getElementById("full-name"),
            email:   document.getElementById("email"),
            subject: document.getElementById("subject"),
            message: document.getElementById("message")
        };

        // Clear previous error states
        Object.values(fields).forEach(el => el.classList.remove("input-error"));

        let valid = true;
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fields.name.value.trim())                         { fields.name.classList.add("input-error");    valid = false; }
        if (!emailRx.test(fields.email.value.trim()))          { fields.email.classList.add("input-error");   valid = false; }
        if (!fields.subject.value.trim())                      { fields.subject.classList.add("input-error"); valid = false; }
        if (!fields.message.value.trim())                      { fields.message.classList.add("input-error"); valid = false; }

        if (!valid) {
            showToast("Please fill in all fields correctly.", "error");
            return;
        }

        // Simulate network request (no backend)
        btn.disabled = true;
        btn.textContent = "Sending…";

        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = "Send Message";
            Object.values(fields).forEach(el => { el.value = ""; el.classList.remove("input-error"); });
            showToast("Message sent! I'll get back to you soon. 🎉", "success", 4500);
        }, 1200);
    }
})();