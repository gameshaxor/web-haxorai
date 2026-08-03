/*!
 * HaxorAI Star Space
 * https://web.haxorai.com
 * Galaxy Star Animation
 * No Image
 * No Emoji
 */

(() => {

"use strict";


// =================================
// CLEAN OLD INSTANCE
// =================================

if(window.__HAXORAI_STAR_SPACE__) {


    try {


        cancelAnimationFrame(
            window.__HAXORAI_STAR_SPACE__.animation
        );


        clearInterval(
            window.__HAXORAI_STAR_SPACE__.timer
        );


        window.removeEventListener(
            "resize",
            window.__HAXORAI_STAR_SPACE__.resizeHandler
        );


        window.__HAXORAI_STAR_SPACE__
        .container
        .remove();


    }catch(e){}



    delete window.__HAXORAI_STAR_SPACE__;

}





// =================================
// CONFIG
// =================================

const CONFIG={


    stars:180,


    colors:[

        "#ffffff",
        "#bde7ff",
        "#ffe9a8",
        "#ffd6ff"

    ],


    shootingStar:true


};





// =================================
// CONTAINER
// =================================

const container=document.createElement("div");


container.id="haxorai-star-space";


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





// =================================
// RANDOM
// =================================

function random(min,max){

    return Math.random()*(max-min)+min;

}





// =================================
// STAR ARRAY
// =================================

const stars=[];





function createStar(){


    const star=document.createElement("span");


    const size=random(1,4);


    const depth=random(.3,1.8);



    const color =
    CONFIG.colors[
        Math.floor(
            Math.random()*CONFIG.colors.length
        )
    ];



    star.style.cssText=`

position:absolute;

width:${size}px;

height:${size}px;

border-radius:50%;

background:${color};

box-shadow:

0 0 ${size*3}px ${color};

opacity:${random(.4,1)};

`;



    container.appendChild(star);



    stars.push({


        el:star,


        x:random(
            0,
            window.innerWidth
        ),


        y:random(
            0,
            window.innerHeight
        ),



        speed:
        random(.15,.8)*depth,



        depth,


        twinkle:
        random(0,Math.PI*2),



        twinkleSpeed:
        random(.01,.05)


    });



}





for(
let i=0;
i<CONFIG.stars;
i++
){

    createStar();

}





// =================================
// SHOOTING STAR
// =================================


function createShootingStar(){


    if(!CONFIG.shootingStar)
        return;



    const star=document.createElement("div");



    const startX=random(
        0,
        window.innerWidth
    );


    const startY=random(
        0,
        window.innerHeight*.4
    );



    star.style.cssText=`

position:absolute;

width:120px;

height:2px;

background:
linear-gradient(
90deg,
transparent,
white
);

opacity:.8;

transform:
rotate(-35deg);

filter:
drop-shadow(
0 0 6px white
);

left:${startX}px;

top:${startY}px;

`;



    container.appendChild(star);



    let x=startX;

    let y=startY;



    let life=0;



    function move(){


        x+=8;

        y+=5;


        life++;


        star.style.transform=

        `
translate(${x}px,${y}px)
rotate(-35deg)
`;



        if(life<25){


            requestAnimationFrame(move);


        }

        else{


            star.remove();


        }


    }


    move();


}





const timer=setInterval(

createShootingStar,

3500

);






// =================================
// ANIMATION
// =================================


let animation=0;



function animate(){



stars.forEach(s=>{


    s.y += s.speed;



    s.twinkle +=
    s.twinkleSpeed;



    const opacity =
    .5 +
    Math.sin(
        s.twinkle
    )*.5;



    s.el.style.opacity =
    opacity;



    if(
        s.y >
        window.innerHeight+10
    ){


        s.y=-10;


        s.x=random(
            0,
            window.innerWidth
        );


    }



    s.el.style.transform=

    `
translate(
${s.x}px,
${s.y}px
)
`;



});



animation=requestAnimationFrame(
animate
);



}



animate();






// =================================
// RESIZE
// =================================


function resizeHandler(){


stars.forEach(s=>{


if(
s.x >
window.innerWidth
){

s.x=random(
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





// =================================
// SAVE INSTANCE
// =================================

window.__HAXORAI_STAR_SPACE__={


container,


animation,


timer,


resizeHandler


};



})();
