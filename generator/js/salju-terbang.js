/*!
 * HaxorAI Flying Snow
 * File : salju-terbang.js
 * Modern Version
 * https://web.haxorai.com
 */

(() => {
    "use strict";

    // Hindari double load
    if (window.__HAXORAI_FLYING_SNOW__) return;
    window.__HAXORAI_FLYING_SNOW__ = true;

    const COUNT = 120;

    const container = document.createElement("div");
    container.id = "haxorai-flying-snow";

    container.style.cssText = `
        position:fixed;
        inset:0;
        overflow:hidden;
        pointer-events:none;
        z-index:999999;
    `;

    document.body.appendChild(container);

    const flakes = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createFlake() {

        const flake = document.createElement("span");

        flake.innerHTML = "❄";

        const size = random(8, 24);

        flake.style.cssText = `
            position:absolute;
            color:#fff;
            font-size:${size}px;
            left:${random(0, window.innerWidth)}px;
            top:${random(-window.innerHeight, 0)}px;
            opacity:${random(.4,1)};
            text-shadow:
                0 0 6px rgba(255,255,255,.9),
                0 0 12px rgba(255,255,255,.5);
            will-change:transform;
            user-select:none;
        `;

        container.appendChild(flake);

        flakes.push({
            el: flake,
            x: parseFloat(flake.style.left),
            y: parseFloat(flake.style.top),
            speedY: random(1,4),
            speedX: random(-1.5,1.5),
            rotate: random(0,360),
            rotateSpeed: random(-2,2)
        });
    }

    for (let i = 0; i < COUNT; i++) {
        createFlake();
    }

    function animate() {

        const w = window.innerWidth;
        const h = window.innerHeight;

        for (const f of flakes) {

            f.x += f.speedX;
            f.y += f.speedY;
            f.rotate += f.rotateSpeed;

            if (f.y > h + 30) {
                f.y = -30;
                f.x = random(0, w);
            }

            if (f.x > w + 20)
                f.x = -20;

            if (f.x < -20)
                f.x = w + 20;

            f.el.style.transform =
                `translate(${f.x}px,${f.y}px) rotate(${f.rotate}deg)`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {

        const w = window.innerWidth;

        flakes.forEach(f => {

            if (f.x > w)
                f.x = random(0, w);

        });

    });

})();
