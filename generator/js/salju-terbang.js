/*!
 * HaxorAI Flying Snow
 * Compatible with iframe, document.write(), Cloudflare & modern browsers.
 * https://web.haxorai.com
 */

(function () {
    "use strict";

    if (window.__HAXORAI_FLYING_SNOW__) return;
    window.__HAXORAI_FLYING_SNOW__ = true;

    const TOTAL = 120;

    const style = document.createElement("style");
    style.textContent = `
    #haxorai-snow{
        position:fixed;
        inset:0;
        overflow:hidden;
        pointer-events:none;
        z-index:999999;
    }

    .haxorai-flake{
        position:absolute;
        top:-30px;
        color:#fff;
        font-size:8px;
        user-select:none;
        will-change:transform;
        text-shadow:0 0 6px rgba(255,255,255,.8);
        animation-name:haxorai-fall,haxorai-sway;
        animation-timing-function:linear,ease-in-out;
        animation-iteration-count:infinite,infinite;
        opacity:.9;
    }

    @keyframes haxorai-fall{
        from{
            transform:translateY(-30px);
        }
        to{
            transform:translateY(calc(100vh + 40px));
        }
    }

    @keyframes haxorai-sway{
        0%{margin-left:0;}
        25%{margin-left:-20px;}
        50%{margin-left:20px;}
        75%{margin-left:-15px;}
        100%{margin-left:0;}
    }
    `;

    document.head.appendChild(style);

    const container = document.createElement("div");
    container.id = "haxorai-snow";

    document.body.appendChild(container);

    function createFlake() {

        const flake = document.createElement("div");

        flake.className = "haxorai-flake";

        flake.innerHTML = "❄";

        const size = 8 + Math.random() * 18;
        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * -duration;
        const sway = 2 + Math.random() * 3;

        flake.style.left = left + "%";
        flake.style.fontSize = size + "px";

        flake.style.animationDuration =
            duration + "s," +
            sway + "s";

        flake.style.animationDelay =
            delay + "s," +
            (Math.random() * -3) + "s";

        flake.style.opacity =
            (0.4 + Math.random() * 0.6).toFixed(2);

        container.appendChild(flake);
    }

    for (let i = 0; i < TOTAL; i++) {
        createFlake();
    }

})();
