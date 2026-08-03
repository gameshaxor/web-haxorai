/*!
 * HaxorAI Cyber Grid Effect
 * File : cyber-grid.js
 * Neon Perspective Grid Animation
 * Compatible with HaxorAI Generator
 * https://web.haxorai.com
 */

(() => {

    "use strict";


    /*
        Prevent duplicate loading
    */

    if (window.__HAXORAI_CYBER_GRID__) {
        return;
    }

    window.__HAXORAI_CYBER_GRID__ = true;



    /*
        Create Canvas
    */

    const canvas = document.createElement("canvas");

    canvas.id = "haxorai-cyber-grid";


    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "999999";

    canvas.style.opacity = "0.55";


    document.body.appendChild(canvas);



    const ctx = canvas.getContext("2d");



    let width = 0;
    let height = 0;



    /*
        Responsive
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
        Grid Configuration
    */

    const config = {

        gridSize: 70,

        offset:0,

        speed:1.2,

        horizon:0.48

    };




    /*
        Draw Grid
    */

    function draw(){


        ctx.clearRect(
            0,
            0,
            width,
            height
        );



        /*
            Dark futuristic overlay
        */

        ctx.fillStyle =
        "rgba(0,0,0,0.18)";


        ctx.fillRect(
            0,
            0,
            width,
            height
        );




        const horizon =
        height * config.horizon;




        /*
            Neon Horizon
        */

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
        "rgba(0,255,255,0.85)";


        ctx.lineWidth = 1;


        ctx.stroke();





        /*
            Vertical Perspective Lines
        */

        for(
            let x=-width;
            x<=width*2;
            x+=config.gridSize
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
            "rgba(0,200,255,0.35)";


            ctx.stroke();


        }




        /*
            Moving Horizontal Grid
        */


        for(
            let y=0;
            y<height;
            y+=config.gridSize
        ){


            let depth =
            y + config.offset;



            let position =
            horizon +
            (depth-horizon)
            *
            1.45;



            ctx.beginPath();


            ctx.moveTo(
                0,
                position
            );


            ctx.lineTo(
                width,
                position
            );



            ctx.strokeStyle =
            "rgba(0,255,255,0.35)";



            ctx.stroke();


        }




        /*
            Neon Scan Line
        */

        const scan =
        (config.offset*4)%height;



        ctx.beginPath();


        ctx.moveTo(
            0,
            scan
        );


        ctx.lineTo(
            width,
            scan
        );


        ctx.strokeStyle =
        "rgba(0,255,255,0.15)";


        ctx.stroke();


    }






    /*
        Animation Loop
    */

    function animate(){


        config.offset +=
        config.speed;



        if(
            config.offset >
            config.gridSize
        ){

            config.offset = 0;

        }



        draw();



        requestAnimationFrame(
            animate
        );

    }



    animate();





})();
