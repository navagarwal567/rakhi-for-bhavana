// ===========================
// ELEMENTS
// ===========================

const gift = document.getElementById("gift");
const button = document.getElementById("openBtn");
const light = document.getElementById("light");
const sparkles = document.getElementById("sparkles");

const music = document.getElementById("bgMusic");
const letterMusic = document.getElementById("letterMusic");

const hero = document.querySelector(".hero");
const welcome = document.getElementById("welcome");
const heroPhoto = document.getElementById("heroPhoto");
const letterSection = document.getElementById("letterSection");
const finalSection = document.getElementById("finalSection");

const continueBtn = document.getElementById("continueBtn");
const letterBtn = document.getElementById("letterBtn");
const finalBtn = document.getElementById("finalBtn");
const replayBtn = document.getElementById("replayBtn");

// ===========================
// GIFT OPEN
// ===========================

button.addEventListener("click", () => {

    button.disabled = true;

    gift.classList.add("opening");
    light.classList.add("active");

    music.play().catch(() => {});

    createSparkles();

    setTimeout(() => {

        hero.style.display = "none";

        welcome.classList.add("show");

    },2500);

});

// ===========================
// SPARKLES
// ===========================

function createSparkles(){

    for(let i=0;i<40;i++){

        const spark=document.createElement("div");

        spark.className="spark";

        spark.style.left=Math.random()*100+"vw";
        spark.style.top=(50+Math.random()*20)+"vh";

        sparkles.appendChild(spark);

        setTimeout(()=>{

            spark.remove();

        },2500);

    }

}

// ===========================
// WELCOME
// ===========================

continueBtn.addEventListener("click",()=>{

    welcome.classList.remove("show");

    heroPhoto.classList.add("show");

});

// ===========================
// HERO → LETTER
// ===========================

letterBtn.addEventListener("click",()=>{

    heroPhoto.classList.remove("show");

    letterSection.classList.add("show");

    music.pause();

    music.currentTime = 0;

    if(letterMusic){

        letterMusic.currentTime = 44;

        letterMusic.play().catch(()=>{});

        setTimeout(()=>{

            letterMusic.pause();

            letterMusic.currentTime = 0;

            music.play().catch(()=>{});

        },28000);

    }

});// ===========================
// LETTER → FINAL
// ===========================

finalBtn.addEventListener("click",()=>{

    letterSection.classList.remove("show");

    finalSection.classList.add("show");

    startConfetti();

});

// ===========================
// FIREFLIES
// ===========================

const fireflies = document.getElementById("fireflies");

for(let i=0;i<35;i++){

    const f = document.createElement("span");

    f.style.left = Math.random()*100+"vw";

    f.style.top = Math.random()*100+"vh";

    f.style.animationDelay = Math.random()*8+"s";

    fireflies.appendChild(f);

}
// ===========================
// CONFETTI
// ===========================

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let confetti = [];

function startConfetti(){

    confetti = [];

    for(let i=0;i<180;i++){

        confetti.push({

            x:Math.random()*canvas.width,
            y:-20,
            r:Math.random()*8+4,
            dx:(Math.random()-0.5)*5,
            dy:Math.random()*4+3,
            color:`hsl(${Math.random()*360},100%,60%)`

        });

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confetti.forEach(c=>{

        ctx.beginPath();

        ctx.fillStyle = c.color;

        ctx.arc(c.x,c.y,c.r,0,Math.PI*2);

        ctx.fill();

        c.x += c.dx;
        c.y += c.dy;

    });

    if(confetti.some(c=>c.y < canvas.height + 50)){

        requestAnimationFrame(animateConfetti);

    }

}

// ===========================
// REPLAY
// ===========================

replayBtn.addEventListener("click",()=>{

    location.reload();

});
