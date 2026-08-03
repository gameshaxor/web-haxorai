/*!
 * HaxorAI Cyber Grid Effect
 * File : cyber-grid.js
 * Modern Neon Grid Animation
 * https://web.haxorai.com
 */

(() => {
    "use strict";

    // Hindari double load
    if (window.__HAXORAI_CYBER_GRID__) return;
    window.__HAXORAI_CYBER_GRID__ = true;


    const canvas = document.createElement("canvas");

    canvas.id = "haxorai-cyber-grid";

    canvas.style.cssText = `
        position:fixed;
        inset:0;
        width:100%;
        height:100%;
        pointer-events:none;
        z-index:999997;
        opacity:.45;
    `;


    document.body.appendChild(canvas);


    const ctx = canvas.getContext("2d");


    let width;
    let height;


    function resize(){

        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

    }


    resize();

    window.addEventListener("resize", resize);



    /*
        GRID SETTINGS
    */

    const grid = {

        size:80,

        offset:0,

        speed:0.7,

        perspective:0.035

    };



    function drawBackground(){

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
            Dark transparent overlay
        */

        ctx.fillStyle =
            "rgba(0,0,0,0.15)";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );



        /*
            Horizon
        */

        const horizon =
            height * 0.45;



        ctx.beginPath();

        ctx.moveTo(
            0,
            horizon
        );

        ctx.lineTo(
            width,
            horizon
        );


        ctx.strokeStyle =
            "rgba(0,255,255,.8)";

        ctx.lineWidth = 1;


        ctx.stroke();



        /*
            Vertical cyber lines
        */

        for(
            let x=-width;
            x<width*2;
            x+=grid.size
        ){

            ctx.beginPath();


            ctx.moveTo(
                width/2,
                horizon
            );


            ctx.lineTo(
                x,
                height
            );


            ctx.strokeStyle =
            "rgba(0,255,255,.35)";


            ctx.stroke();

        }




        /*
            Moving horizontal lines
        */

        for(
            let y=0;
            y<height;
            y+=grid.size
        ){


            let depth =
            y + grid.offset;


            let perspective =
            horizon +
            (depth-horizon)
            *
            1.4;



            ctx.beginPath();


            ctx.moveTo(
                0,
                perspective
            );


            ctx.lineTo(
                width,
                perspective
            );


            ctx.strokeStyle =
            "rgba(0,150,255,.35)";


            ctx.stroke();


        }

    }



    function animate(){


        grid.offset += grid.speed;


        if(
            grid.offset >
            grid.size
        ){

            grid.offset = 0;

        }



        drawBackground();



        requestAnimationFrame(
            animate
        );

    }



    animate();



})();
