/*!
 * HaxorAI Blood Drop
 * https://web.haxorai.com
 * Horror Blood Rain Animation
 * No Image
 * No Emoji
 */

(() => {

"use strict";


// ==========================
// CLEAN OLD INSTANCE
// ==========================

if(window.__HAXORAI_BLOOD_DROP__) {


    try {


        cancelAnimationFrame(
            window.__HAXORAI_BLOOD_DROP__.animation
        );


        clearInterval(
            window.__HAXORAI_BLOOD_DROP__.timer
        );


        window.__HAXORAI_BLOOD_DROP__
        .container
        .remove();



    }catch(e){}



    delete window.__HAXORAI_BLOOD_DROP__;

}





// ==========================
// CONFIG
// ==========================


const CONFIG = {


    drops:80,


    colors:[

        "#8b0000",
        "#990000",
        "#b30000",
        "#cc0000",
        "#ff0000"

    ]

};







// ==========================
// CONTAINER
// ==========================


const container =
document.createElement("div");


container.id =
"haxorai-blood-drop";



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






// ==========================
// RANDOM
// ==========================


function random(min,max){

return Math.random()*(max-min)+min;

}





// ==========================
// CREATE DROP
// ==========================


const drops=[];



function createDrop(){



const el =
document.createElement("span");



const size =
random(5,16);



const color =
CONFIG.colors[
Math.floor(
Math.random()*CONFIG.colors.length
)
];



el.style.cssText = `

position:absolute;

width:${size}px;

height:${size*2.2}px;

background:${color};

border-radius:

50% 50% 55% 55%;

box-shadow:

0 0 8px ${color},

0 0 18px rgba(255,0,0,.7);


opacity:${random(.5,1)};


transform:rotate(0deg);

`;




container.appendChild(el);



drops.push({


el,


x:random(
0,
window.innerWidth
),



y:random(
-500,
0
),



speed:

random(
1.5,
4
),



swing:

random(
0,
Math.PI*2
),



swingSpeed:

random(
.01,
.04
),



gravity:

random(
0.01,
0.05
),



velocity:0



});



}





for(let i=0;i<CONFIG.drops;i++){

createDrop();

}







// ==========================
// SPLASH EFFECT
// ==========================


function splash(x,y){


for(let i=0;i<5;i++){



const dot =
document.createElement("span");



const size =
random(2,5);



dot.style.cssText = `

position:absolute;

width:${size}px;

height:${size}px;

border-radius:50%;

background:#8b0000;

box-shadow:

0 0 8px #ff0000;

left:${x}px;

top:${y}px;

`;



container.appendChild(dot);



let px=x;

let py=y;



let vx=random(-2,2);

let vy=random(-3,-1);



function move(){



px+=vx;

py+=vy;


vy+=0.12;



dot.style.transform=
`
translate(${px}px,${py}px)
`;



dot.style.opacity-=0.03;



if(dot.style.opacity<=0){

dot.remove();

return;

}



requestAnimationFrame(move);


}



move();



}



}







// ==========================
// ANIMATION
// ==========================


let animation=0;



function animate(){



const h =
window.innerHeight;



drops.forEach(drop=>{



drop.velocity += drop.gravity;



drop.y +=
drop.speed +
drop.velocity;



drop.swing +=
drop.swingSpeed;



drop.x +=
Math.sin(drop.swing)*0.5;



if(drop.y>h+40){


splash(
drop.x,
h-10
);



drop.y=
random(
-200,
0
);



drop.x=
random(
0,
window.innerWidth
);



drop.velocity=0;



}





drop.el.style.transform=

`
translate(
${drop.x}px,
${drop.y}px
)
rotate(180deg)
`;



});




animation =
requestAnimationFrame(
animate
);



}



animate();







// ==========================
// RESIZE
// ==========================


function resizeHandler(){



drops.forEach(drop=>{


if(drop.x>window.innerWidth){

drop.x=
random(
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


window.__HAXORAI_BLOOD_DROP__={


container,


animation,


timer:null,


resizeHandler



};



})();
