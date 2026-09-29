/* ==========================================
   PAGE SYSTEM
========================================== */

const pages =
    document.querySelectorAll(".page");

let currentPage = 0;


/* ==========================================
   UPDATE PAGE
========================================== */

function showPage(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }


    pages.forEach((page, i) => {

        page.classList.remove(
            "active",
            "previous"
        );


        if (i < index) {

            page.classList.add("previous");

        }

    });


    pages[index].classList.add("active");


    currentPage = index;


    document.getElementById(
        "currentPage"
    ).textContent = index + 1;

}


/* ==========================================
   NEXT PAGE
========================================== */

function nextPage() {

    if (currentPage < pages.length - 1) {

        showPage(currentPage + 1);

    }

}


/* ==========================================
   PREVIOUS PAGE
========================================== */

function previousPage() {

    if (currentPage > 0) {

        showPage(currentPage - 1);

    }

}


/* ==========================================
   MUSIC
========================================== */

const music =
    document.getElementById("music");

let playing = false;


function turnVolumeUp() {

    music.volume = 1;

    if (playing) {
        return;
    }

    music.play()
        .then(() => {

            playing = true;

        })
        .catch(() => {

            alert(
                "The music could not start. Check your device volume and try again."
            );

        });

}


/* ==========================================
   START MUSIC AFTER FIRST INTERACTION
========================================== */

document.addEventListener(
    "click",
    function startMusicOnce() {

        if (!playing) {

            music.play()
                .then(() => {

                    playing = true;

                })
                .catch(() => {});

        }

        document.removeEventListener(
            "click",
            startMusicOnce
        );

    }
);


/* ==========================================
   KEYBOARD NAVIGATION
========================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {

            nextPage();

        }

        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* ==========================================
   TOUCH SWIPE
========================================== */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    if (Math.abs(distance) < 60) {
        return;
    }


    if (distance < 0) {

        nextPage();

    } else {

        previousPage();

    }

}


/* ==========================================
   MEMORY CARDS
========================================== */

document.querySelectorAll(".memory-card").forEach((card) => {

    card.addEventListener("click", () => {

        const isFlipped =
            card.classList.toggle("is-flipped");

        card.setAttribute(
            "aria-pressed",
            String(isFlipped)
        );

    });

});
/* =========================
   FOREVER QUESTION
========================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const goodBoy = document.getElementById("goodBoy");

yesBtn.addEventListener("click", () => {

    goodBoy.classList.add("show");

    yesBtn.style.display = "none";
    noBtn.style.display = "none";

});

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", moveNoButton);

function moveNoButton() {

    const area = document.querySelector(".answer-area");

    const maxX = area.offsetWidth / 2 - 50;
    const maxY = 35;

    const randomX = Math.random() * maxX * 2 - maxX;
    const randomY = Math.random() * maxY * 2 - maxY;

    noBtn.style.transform =
        `translate(${randomX}px, ${randomY}px)`;

}/* =========================
   PAGE NAVIGATION BUTTONS
========================= */