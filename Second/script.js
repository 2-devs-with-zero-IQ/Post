
// Letter

function openLetter(){
    document.getElementById("letter").style.display="block";
    
    // Play music if it was paused (just in case)
    let music = document.getElementById('bg-music');
    if(music) {
        music.volume = 0.5;
        music.play().catch(e => console.log("Audio play prevented", e));
    }

    startConfetti();
}

// Falling Confetti Animation

const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles = [];

function startConfetti(){
    particles = []; // Reset particles
    // Create particles
    for(let i=0;i<150;i++){
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Start above screen
            r: Math.random() * 6 + 2, // Radius
            dx: Math.random() * 2 - 1, // X speed
            dy: Math.random() * 3 + 2, // Y speed
            color: `hsl(${Math.random()*360}, 100%, 60%)`,
            tilt: Math.random() * 10
        });
    }
    requestAnimationFrame(renderConfetti);
}

function renderConfetti(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let activeParticles = false;
    for(let i=0; i<particles.length; i++){
        let p = particles[i];
        
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();
        
        // Update position
        p.x += p.dx;
        p.y += p.dy;
        p.tilt += Math.random() * 0.1;
        
        if (p.y < canvas.height) {
            activeParticles = true;
        }
    }
    
    if (activeParticles) {
        requestAnimationFrame(renderConfetti);
    }
}

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Emergency Smile Feature
const smileBtn = document.getElementById('smile-btn');
const smileModal = document.getElementById('smile-modal');
const closeModal = document.querySelector('.close-modal');
const typingText = document.getElementById('typing-text');
const randomCompliment = document.getElementById('random-compliment');
const anotherSmileBtn = document.getElementById('another-smile');

const compliments = [
    "You are incredibly strong and I believe in you. 💫",
    "Your smile is my absolute favorite thing in the world.",
    "No matter how hard today is, I'm always in your corner.",
    "You make the world a significantly better place just by being in it.",
    "Take a deep breath. You've got this, and I've got you. 🌸",
    "I am so unbelievably proud of everything you do.",
    "You are beautiful, inside and out, today and always."
];

let typeTimeout;

function showModal() {
    smileModal.style.display = "flex";
    setTimeout(() => smileModal.style.opacity = "1", 10); // Trigger transition
    typingText.innerHTML = "";
    randomCompliment.style.opacity = "0";
    randomCompliment.innerHTML = "";
    anotherSmileBtn.style.display = "none";
    
    // Typewriter effect
    const str = "Hey... just wanted to remind you...";
    let i = 0;
    
    function typeWriter() {
        if (i < str.length) {
            typingText.innerHTML += str.charAt(i);
            i++;
            typeTimeout = setTimeout(typeWriter, 80);
        } else {
            setTimeout(generateCompliment, 500);
        }
    }
    clearTimeout(typeTimeout);
    setTimeout(typeWriter, 500);
}

function generateCompliment() {
    randomCompliment.style.opacity = "0";
    setTimeout(() => {
        const rand = Math.floor(Math.random() * compliments.length);
        randomCompliment.innerHTML = compliments[rand];
        randomCompliment.style.opacity = "1";
        anotherSmileBtn.style.display = "inline-block";
    }, 500);
}

if(smileBtn) smileBtn.onclick = showModal;
if(anotherSmileBtn) anotherSmileBtn.onclick = generateCompliment;
if(closeModal) {
    closeModal.onclick = () => {
        smileModal.style.opacity = "0";
        setTimeout(() => { smileModal.style.display = "none"; }, 500);
    }
}

// Magical Mouse Trail
const sparkContainer = document.createElement("div");
sparkContainer.style.position = "fixed";
sparkContainer.style.top = "0";
sparkContainer.style.left = "0";
sparkContainer.style.width = "100%";
sparkContainer.style.height = "100%";
sparkContainer.style.pointerEvents = "none";
sparkContainer.style.zIndex = "9999";
document.body.appendChild(sparkContainer);

document.addEventListener("mousemove", function(e) {
    if(Math.random() > 0.5) return; // Reduce particles slightly
    const spark = document.createElement("div");
    spark.innerHTML = "✨";
    spark.style.position = "absolute";
    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";
    spark.style.fontSize = Math.random() * 10 + 10 + "px";
    spark.style.pointerEvents = "none";
    spark.style.transition = "all 1s ease-out";
    
    sparkContainer.appendChild(spark);
    
    setTimeout(() => {
        spark.style.transform = `translate(${Math.random()*60-30}px, ${Math.random()*60+30}px) scale(0)`;
        spark.style.opacity = "0";
    }, 10);
    
    setTimeout(() => {
        spark.remove();
    }, 1000);
});
