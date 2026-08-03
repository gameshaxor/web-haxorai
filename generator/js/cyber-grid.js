/*!
 * HaxorAI Cyber Grid Animation
 * File : cyber-grid.js
 * Neon Moving Grid Effect
 * https://web.haxorai.com
 */

(() => {
    "use strict";


    // ==========================
    // Prevent Double Load
    // ==========================

    if (window.__HAXORAI_CYBER_GRID__) return;
    window.__HAXORAI_CYBER_GRID__ = true;



    // ==========================
    // Canvas Setup
    // ==========================

    const canvas = document.createElement("canvas");

    canvas.id = "haxorai-cyber-grid";

    canvas.style.cssText = `
        position:fixed;
        inset:0;
        width:100%;
        height:100%;
        pointer-events:none;
        z-index:999998;
        opacity:.55;
    `;


    document.body.appendChild(canvas);


    const ctx = canvas.getContext("2d");


    let width;
    let height;



    function resize(){

        width = canvas.width =
            window.innerWidth * window.devicePixelRatio;

        height = canvas.height =
            window.innerHeight * window.devicePixelRatio;


        ctx.setTransform(
            window.devicePixelRatio,
            0,
            0,
            window.devicePixelRatio,
            0,
            0
        );

    }


    resize();


    window.addEventListener(
        "resize",
        resize
    );



    // ==========================
    // Grid Configuration
    // ==========================

    const gridSize = 45;

    let offset = 0;

    let speed = 0.7;



    // ==========================
    // Draw Horizon Glow
    // ==========================

    function drawGlow(){

        const gradient =
            ctx.createLinearGradient(
                0,
                height,
                0,
                0
            );


        gradient.addColorStop(
            0,
            "rgba(0,255,255,0.18)"
        );


        gradient.addColorStop(
            0.5,
            "rgba(0,100,255,0.05)"
        );


        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );


        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

    }




    // ==========================
    // Draw Cyber Grid
    // ==========================

    function drawGrid(){


        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        drawGlow();


        ctx.lineWidth = 1;


        ctx.strokeStyle =
            "rgba(0,255,255,0.25)";



        // Horizontal Lines

        for(
            let y = offset;
            y < window.innerHeight;
            y += gridSize
        ){

            ctx.beginPath();

            ctx.moveTo(
                0,
                y
            );


            ctx.lineTo(
                window.innerWidth,
                y
            );


            ctx.stroke();

        }




        // Vertical Lines

        for(
            let x = 0;
            x < window.innerWidth;
            x += gridSize
        ){

            ctx.beginPath();

            ctx.moveTo(
                x,
                0
            );


            ctx.lineTo(
                x,
                window.innerHeight
            );


            ctx.stroke();

        }




        // Moving Scan Line

        const scan =
            window.innerHeight -
            ((Date.now()/8)%window.innerHeight);



        const scanGradient =
            ctx.createLinearGradient(
                0,
                scan-80,
                0,
                scan+80
            );


        scanGradient.addColorStop(
            0,
            "rgba(0,255,255,0)"
        );


        scanGradient.addColorStop(
            .5,
            "rgba(0,255,255,.35)"
        );


        scanGradient.addColorStop(
            1,
            "rgba(0,255,255,0)"
        );



        ctx.fillStyle =
            scanGradient;


        ctx.fillRect(
            0,
            scan-80,
            window.innerWidth,
            160
        );



        offset += speed;


        if(offset >= gridSize){

            offset = 0;

        }


        requestAnimationFrame(drawGrid);

    }


    drawGrid();



})();
