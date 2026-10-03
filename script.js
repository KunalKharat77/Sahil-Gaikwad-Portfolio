/* =========================================================
   DOM
========================================================= */

const body = document.body;

const loader = document.querySelector(".loader");

const header = document.querySelector(".header");

const themeToggle = document.querySelector("#themeToggle");

const menuToggle = document.querySelector("#menuToggle");

const nav = document.querySelector(".nav");

const navLinks = document.querySelectorAll(".nav-link");

const backTop = document.querySelector("#backTop");

const scrollProgress = document.querySelector(".scroll-progress");

const revealElements =
    document.querySelectorAll(".reveal");

const skillBars =
    document.querySelectorAll(".skill-bar span");

const counterElements =
    document.querySelectorAll("[data-count]");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

const contactForm =
    document.querySelector("#contactForm");

const formStatus =
    document.querySelector("#formStatus");

const year =
    document.querySelector("#year");


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1200);

});


/* =========================================================
   THEME
========================================================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark =
        body.classList.contains("dark");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );


    themeToggle.innerHTML = isDark

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

});


/* =========================================================
   MOBILE MENU
========================================================= */

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

    menuToggle.classList.toggle("active");

    body.classList.toggle("no-scroll");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.classList.remove("active");

        body.classList.remove("no-scroll");

    });

});


/* =========================================================
   HEADER + SCROLL
========================================================= */

function handleScroll() {

    const scrollY = window.scrollY;


    /* Header */

    if (scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    /* Back to top */

    if (scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }


    /* Scroll progress */

    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;


    const progress =
        (scrollY / documentHeight) * 100;


    scrollProgress.style.width =
        `${progress}%`;

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


/* =========================================================
   BACK TO TOP
========================================================= */

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   SKILL BARS
========================================================= */

const skillObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const bar =
                    entry.target;

                const width =
                    bar.dataset.width;

                bar.style.width = width;

                skillObserver.unobserve(bar);

            });

        },

        {
            threshold: 0.5
        }

    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   COUNTERS
========================================================= */

function animateCounter(element) {

    const target =
        Number(element.dataset.count);

    let current = 0;

    const duration = 1300;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(target * eased);


        element.textContent = current;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent = target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(
                    entry.target
                );

                counterObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.7
        }

    );


counterElements.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   PROJECT FILTER
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projectCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

                requestAnimationFrame(() => {

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                });

            } else {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(15px)";

                setTimeout(() => {

                    card.classList.add("hidden");

                }, 250);

            }

        });

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove("active");


                    if (
                        link.getAttribute("href")
                        === `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

year.textContent =
    new Date().getFullYear();


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorOutline =
    document.querySelector(".cursor-outline");


if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia("(pointer: fine)").matches
) {

    window.addEventListener("mousemove", event => {

        cursorDot.style.left =
            `${event.clientX}px`;

        cursorDot.style.top =
            `${event.clientY}px`;


        cursorOutline.animate(

            {
                left: `${event.clientX}px`,
                top: `${event.clientY}px`
            },

            {
                duration: 450,
                fill: "forwards"
            }

        );

    });


    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorOutline.classList.add(
                    "hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorOutline.classList.remove(
                    "hover"
                );

            }
        );

    });

}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (
    heroVisual &&
    window.matchMedia("(pointer: fine)").matches
) {

    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (window.innerWidth / 2 - event.clientX)
                / 80;

            const y =
                (window.innerHeight / 2 - event.clientY)
                / 80;


            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   PREVENT EMPTY PROJECT LINKS
========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            nav.classList.remove("open");

            menuToggle.classList.remove("active");

            body.classList.remove("no-scroll");

        }

    }
);