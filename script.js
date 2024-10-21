class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || "";
            const to = newText[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}
// Modified for your name
const phrases = ["Hassan", "Hassan Murtaza", "H. Murtaza", "Hassan M.", "HM"];
document.addEventListener("DOMContentLoaded", (event) => {
    const el = document.querySelector(".text");
    const fx = new TextScramble(el);
    let counter = 0;
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000);
        });
        counter = (counter + 1) % phrases.length;
    };
    next();
});
document.addEventListener("DOMContentLoaded", function () {
    const text = `Where innovation meets inspiration, I find my path.
Building bridges between creativity and technology.`;
    const speed = 30; // Typing speed in milliseconds
    let i = 0;
    const descriptionElement = document.getElementById("typed-description");
    function typeWriter() {
        if (i < text.length) {
            descriptionElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Start blinking animation after typing is complete
            descriptionElement.style.animation =
                "blink-caret .75s step-end infinite";
        }
    }
    typeWriter();
});
document.addEventListener("DOMContentLoaded", function () {
    const blob = document.querySelector(".jelly-blob"); // Select the existing blob
    let mouseX = 0,
        mouseY = 0; // Mouse coordinates
    let blobX = window.innerWidth / 2; // Starting blob X position
    let blobY = window.innerHeight / 2; // Starting blob Y position
    const speed = 0.1; // Speed of following
    // Mouse move event to update mouse coordinates
    document.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });
    function animateBlob() {
        // Move the blob toward the mouse position with some delay
        blobX += (mouseX - blobX) * speed; // Interpolating X position
        blobY += (mouseY - blobY) * speed; // Interpolating Y position
        // Update the blob's CSS transform property
        blob.style.transform = `translate(${blobX - 15}px, ${blobY - 90}px)`;
        requestAnimationFrame(animateBlob); // Continue the animation
    }
    animateBlob(); // Start the animation
});
document.addEventListener('DOMContentLoaded', (event) => {
    const introSound = document.getElementById('hoverSound');

    // Function to start the audio sequence
    function startAudioSequence() {
        introSound.play().then(() => {
            // Set up an event listener for when the intro finishes
            introSound.addEventListener('ended', () => {
                // Fade in the background music
                backgroundMusic.volume = 0;
                backgroundMusic.play();
                fadeInAudio(backgroundMusic);
            }, { once: true });
        }).catch(e => console.error('Error playing intro sound:', e));
    }

    // Function to fade in audio
    function fadeInAudio(audioElement) {
        let volume = 0;
        const fadeInInterval = setInterval(() => {
            if (volume < 1) {
                volume += 0.1;
                audioElement.volume = volume;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 200);
    }

    // Start audio sequence on first user interaction
    startAudioSequence();
});