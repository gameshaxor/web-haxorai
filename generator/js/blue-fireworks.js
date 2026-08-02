/*!
 * HaxorAI Blue Fireworks
 * https://web.haxorai.com
 * Canvas Animation Version
 * Generator Compatible
 */

(() => {

    "use strict";


    // ==========================
    // REMOVE OLD INSTANCE
    // ==========================

    if (window.__HAXORAI_BLUE_FIREWORKS__) {

        try {

            cancelAnimationFrame(
                window.__HAXORAI_BLUE_FIREWORKS__.animation
            );

            window.removeEventListener(
                "resize",
                window.__HAXORAI_BLUE_FIREWORKS__.resizeHandler
            );

            window.__HAXORAI_BLUE_FIREWORKS__.canvas.remove();

        } catch (e) {}

        delete window.__HAXORAI_BLUE_FIREWORKS__;

    }



    // ==========================
    // CANVAS
    // ==========================

    const canvas = document.createElement("canvas");

    canvas.id = "haxorai-blue-fireworks";

    const ctx = canvas.getContext("2d");


    canvas.style.cssText = `
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
pointer-events:none;
z-index:999998;
`;


    document.body.appendChild(canvas);



    function resizeCanvas(){

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();



    // ==========================
    // CONFIG
    // ==========================

    const particles = [];

    const fireworks = [];



    // ==========================
    // RANDOM
    // ==========================

    function random(min,max){

        return Math.random() *
        (max-min)+min;

    }



    // ==========================
    // CREATE EXPLOSION
    // ==========================

    function createFirework(){


        const x =
            random(
                canvas.width * .15,
                canvas.width * .85
            );


        const y =
            random(
                canvas.height *.15,
                canvas.height *.55
            );



        const amount =
            random(40,80);



        for(
            let i=0;
            i<amount;
            i++
        ){

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                random(1,5);



            particles.push({

                x,

                y,

                vx:
                    Math.cos(angle)
                    * speed,


                vy:
                    Math.sin(angle)
                    * speed,


                alpha:1,


                size:
                    random(1,3),


                gravity:
                    .03,


                decay:
                    random(
                        .008,
                        .02
                    )

            });

        }


    }



    // ==========================
    // AUTO FIREWORK TIMER
    // ==========================

    setInterval(()=>{

        createFirework();

    },1200);




    // ==========================
    // DRAW
    // ==========================

    function animate(){


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );



        for(
            let i=particles.length-1;
            i>=0;
            i--
        ){

            const p =
                particles[i];


            p.x += p.vx;

            p.y += p.vy;


            p.vy += p.gravity;


            p.alpha -= p.decay;



            ctx.beginPath();


            ctx.fillStyle =
            `
            rgba(
            0,
            170,
            255,
            ${p.alpha}
            )
            `;


            ctx.shadowBlur = 12;


            ctx.shadowColor =
            "#00aaff";



            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI*2
            );


            ctx.fill();



            if(
                p.alpha <=0
            ){

                particles.splice(
                    i,
                    1
                );

            }


        }


        animation =
            requestAnimationFrame(
                animate
            );

    }


    let animation =
        requestAnimationFrame(
            animate
        );




    // ==========================
    // RESIZE SUPPORT
    // ==========================

    function resizeHandler(){

        resizeCanvas();

    }


    window.addEventListener(
        "resize",
        resizeHandler
    );




    // ==========================
    // SAVE INSTANCE
    // ==========================

    window.__HAXORAI_BLUE_FIREWORKS__ = {


        canvas,


        animation,


        resizeHandler


    };



})();
