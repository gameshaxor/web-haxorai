/*!
 * HaxorAI Magic Particles
 * https://web.haxorai.com
 * Floating Energy Animation
 * No Image
 * No Emoji
 */

(() => {

"use strict";


// ==========================
// CLEAN OLD INSTANCE
// ==========================

if(window.__HAXORAI_MAGIC_PARTICLES__) {


    try {


        cancelAnimationFrame(
            window.__HAXORAI_MAGIC_PARTICLES__.animation
        );


        clearInterval(
            window.__HAXORAI_MAGIC_PARTICLES__.timer
        );


        window.__HAXORAI_MAGIC_PARTICLES__
        .container
        .remove();


    }catch(e){}



    delete window.__HAXORAI_MAGIC_PARTICLES__;

}





// ==========================
// CONFIG
// ==========================


const CONFIG={

    count:90,

    colors:[

        "#ff66ff",
        "#cc66ff",
        "#66ffff",
        "#ffffff"

    ]

};





// ==========================
// CONTAINER
// ==========================


const container=document.createElement("div");


container.id="haxorai-magic-particles";


container.style.cssText=`

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





// ==========================
// RANDOM
// ==========================


function random(min,max){

return Math.random()*(max-min)+min;

}





// ==========================
// CREATE PARTICLE
// ==========================


const particles=[];



function createParticle(){


const el=document.createElement("span");



const size=random(3,10);



const color=
CONFIG.colors[
Math.floor(
Math.random()*CONFIG.colors.length
)
];



el.style.cssText=`

position:absolute;

width:${size}px;

height:${size}px;

border-radius:50%;

background:${color};

box-shadow:

0 0 8px ${color},

0 0 20px ${color};

opacity:${random(.3,1)};

`;



container.appendChild(el);



particles.push({

el,


x:random(
0,
window.innerWidth
),


y:random(
window.innerHeight,
window.innerHeight+200
),



speedY:random(.4,1.8),


speedX:random(-.6,.6),


wave:random(0,Math.PI*2),


waveSpeed:random(.01,.04),


life:random(.5,1)


});


}





for(let i=0;i<CONFIG.count;i++){

createParticle();

}





// ==========================
// ANIMATION
// ==========================


let animation=0;



function animate(){


particles.forEach(p=>{


p.wave += p.waveSpeed;


p.y -= p.speedY;


p.x +=
p.speedX +
Math.sin(p.wave)*0.5;



if(p.y<-30){


p.y =
window.innerHeight+50;


p.x =
random(
0,
window.innerWidth
);


}



p.el.style.transform=

`
translate(
${p.x}px,
${p.y}px
)
`;



});



animation=requestAnimationFrame(
animate
);


}



animate();





// ==========================
// RESIZE
// ==========================


function resizeHandler(){


particles.forEach(p=>{


if(p.x>window.innerWidth){

p.x=random(
0,
window.innerWidth
);

}


});


}



window.addEventListener(
"resize",
resizeHandler
);





// ==========================
// SAVE INSTANCE
// ==========================


window.__HAXORAI_MAGIC_PARTICLES__={


container,


animation,


timer:null,


resizeHandler


};



})();
