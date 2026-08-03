/*!
 * HaxorAI Matrix Rain
 * https://web.haxorai.com
 * Hacker Digital Rain Animation
 * No Image
 * No Emoji
 */

(() => {

"use strict";


// ==========================
// CLEAN OLD INSTANCE
// ==========================

if(window.__HAXORAI_MATRIX_RAIN__) {


    try {


        cancelAnimationFrame(
            window.__HAXORAI_MATRIX_RAIN__.animation
        );


        window.removeEventListener(
            "resize",
            window.__HAXORAI_MATRIX_RAIN__.resizeHandler
        );


        window.__HAXORAI_MATRIX_RAIN__
        .container
        .remove();


    }catch(e){}



    delete window.__HAXORAI_MATRIX_RAIN__;

}




// ==========================
// CONFIG
// ==========================


const CONFIG = {

    columns: 80,

    fontSize: 16,

    speedMin: 2,

    speedMax: 8,

    chars:
    "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*"

};





// ==========================
// CONTAINER
// ==========================


const container =
document.createElement("div");



container.id =
"haxorai-matrix-rain";



container.style.cssText = `

position:fixed;

left:0;

top:0;

width:100%;

height:100%;

overflow:hidden;

pointer-events:none;

background:transparent;

z-index:999999;

font-family:monospace;

`;



document.body.appendChild(container);





// ==========================
// RANDOM
// ==========================


function random(min,max){

return Math.random()*(max-min)+min;

}




function randomChar(){

return CONFIG.chars[
Math.floor(
Math.random()*CONFIG.chars.length
)
];

}





// ==========================
// MATRIX COLUMN
// ==========================


const columns=[];



function createColumn(index){


const column =
document.createElement("div");



const length =
Math.floor(
random(8,25)
);



column.style.cssText=`

position:absolute;

top:${random(-500,0)}px;

left:${index * CONFIG.fontSize}px;

font-size:${CONFIG.fontSize}px;

line-height:${CONFIG.fontSize}px;

font-weight:bold;

writing-mode:vertical-rl;

color:#00ff41;

text-shadow:

0 0 5px #00ff41,

0 0 15px #00ff41;

opacity:${random(.5,1)};

`;



let text="";



for(let i=0;i<length;i++){

text += randomChar();

}



column.textContent=text;



container.appendChild(column);



columns.push({

el:column,

y:parseFloat(column.style.top),

speed:random(
CONFIG.speedMin,
CONFIG.speedMax
),

length

});



}





function generateColumns(){


columns.forEach(c=>{

c.el.remove();

});


columns.length=0;



const amount =
Math.floor(
window.innerWidth /
CONFIG.fontSize
);



for(let i=0;i<amount;i++){

createColumn(i);

}


}




generateColumns();






// ==========================
// ANIMATION
// ==========================


let animation=0;



function animate(){



const height =
window.innerHeight;



columns.forEach(column=>{



column.y += column.speed;



if(column.y >
height + column.length * CONFIG.fontSize){



column.y =
random(
-500,
-50
);



column.speed =
random(
CONFIG.speedMin,
CONFIG.speedMax
);



column.el.textContent="";



for(
let i=0;
i<column.length;
i++
){

column.el.textContent +=
randomChar();

}



}




column.el.style.transform =
`
translateY(${column.y}px)
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


generateColumns();


}



window.addEventListener(
"resize",
resizeHandler
);





// ==========================
// SAVE INSTANCE
// ==========================


window.__HAXORAI_MATRIX_RAIN__={


container,


animation,


resizeHandler


};



})();
