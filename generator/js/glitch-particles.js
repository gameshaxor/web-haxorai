/*!
 * HaxorAI Glitch Particles
 * Cyberpunk Digital Effect
 * https://web.haxorai.com
 * No Image
 * No Emoji
 */

(() => {

"use strict";


// =================================
// CLEAN OLD INSTANCE
// =================================

if(window.__HAXORAI_GLITCH_PARTICLES__) {

    try {

        cancelAnimationFrame(
            window.__HAXORAI_GLITCH_PARTICLES__.animation
        );

        clearInterval(
            window.__HAXORAI_GLITCH_PARTICLES__.glitchTimer
        );

        window.__HAXORAI_GLITCH_PARTICLES__
        .container
        .remove();

    } catch(e){}


    delete window.__HAXORAI_GLITCH_PARTICLES__;

}




// =================================
// CONFIG
// =================================

const CONFIG = {

    count:100,

    colors:[

        "#00ffff",
        "#ff00ff",
        "#9d00ff",
        "#00ff66",
        "#ffffff"

    ]

};





// =================================
// CONTAINER
// =================================


const container =
document.createElement("div");


container.id =
"haxorai-glitch-particles";


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
// PARTICLES ARRAY
// =================================

const particles=[];





// =================================
// CREATE DIGITAL PARTICLE
// =================================

function createParticle(){


    const el =
    document.createElement("span");


    const size =
    random(2,8);


    const color =
    CONFIG.colors[
        Math.floor(
            Math.random()*CONFIG.colors.length
        )
    ];



    el.style.cssText = `

position:absolute;

width:${size}px;

height:${size}px;

background:${color};

box-shadow:

0 0 5px ${color},

0 0 15px ${color};

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
            0,
            window.innerHeight
        ),



        vx:random(
            -1,
            1
        ),


        vy:random(
            -1.5,
            1.5
        ),



        glitch:
        random(
            0,
            100
        ),



        rotation:
        random(
            0,
            360
        )

    });


}




for(
let i=0;
i<CONFIG.count;
i++
){

    createParticle();

}





// =================================
// ANIMATION ENGINE
// =================================

let animation=0;



function animate(){


    particles.forEach(p=>{


        p.x += p.vx;

        p.y += p.vy;


        p.rotation += 2;



        if(
            p.x < -20 ||
            p.x > window.innerWidth+20
        ){

            p.vx *= -1;

        }



        if(
            p.y < -20 ||
            p.y > window.innerHeight+20
        ){

            p.vy *= -1;

        }





        let glitchX=0;


        if(
            Math.random() > .97
        ){

            glitchX =
            random(
                -15,
                15
            );

        }





        p.el.style.transform =

        `
translate(
${p.x + glitchX}px,
${p.y}px
)

rotate(
${p.rotation}deg
)

`;



    });



    animation =
    requestAnimationFrame(
        animate
    );

}



animate();






// =================================
// DIGITAL GLITCH FLASH
// =================================


function glitchEffect(){


    container.style.filter =

    `

hue-rotate(
${random(0,360)}deg
)

`;



    setTimeout(()=>{


        container.style.filter="";


    },80);



}



const glitchTimer =
setInterval(

    glitchEffect,

    random(
        1500,
        3000
    )

);





// =================================
// RESIZE
// =================================


function resizeHandler(){


    particles.forEach(p=>{


        if(
            p.x >
            window.innerWidth
        ){

            p.x =
            random(
                0,
                window.innerWidth
            );

        }


        if(
            p.y >
            window.innerHeight
        ){

            p.y =
            random(
                0,
                window.innerHeight
            );

        }


    });


}



window.addEventListener(
"resize",
resizeHandler
);





// =================================
// SAVE INSTANCE
// =================================


window.__HAXORAI_GLITCH_PARTICLES__ = {


    container,


    animation,


    glitchTimer,


    resizeHandler


};



})();
