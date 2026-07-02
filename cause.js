const reasons = [
    {
        text: "You make ordinary days feel softer, brighter, and easier to love. 💖",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "Your smile has this quiet magic that stays with me long after I see it. 🌸",
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        text: "You deserve a year full of peace, success, laughter, and everything your heart wants. ✨",
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        text: "Thank you for being you, beautiful, kind, funny, and completely unforgettable. 🥳",
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

let currentReasonIndex = 0;
const reasonsContainer = document.getElementById("reasons-container");
const shuffleButton = document.querySelector(".shuffle-button");
const reasonCounter = document.querySelector(".reason-counter");
let isTransitioning = false;
let storyModeEnabled = false;

function createReasonCard(reason) {
    const card = document.createElement("div");
    card.className = "reason-card";

    const text = document.createElement("div");
    text.className = "reason-text";
    text.textContent = reason.emoji + " " + reason.text;

    const gifOverlay = document.createElement("div");
    gifOverlay.className = "gif-overlay";

    const gif = document.createElement("img");
    gif.src = reason.gif;
    gif.alt = "Birthday animation";
    gifOverlay.appendChild(gif);

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 36,
        duration: 0.45,
        ease: "back.out"
    });

    return card;
}

function enterStory() {
    gsap.to("body", {
        opacity: 0,
        duration: 0.75,
        onComplete: () => {
            window.location.href = "last.html";
        }
    });
}

function enableStoryMode() {
    if (storyModeEnabled) {
        return;
    }

    storyModeEnabled = true;
    shuffleButton.textContent = "Enter Memory Lane 💫";
    shuffleButton.classList.add("story-mode");
}

function displayNewReason() {
    if (isTransitioning) {
        return;
    }

    if (storyModeEnabled) {
        enterStory();
        return;
    }

    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        reasonCounter.textContent = "Reason " + (currentReasonIndex + 1) + " / " + reasons.length;
        currentReasonIndex += 1;

        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.08,
                duration: 0.45,
                ease: "elastic.out",
                onComplete: enableStoryMode
            });
        }

        createFloatingElement();
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

shuffleButton.addEventListener("click", () => {
    gsap.to(shuffleButton, {
        scale: 0.94,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

function createFloatingElement() {
    const elements = ["🌸", "✨", "💖", "🦋", "⭐"];
    const element = document.createElement("div");
    element.className = "floating";
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + "px";
    element.style.top = Math.random() * window.innerHeight + "px";
    element.style.fontSize = Math.random() * 18 + 12 + "px";
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 8,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (event) => {
    if (!cursor) {
        return;
    }

    gsap.to(cursor, {
        x: event.clientX - 15,
        y: event.clientY - 15,
        duration: 0.2
    });
});

setInterval(createFloatingElement, 2000);
