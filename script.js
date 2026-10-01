/* =================================
   VARIABLES
================================= */

const errorScreen =
    document.getElementById("errorScreen");

const repairButton =
    document.getElementById("repairButton");

const progressBar =
    document.getElementById("progressBar");

const errorTitle =
    document.getElementById("errorTitle");

const errorMessage =
    document.getElementById("errorMessage");

const hint =
    document.getElementById("hint");

const attemptText =
    document.getElementById("attempt");

const anniversary =
    document.getElementById("anniversary");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const letterReveal =
    document.getElementById("letterReveal");

const letterTrigger =
    document.getElementById("letterTrigger");

const letterContent =
    document.getElementById("letterContent");

const continueButton =
    document.getElementById("continueButton");

const memoriesNextButton =
    document.getElementById("memoriesNextButton");

const memoriesSection =
    document.getElementById("memoriesSection");

const videoSection =
    document.getElementById("videoSection");

const video =
    videoSection.querySelector("video");

const videoEndMessage =
    document.getElementById("videoEndMessage");

const passwordPanel =
    document.getElementById("passwordPanel");

const passwordDisplay =
    document.getElementById("passwordDisplay");

const passwordError =
    document.getElementById("passwordError");

const keypad =
    document.getElementById("keypad");

const secretCode = "120747";

let enteredCode = "";

function showPage(page) {

    document.querySelectorAll(".page").forEach(function (currentPage) {
        currentPage.classList.remove("active");
    });

    page.classList.remove("hidden");
    page.classList.add("active");

}

video.addEventListener(
    "ended",
    function () {

        videoEndMessage.classList.remove("hidden");

    }
);

continueButton.addEventListener(
    "click",
    function () {

        showPage(memoriesSection);

    }
);


memoriesNextButton.addEventListener(
    "click",
    function () {

        showPage(videoSection);

    }
);

/* =================================
   SETTINGS
================================= */

let attempts = 0;

const maxAttempts = 6;


/* =================================
   ERROR MESSAGES
================================= */

const errors = [

    {
        title: "SYSTEM ERROR",
        message: "Something went wrong..."
    },

    {
        title: "ERROR 404",
        message: "Important file not found."
    },

    {
        title: "WARNING",
        message: "Too many memories detected."
    },

    {
        title: "SYSTEM FAILURE",
        message: "Heart.exe is not responding."
    },

    {
        title: "RECOVERY MODE",
        message: "Trying to recover something special..."
    },

    {
        title: "FINAL CHECK",
        message: "One last click..."
    }

];


/* =================================
   CLICK REPAIR
================================= */

repairButton.addEventListener(
    "click",
    function () {

        attempts++;

        /* เปลี่ยนข้อความ */

        const index =
            Math.min(
                attempts,
                errors.length
            ) - 1;

        errorTitle.textContent =
            errors[index].title;

        errorMessage.textContent =
            errors[index].message;


        /* Progress */

        const progress =
            (attempts / maxAttempts) * 100;

        progressBar.style.width =
            progress + "%";


        /* จำนวนครั้ง */

        attemptText.textContent =
            `Attempts: ${attempts} / ${maxAttempts}`;


        /* Glitch */

        errorScreen.classList.remove(
            "shake"
        );

        void errorScreen.offsetWidth;

        errorScreen.classList.add(
            "shake"
        );


        /* Hint */

        const hints = [

            "NOPE... TRY AGAIN",

            "KEEP CLICKING",

            "ARE YOU SURE?",

            "ALMOST...",

            "ONE MORE..."

        ];

        if (attempts < maxAttempts) {

            hint.textContent =
                hints[attempts - 1];

        }


        /* ครบแล้ว */

        if (attempts >= maxAttempts) {

            finish();

        }

    }
);


letterTrigger.addEventListener(
    "click",
    function () {

        passwordPanel.classList.remove("hidden");
        letterReveal.classList.add("letter-open");
        letterTrigger.disabled = true;

    }
);


keypad.addEventListener(
    "click",
    function (event) {

        const key = event.target.closest("button");

        if (!key) {
            return;
        }

        if (key.dataset.digit !== undefined && enteredCode.length < secretCode.length) {

            enteredCode += key.dataset.digit;
            passwordError.textContent = "";

            if (enteredCode.length === secretCode.length && enteredCode === secretCode) {

                passwordPanel.classList.add("hidden");
                letterContent.classList.remove("hidden");
                passwordError.textContent = "";

                requestAnimationFrame(function () {

                    showPage(letterContent.closest(".page"));

                });

            }

            else if (enteredCode.length === secretCode.length) {
                passwordError.textContent = "รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง";
                enteredCode = "";
            }

        }

        passwordDisplay.textContent =
            enteredCode.padEnd(secretCode.length, "-");

    }
);


/* =================================
   FINISH
================================= */

function finish() {

    repairButton.disabled = true;

    repairButton.textContent =
        "RECOVERING...";

    hint.textContent =
        "SYSTEM RESTORATION IN PROGRESS";


    /* Flash */

    setTimeout(function () {

        errorScreen.classList.add(
            "flash"
        );

    }, 400);


    /* Fade */

    setTimeout(function () {

        errorScreen.style.opacity =
            "0";

    }, 700);


    /* เปิดหน้า Anniversary */

    setTimeout(function () {

        errorScreen.classList.add(
            "hidden"
        );

        anniversary.classList.remove(
            "hidden"
        );

        window.scrollTo(0, 0);


        /*
            ลองเปิดเพลงอัตโนมัติ

            ถ้า Browser ไม่ยอม
            ผู้ใช้กด Play ได้เอง
        */

        music.play().catch(
            function () {

                musicButton.textContent =
                    "♫ Play Our Song";

            }
        );

    }, 1100);

}


/* =================================
   MUSIC
================================= */

musicButton.addEventListener(
    "click",
    async function () {

        showPage(letterReveal);
        letterReveal.classList.add("show-letter");

        if (music.paused) {

            try {

                await music.play();

                musicButton.textContent =
                    "♫ Playing Our Song";

            }

            catch (error) {

                musicButton.textContent =
                    "♫ Tap to Play";

            }

        }

    }
);
