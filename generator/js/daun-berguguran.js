/*!
 * HaxorAI Falling Leaves
 * https://web.haxorai.com
 * CSS Animation Version
 * No GIF
 * No Emoji
 */

(() => {
    "use strict";

    // ==========================
    // DESTROY OLD INSTANCE
    // ==========================

    if (window.__HAXORAI_LEAVES__) {

        try {

            cancelAnimationFrame(window.__HAXORAI_LEAVES__.animation);

            window.removeEventListener(
                "resize",
                window.__HAXORAI_LEAVES__.resizeHandler
            );

            window.__HAXORAI_LEAVES__.container.remove();

        } catch (e) {}

        delete window.__HAXORAI_LEAVES__;

    }

    // ==========================
    // CONFIG
    // ==========================

    const COUNT = 30;

    // ==========================
    // CONTAINER
    // ==========================

    const container = document.createElement("div");

    container.id = "haxorai-falling-leaves";

    container.style.cssText = `
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
pointer-events:none;
overflow:hidden;
z-index:999999;
`;

    document.body.appendChild(container);

    // ==========================
    // RANDOM
    // ==========================

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    // ==========================
    // COLORS
    // ==========================

    const colors = [
        "#3e8e41",
        "#4caf50",
        "#689f38",
        "#7cb342",
        "#8bc34a",
        "#c0ca33",
        "#9e9d24",
        "#a1887f",
        "#8d6e63",
        "#6d4c41"
    ];

    // ==========================
    // LEAVES
    // ==========================

    const leaves = [];

    function createLeaf() {

        const leaf = document.createElement("div");

        const color =
            colors[Math.floor(Math.random() * colors.length)];

        const size = rand(14, 30);

        leaf.style.cssText = `
position:absolute;
width:${size}px;
height:${size * 1.4}px;
background:${color};
border-radius:0 100% 0 100%;
transform-origin:center center;
opacity:${rand(.6,1)};
box-shadow:
inset -2px -2px 4px rgba(0,0,0,.25),
0 0 2px rgba(0,0,0,.2);
`;

        // batang daun

        const stem = document.createElement("div");

        stem.style.cssText = `
position:absolute;
left:50%;
top:2px;
width:2px;
height:${size}px;
background:#4e342e;
transform:translateX(-50%) rotate(-20deg);
border-radius:2px;
`;

        leaf.appendChild(stem);

        container.appendChild(leaf);

        leaves.push({

            el: leaf,

            x: rand(0, innerWidth),

            y: rand(-innerHeight, 0),

            vx: rand(-0.8, 0.8),

            vy: rand(0.8, 2.4),

            angle: rand(0, 360),

            rotateSpeed: rand(-2, 2),

            swing: rand(0, Math.PI * 2),

            swingSpeed: rand(.01, .05)

        });

    }

    for (let i = 0; i < COUNT; i++) {
        createLeaf();
    }

    // ==========================
    // LOOP
    // ==========================

    let animationId = 0;

    function animate() {

        const w = innerWidth;
        const h = innerHeight;

        for (const leaf of leaves) {

            leaf.swing += leaf.swingSpeed;

            leaf.x +=
                leaf.vx +
                Math.sin(leaf.swing) * 1.2;

            leaf.y += leaf.vy;

            leaf.angle += leaf.rotateSpeed;

            if (leaf.y > h + 40) {

                leaf.y = -50;

                leaf.x = rand(0, w);

            }

            if (leaf.x < -40)
                leaf.x = w + 40;

            if (leaf.x > w + 40)
                leaf.x = -40;

            leaf.el.style.transform =
                `translate(${leaf.x}px,${leaf.y}px)
                 rotate(${leaf.angle}deg)`;

        }

        animationId =
            requestAnimationFrame(animate);

    }

    animate();

    // ==========================
    // RESIZE
    // ==========================

    function resizeHandler() {

        const w = innerWidth;

        leaves.forEach(leaf => {

            if (leaf.x > w)
                leaf.x = rand(0, w);

        });

    }

    window.addEventListener(
        "resize",
        resizeHandler
    );

    // ==========================
    // SAVE INSTANCE
    // ==========================

    window.__HAXORAI_LEAVES__ = {

        animation: animationId,

        resizeHandler,

        container

    };

})();
