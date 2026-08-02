/*!
 * HaxorAI Pink Fireworks
 * https://web.haxorai.com
 * Particle Animation Version
 * No Image
 * No Emoji
 */

(() => {

    "use strict";


    // ==========================
    // CLEAN OLD INSTANCE
    // ==========================

    if (window.__HAXORAI_PINK_FIREWORKS__) {

        try {

            cancelAnimationFrame(
                window.__HAXORAI_PINK_FIREWORKS__.animation
            );

            clearInterval(
                window.__HAXORAI_PINK_FIREWORKS__.timer
            );

            window.removeEventListener(
                "click",
                window.__HAXORAI_PINK_FIREWORKS__.click
            );


            window.__HAXORAI_PINK_FIREWORKS__.container.remove();


        } catch(e){}


        delete window.__HAXORAI_PINK_FIREWORKS__;

    }



    // ==========================
    // CONFIG
    // ==========================

    const CONFIG = {

        autoFireworks : true,

        interval : 1300,

        particles : 45,

        colors : [

            "#ff69b4",
            "#ff1493",
            "#ff85c1",
            "#ffc0cb",
            "#ff0080"

        ]

    };



    // ==========================
    // CONTAINER
    // ==========================

    const container =
        document.createElement("div");


    container.id =
        "haxorai-pink-fireworks";


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





    // ==========================
    // RANDOM
    // ==========================

    function random(min,max){

        return Math.random()*(max-min)+min;

    }




    // ==========================
    // CREATE FIREWORK
    // ==========================

    function createFirework(x,y){


        const particles=[];


        for(let i=0;i<CONFIG.particles;i++){


            const particle =
                document.createElement("span");


            const angle =
                Math.random()*Math.PI*2;


            const speed =
                random(2,7);



            const color =
                CONFIG.colors[
                    Math.floor(
                        Math.random()*CONFIG.colors.length
                    )
                ];



            particle.style.cssText=`

position:absolute;

width:${random(3,7)}px;

height:${random(3,7)}px;

border-radius:50%;

background:${color};

box-shadow:
0 0 8px ${color},
0 0 16px ${color};

left:${x}px;

top:${y}px;

pointer-events:none;

`;



            container.appendChild(
                particle
            );



            particles.push({

                el:particle,

                x,

                y,

                vx:
                Math.cos(angle)*speed,

                vy:
                Math.sin(angle)*speed,


                alpha:1


            });


        }



        animateParticles(
            particles
        );


    }





    // ==========================
    // PARTICLE ANIMATION
    // ==========================


    function animateParticles(parts){


        function loop(){


            let alive=false;



            parts.forEach(p=>{


                if(p.alpha<=0)
                    return;



                alive=true;



                p.x += p.vx;

                p.y += p.vy;



                p.vy +=0.05;


                p.alpha -=0.015;



                p.el.style.transform =
                    `
translate(${p.x}px,${p.y}px)
`;



                p.el.style.opacity =
                    p.alpha;



            });



            if(alive){

                requestAnimationFrame(loop);

            }

            else{

                parts.forEach(p=>{

                    p.el.remove();

                });

            }


        }



        loop();


    }





    // ==========================
    // RANDOM FIREWORK
    // ==========================


    function launchRandom(){


        createFirework(

            random(
                window.innerWidth*.15,
                window.innerWidth*.85
            ),


            random(
                window.innerHeight*.15,
                window.innerHeight*.55
            )

        );


    }





    // ==========================
    // CLICK EFFECT
    // ==========================


    function clickHandler(e){


        createFirework(
            e.clientX,
            e.clientY
        );


    }



    document.addEventListener(
        "click",
        clickHandler
    );





    // ==========================
    // AUTO MODE
    // ==========================


    let timer=null;


    if(CONFIG.autoFireworks){


        timer=setInterval(

            launchRandom,

            CONFIG.interval

        );


    }





    // ==========================
    // INSTANCE SAVE
    // ==========================


    window.__HAXORAI_PINK_FIREWORKS__={


        container,


        timer,


        click:clickHandler,


        animation:null


    };



})();
