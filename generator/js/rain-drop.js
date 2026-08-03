/*!
 * HaxorAI Rain Drop
 * https://web.haxorai.com
 * Realistic Rain Animation
 * No Image
 * No Emoji
 */

(() => {

"use strict";


// =================================
// REMOVE OLD INSTANCE
// =================================

if(window.__HAXORAI_RAIN__) {


    try {


        cancelAnimationFrame(
            window.__HAXORAI_RAIN__.animation
        );


        window.removeEventListener(
            "resize",
            window.__HAXORAI_RAIN__.resize
        );


        window.__HAXORAI_RAIN__
        .container
        .remove();


    }catch(e){}



    delete window.__HAXORAI_RAIN__;

}





// =================================
// CONFIG
// =================================


const CONFIG = {

    drops:180,

    minLength:12,

    maxLength:35,

    minSpeed:8,

    maxSpeed:18

};





// =================================
// CONTAINER
// =================================


const container =
document.createElement("div");


container.id =
"haxorai-rain-drop";



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






// =================================
// RANDOM
// =================================


function random(min,max){

return Math.random()*(max-min)+min;

}






// =================================
// CREATE DROPS
// =================================


const drops=[];



function createDrop(){


const el =
document.createElement("span");



const length =
random(
CONFIG.minLength,
CONFIG.maxLength
);



const speed =
random(
CONFIG.minSpeed,
CONFIG.maxSpeed
);



el.style.cssText = `


position:absolute;


width:1px;


height:${length}px;


background:
linear-gradient(
transparent,
rgba(255,255,255,.85)
);


opacity:${random(.25,.8)};


filter:
blur(.2px);


transform:
rotate(18deg);


`;



container.appendChild(el);



drops.push({


el,


x:
random(
0,
window.innerWidth
),



y:
random(
-window.innerHeight,
0
),



speed,



wind:
random(
-1,
1
)



});



}




for(let i=0;i<CONFIG.drops;i++){

createDrop();

}






// =================================
// ANIMATION
// =================================


let animation=0;



function animate(){



const height =
window.innerHeight;



const width =
window.innerWidth;



drops.forEach(drop=>{



drop.y += drop.speed;


drop.x += drop.wind;



if(drop.y >
height + 50){


drop.y =
random(
-200,
0
);



drop.x =
random(
0,
width
);



}



if(
drop.x < -20 ||
drop.x > width+20
){


drop.x =
random(
0,
width
);



}



drop.el.style.transform =

`
translate(
${drop.x}px,
${drop.y}px
)
rotate(18deg)
`;



});



animation =
requestAnimationFrame(
animate
);



}



animate();






// =================================
// RESIZE
// =================================


function resize(){


drops.forEach(drop=>{


if(drop.x >
window.innerWidth){


drop.x =
random(
0,
window.innerWidth
);


}



});



}



window.addEventListener(
"resize",
resize
);






// =================================
// SAVE INSTANCE
// =================================


window.__HAXORAI_RAIN__ = {


container,


animation,


resize


};



})();
