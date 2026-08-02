/*!
 * HaxorAI Flying Snow
 * https://web.haxorai.com
 * Version : Generator Compatible
 */

(() => {
    "use strict";

    // ==========================
    // DESTROY OLD INSTANCE
    // ==========================

    if (window.__HAXORAI_SNOW__) {

        try {

            cancelAnimationFrame(window.__HAXORAI_SNOW__.animation);

            window.removeEventListener(
                "resize",
                window.__HAXORAI_SNOW__.resizeHandler
            );

            if (window.__HAXORAI_SNOW__.container) {
                window.__HAXORAI_SNOW__.container.remove();
            }

        } catch (e) {}

        delete window.__HAXORAI_SNOW__;
    }

    // ==========================
    // CONFIG
    // ==========================

    const CONFIG = {

        count: 120,
        minSize: 8,
        maxSize: 24,
        minSpeed: 1,
        maxSpeed: 4

    };

    // ==========================
    // CONTAINER
    // ==========================

    const container = document.createElement("div");

    container.id = "haxorai-flying-snow";

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
    // UTIL
    // ==========================

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    const flakes = [];

    // ==========================
    // CREATE
    // ==========================

    function createFlake() {

        const el = document.createElement("span");

        const size = rand(
            CONFIG.minSize,
            CONFIG.maxSize
        );

        el.textContent = "❄";

        el.style.cssText = `
position:absolute;
left:0;
top:0;
font-size:${size}px;
color:#fff;
opacity:${rand(.4,1)};
user-select:none;
will-change:transform;
text-shadow:
0 0 5px #fff,
0 0 12px rgba(255,255,255,.7);
`;

        container.appendChild(el);

        flakes.push({

            el,

            x: rand(0, window.innerWidth),

            y: rand(-window.innerHeight, 0),

            vx: rand(-1.5, 1.5),

            vy: rand(
                CONFIG.minSpeed,
                CONFIG.maxSpeed
            ),

            angle: rand(0, 360),

            rotate: rand(-2, 2),

            wave: rand(0, Math.PI * 2),

            waveSpeed: rand(0.01, 0.05)

        });

    }

    for (let i = 0; i < CONFIG.count; i++) {
        createFlake();
    }

    // ==========================
    // LOOP
    // ==========================

    let animationId = 0;

    function loop() {

        const w = window.innerWidth;
        const h = window.innerHeight;

        for (const f of flakes) {

            f.wave += f.waveSpeed;

            f.x += f.vx + Math.sin(f.wave) * 0.6;

            f.y += f.vy;

            f.angle += f.rotate;

            if (f.y > h + 40) {

                f.y = -40;

                f.x = rand(0, w);

            }

            if (f.x < -40)
                f.x = w + 40;

            if (f.x > w + 40)
                f.x = -40;

            f.el.style.transform =
                `translate(${f.x}px,${f.y}px) rotate(${f.angle}deg)`;

        }

        animationId = requestAnimationFrame(loop);

    }

    loop();

    // ==========================
    // RESIZE
    // ==========================

    function resizeHandler() {

        const w = window.innerWidth;

        flakes.forEach(f => {

            if (f.x > w)
                f.x = rand(0, w);

        });

    }

    window.addEventListener(
        "resize",
        resizeHandler
    );

    // ==========================
    // SAVE INSTANCE
    // ==========================

    window.__HAXORAI_SNOW__ = {

        animation: animationId,

        resizeHandler,

        container

    };

})();
