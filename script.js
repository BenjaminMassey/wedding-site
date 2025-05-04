
let animating = false;

async function tweenOpacity(divName, milliseconds, direction) {
    let iters = 100;
    let opacity = document.getElementById(divName).style.opacity;
    for (let i = 0; i <= iters; i++) {
        document.getElementById(divName).style.opacity = opacity;
        opacity -= (1.0 / iters) * direction;
        opacity = Math.max(0.0, Math.min(opacity, 1.0));
        await new Promise(r => setTimeout(r, milliseconds / iters));
    }
}

async function tweenOn(divName, milliseconds) {
    tweenOpacity(divName, milliseconds, -1);
}

async function tweenOff(divName, milliseconds) {
    tweenOpacity(divName, milliseconds, 1);
}

function tweenOffAllButOne(excludedDivName, milliseconds) {
    const screens = document.querySelectorAll('div.screen');
    function tweenOffDiv(div) {
        if (div.id != excludedDivName) {
            tweenOff(div.id);
        }
    }
    screens.forEach(tweenOffDiv);
}

async function moveOffOthers(divName) {
    const screens = document.querySelectorAll('div.screen');
    function moveOff(div) {
        if (div.id != divName) {
            div.style.top = "100vh";
        }
    }
    screens.forEach(moveOff);
}

async function moveBackAll() {
    const screens = document.querySelectorAll('div.screen');
    function moveBack(div) {
        div.style.top = "10vh";
    }
    screens.forEach(moveBack);
}

async function showScreen(divName) {
    if (animating) {
        return;
    }
    animating = true;
    moveBackAll();
    tweenOffAllButOne(divName, 350);
    await new Promise(r => setTimeout(r, 650));
    tweenOn(divName, 350);
    await new Promise(r => setTimeout(r, 800));
    moveOffOthers(divName);
    animating = false;
}

function initialShow() {
    tweenOn('home', 500);
}