/*
HaxorAI Cyber Grid Animation
Created for https://web.haxorai.com/generator

Neon moving grid background
No image dependency
No external library
*/

(function () {

"use strict";


/*
================================
CONFIGURATION
================================
*/

const CONFIG = {
    id: "haxorai-cyber-grid",

    gridSize: 45,

    speed: 0.6,

    perspective: 900,

    opacity: 0.55
};



/*
================================
REMOVE DUPLICATE INSTANCE
================================
*/

const oldCanvas = document.getElementById(CONFIG.id);

if (oldCanvas) {
    oldCanvas.remove();
}



/*
================================
CREATE CANVAS
================================
*/

const canvas = document.createElement("canvas");

canvas.id = CONFIG.id;


canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";

canvas.style.width = "100%";
canvas.style.height = "100%";

canvas.style.pointerEvents = "none";

canvas.style.zIndex = "0";

canvas.style.opacity = CONFIG.opacity;



document.body.appendChild(canvas);



const ctx = canvas.getContext("2d");



let width;
let height;

let offset = 0;



/*
================================
RESIZE
================================
*/

function resize(){

    width = canvas.width =
        window.innerWidth;

    height = canvas.height =
        window.innerHeight;

}


resize();


window.addEventListener(
    "resize",
    resize
);



/*
================================
DRAW GRID
================================
*/

function draw(){

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.save();



    /*
    Perspective center
    */

    ctx.translate(
        width / 2,
        height * 0.45
    );


    ctx.strokeStyle =
        "rgba(0,255,255,0.35)";


    ctx.lineWidth = 1;



    /*
    FLOOR GRID
    */

    let distance = 900;


    for(
        let y = -distance;
        y < distance;
        y += CONFIG.gridSize
    ){

        let scale =
            (y + distance) /
            (distance * 2);


        let py =
            y * scale;


        ctx.beginPath();

        ctx.moveTo(
            -width,
            py
        );

        ctx.lineTo(
            width,
            py
        );


        ctx.stroke();

    }




    /*
    Vertical lines
    */

    for(
        let x=-width;
        x<width;
        x+=CONFIG.gridSize
    ){

        ctx.beginPath();


        ctx.moveTo(
            x,
            -height
        );


        ctx.lineTo(
            x,
            height
        );


        ctx.stroke();

    }



    /*
    Moving neon wave
    */

    offset += CONFIG.speed;


    ctx.strokeStyle =
        "rgba(0,255,120,0.55)";


    ctx.lineWidth = 2;



    ctx.beginPath();


    for(
        let x=-width;
        x<width;
        x+=20
    ){

        let y =
        Math.sin(
            (x + offset) * 0.015
        ) * 40;


        ctx.lineTo(
            x,
            y
        );

    }


    ctx.stroke();



    ctx.restore();



    requestAnimationFrame(draw);

}



draw();




/*
================================
KEEP ABOVE BACKGROUND
================================
*/

const style = document.createElement("style");

style.innerHTML = `

#${CONFIG.id}{
    mix-blend-mode:screen;
}

body > *:not(#${CONFIG.id}){
    position:relative;
    z-index:1;
}

`;

document.head.appendChild(style);



})();
