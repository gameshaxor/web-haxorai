/*!
 * HaxorAI Heart Floating
 * https://web.haxorai.com
 * Wedding Love Animation
 * CSS Generated Heart
 * No Image
 * No Emoji
 */

(() => {

"use strict";


// ==========================
// CLEAN OLD INSTANCE
// ==========================

if(window.__HAXORAI_HEART_FLOATING__) {


    try {


        cancelAnimationFrame(
            window.__HAXORAI_HEART_FLOATING__.animation
        );


        window
        .__HAXORAI_HEART_FLOATING__
        .container
        .remove();



    } catch(e){}



    delete window.__HAXORAI_HEART_FLOATING__;

}





// ==========================
// CONFIG
// ==========================

const CONFIG = {

    count:60,

    colors:[

        "#ff4d6d",
        "#ff758f",
        "#ff8fa3",
        "#ffb3c6",
        "#ffccd5"

    ]

};





// ==========================
// CONTAINER
// ==========================


const container=document.createElement("div");


container.id="haxorai-heart-floating";


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
// CREATE HEART
// ==========================


const hearts=[];



function createHeart(){


    const heart=document.createElement("div");


    const size=random(
        12,
        32
    );


    const color =
    CONFIG.colors[
        Math.floor(
            Math.random()*CONFIG.colors.length
        )
    ];



    heart.style.cssText=`

position:absolute;

width:${size}px;

height:${size}px;

background:${color};

transform:rotate(-45deg);

border-radius:

50% 50% 0 50%;

box-shadow:

0 0 8px ${color},

0 0 18px ${color};

opacity:${random(.5,1)};

`;



    // membuat bentuk hati

    const before=document.createElement("span");

    const after=document.createElement("span");



    before.style.cssText=`

content:"";

position:absolute;

width:100%;

height:100%;

background:${color};

border-radius:50%;

top:-50%;

left:0;

`;



    after.style.cssText=`

content:"";

position:absolute;

width:100%;

height:100%;

background:${color};

border-radius:50%;

top:0;

left:50%;

`;



    heart.appendChild(before);

    heart.appendChild(after);



    container.appendChild(heart);




    hearts.push({

        el:heart,


        x:random(
            0,
            window.innerWidth
        ),


        y:random(
            window.innerHeight,
            window.innerHeight+300
        ),



        speedY:random(
            .5,
            2
        ),



        speedX:random(
            -.8,
            .8
        ),



        wave:random(
            0,
            Math.PI*2
        ),



        waveSpeed:random(
            .01,
            .04
        ),



        rotate:random(
            -20,
            20
        ),



        rotateSpeed:random(
            -.5,
            .5
        )

    });


}





for(let i=0;i<CONFIG.count;i++){

    createHeart();

}





// ==========================
// ANIMATION
// ==========================


let animation;



function animate(){


    hearts.forEach(h=>{


        h.wave += h.waveSpeed;


        h.y -= h.speedY;


        h.x +=
        h.speedX +
        Math.sin(h.wave)*0.7;



        h.rotate += h.rotateSpeed;



        if(h.y < -50){


            h.y =
            window.innerHeight+50;


            h.x =
            random(
                0,
                window.innerWidth
            );


        }



        if(h.x < -50){

            h.x =
            window.innerWidth+50;

        }


        if(h.x > window.innerWidth+50){

            h.x=-50;

        }



        h.el.style.transform=

        `
translate(${h.x}px,${h.y}px)
rotate(-45deg)
rotate(${h.rotate}deg)
`;



    });



    animation=
    requestAnimationFrame(
        animate
    );


}



animate();





// ==========================
// RESIZE
// ==========================


function resizeHandler(){


    hearts.forEach(h=>{


        if(h.x>window.innerWidth){

            h.x=
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


window.__HAXORAI_HEART_FLOATING__={


    container,

    animation,

    resizeHandler


};



})();
