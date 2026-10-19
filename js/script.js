/* =========================================
   ZEENAT LIAVULE PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("show");

        if (navMenu.classList.contains("show")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });


    /* Close menu when a link is clicked */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

            menuBtn.textContent = "☰";

        });

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    links.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   SUPABASE CONTACT FORM
========================================= */

// This is a public/publishable key intended for browser use.
// Database access is restricted by row-level security policies in Supabase.
const SUPABASE_URL = "https://jrkkmvotgqflbtllkrpx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_pGQMhs4iYtlylfpTjlZv7Q_cwvuGM_s";

const contactForm = document.querySelector(".contact-form");
const contactStatus = document.querySelector(".contact-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        const payload = {
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            subject: String(formData.get("subject") || "").trim(),
            message: String(formData.get("message") || "").trim()
        };

        if (!window.supabase || !window.supabase.createClient) {
            if (contactStatus) contactStatus.textContent = "The contact service is unavailable right now. Please email zeenatliavule@gmail.com.";
            return;
        }

        const originalButtonText = submitButton ? submitButton.textContent : "";
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending…";
        }
        if (contactStatus) contactStatus.textContent = "";

        try {
            const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
            const { error } = await client
                .from("portfolio_contact_messages")
                .insert([payload]);
            if (error) throw error;

            if (contactStatus) contactStatus.textContent = "Thank you! Your message has been sent successfully.";
            contactForm.reset();
        } catch (error) {
            console.error("Contact form submission failed:", error);
            if (contactStatus) contactStatus.textContent = "Sorry, your message could not be sent. Please email zeenatliavule@gmail.com instead.";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".education-card, .skill-card, .project-card, .certificate-card"
);

const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});