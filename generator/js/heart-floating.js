/*!
 * HaxorAI Heart Floating
 * https://web.haxorai.com
 * Floating Hearts (Pure CSS)
 * No Image
 * No Emoji
 */

(() => {

"use strict";

/* ===========================================================
   REMOVE OLD INSTANCE
=========================================================== */

if (window.__HAXORAI_HEART_FLOATING__) {

    try {

        cancelAnimationFrame(
            window.__HAXORAI_HEART_FLOATING__.animation
        );

        window.removeEventListener(
            "resize",
            window.__HAXORAI_HEART_FLOATING__.resizeHandler
        );

        window.__HAXORAI_HEART_FLOATING__.container.remove();

    } catch(e){}

    delete window.__HAXORAI_HEART_FLOATING__;
}


/* ===========================================================
   CONFIG
=========================================================== */

const CONFIG = {

    count : 45,

    colors : [

        "#ff4d6d",
        "#ff5d8f",
        "#ff6fa5",
        "#ff85b8",
        "#ff9cc8",
        "#ffbfd9"

    ]

};


/* ===========================================================
   CONTAINER
=========================================================== */

const container = document.createElement("div");

container.id = "haxorai-heart-floating";

container.style.cssText = `
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
overflow:hidden;
pointer-events:none;
z-index:999999;
`;

document.body.appendChild(container);


/* ===========================================================
   RANDOM
=========================================================== */

function random(min,max){

    return Math.random()*(max-min)+min;

}


/* ===========================================================
   HEARTS
=========================================================== */

const hearts = [];

function createHeart(){


    const heart = document.createElement("div");

    const size = random(12,30);

    const color =
        CONFIG.colors[
            Math.floor(
                Math.random()*CONFIG.colors.length
            )
        ];


    heart.style.cssText = `
position:absolute;
width:${size}px;
height:${size}px;
background:${color};
transform:rotate(-45deg);
opacity:${random(.45,1)};
box-shadow:
0 0 8px ${color},
0 0 18px ${color};
`;


    const before = document.createElement("span");

    before.style.cssText = `
position:absolute;
width:${size}px;
height:${size}px;
left:0;
top:-50%;
background:${color};
border-radius:50%;
`;

    const after = document.createElement("span");

    after.style.cssText = `
position:absolute;
width:${size}px;
height:${size}px;
left:50%;
top:0;
background:${color};
border-radius:50%;
`;

    heart.appendChild(before);
    heart.appendChild(after);

    container.appendChild(heart);

    hearts.push({

        el : heart,

        x : random(
            0,
            window.innerWidth
        ),

        y : random(
            window.innerHeight,
            window.innerHeight+300
        ),

        speedY : random(.5,1.8),

        speedX : random(-.3,.3),

        rotate : random(-8,8),

        angle : random(0,360),

        swing : random(
            0,
            Math.PI*2
        ),

        swingSpeed : random(.01,.03),

        scale : random(.7,1.3)

    });

}


for(let i=0;i<CONFIG.count;i++){

    createHeart();

}


/* ===========================================================
   LOOP
=========================================================== */

let animation = 0;

function animate(){


    const w = window.innerWidth;


    hearts.forEach(h=>{


        h.swing += h.swingSpeed;

        h.y -= h.speedY;

        h.x +=
            h.speedX +
            Math.sin(h.swing)*0.7;

        h.angle += h.rotate;


        if(h.y < -80){

            h.y =
                window.innerHeight+60;

            h.x =
                random(
                    0,
                    w
                );

        }


        h.el.style.transform =

`translate(${h.x}px,${h.y}px)
 rotate(${h.angle}deg)
 scale(${h.scale})`;



    });


    animation =
        requestAnimationFrame(
            animate
        );

}

animate();


/* ===========================================================
   RESIZE
=========================================================== */

function resizeHandler(){

    const w = window.innerWidth;

    hearts.forEach(h=>{

        if(h.x>w){

            h.x = random(0,w);

        }

    });

}

window.addEventListener(
    "resize",
    resizeHandler
);


/* ===========================================================
   SAVE INSTANCE
=========================================================== */

window.__HAXORAI_HEART_FLOATING__ = {

    container,

    animation,

    resizeHandler

};

})();
