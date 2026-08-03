/*!
 * HaxorAI Cyber Grid Effect
 * File : cyber-grid.js
 * Modern Canvas Version
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
        z-index:999998;
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


    window.addEventListener(
        "resize",
        resize
    );


    /*
        GRID CONFIG
    */

    const gridSize = 45;

    let offset = 0;


    /*
        PARTICLE DATA
    */

    const particles = [];


    for(let i = 0; i < 80; i++){

        particles.push({

            x:Math.random()*window.innerWidth,

            y:Math.random()*window.innerHeight,

            size:Math.random()*2+1,

            speed:Math.random()*0.8+0.2

        });

    }



    function drawGrid(){


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
            DARK OVERLAY
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
            MOVING GRID
        */


        ctx.lineWidth = 1;


        for(
            let x = -gridSize;
            x < width + gridSize;
            x += gridSize
        ){

            ctx.beginPath();

            ctx.moveTo(
                x + offset,
                0
            );

            ctx.lineTo(
                x + offset,
                height
            );


            ctx.strokeStyle =
            "rgba(0,255,255,0.18)";


            ctx.stroke();

        }



        for(
            let y = 0;
            y < height;
            y += gridSize
        ){

            ctx.beginPath();


            ctx.moveTo(
                0,
                y + offset
            );


            ctx.lineTo(
                width,
                y + offset
            );


            ctx.strokeStyle =
            "rgba(0,255,255,0.18)";


            ctx.stroke();

        }



        /*
            MOVING HORIZONTAL SCAN
        */


        let scan =
        (offset * 5) % height;


        const gradient =
        ctx.createLinearGradient(
            0,
            scan - 80,
            0,
            scan + 80
        );


        gradient.addColorStop(
            0,
            "rgba(0,255,255,0)"
        );


        gradient.addColorStop(
            .5,
            "rgba(0,255,255,0.25)"
        );


        gradient.addColorStop(
            1,
            "rgba(0,255,255,0)"
        );


        ctx.fillStyle = gradient;


        ctx.fillRect(
            0,
            scan - 80,
            width,
            160
        );




        /*
            DIGITAL PARTICLES
        */


        particles.forEach(p=>{


            p.y += p.speed;


            if(p.y > height){

                p.y = -10;

                p.x =
                Math.random()*width;

            }



            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI*2
            );


            ctx.fillStyle =
            "rgba(0,255,255,0.8)";


            ctx.shadowBlur = 10;

            ctx.shadowColor =
            "#00ffff";


            ctx.fill();


            ctx.shadowBlur = 0;


        });



        /*
            GRID MOVEMENT
        */

        offset += 0.35;


        if(offset >= gridSize){

            offset = 0;

        }


        requestAnimationFrame(
            drawGrid
        );

    }



    drawGrid();



})();
