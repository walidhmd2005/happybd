const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (event) => {
    if (!cursor) {
        return;
    }

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";
});

const greetingText = "Today is all about you, your smile, your heart, and every little thing that makes you unforgettable. 💖";
const greetingElement = document.querySelector(".greeting");
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex += 1;
        setTimeout(typeGreeting, 58);
    }
}

const floatingElements = ["💖", "✨", "🌸", "💫", "💕"];

function createFloating() {
    const element = document.createElement("div");
    element.className = "floating";
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + "vw";
    element.style.top = Math.random() * 100 + "vh";
    element.style.fontSize = Math.random() * 18 + 18 + "px";
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

window.addEventListener("load", () => {
    gsap.to("h1", {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    gsap.to(".cta-button", {
        opacity: 1,
        duration: 0.8,
        y: -10,
        ease: "back.out"
    });

    typeGreeting();
    setInterval(createFloating, 900);
});

document.querySelectorAll(".cta-button").forEach((button) => {
    button.addEventListener("mouseenter", () => {
        gsap.to(button, {
            scale: 1.06,
            duration: 0.25
        });
    });

    button.addEventListener("mouseleave", () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.25
        });
    });

    button.addEventListener("click", () => {
        gsap.to("body", {
            opacity: 0,
            duration: 0.75,
            onComplete: () => {
                window.location.href = "cause.html";
            }
        });
    });
});
