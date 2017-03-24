import * as RODIN from 'rodin/core';
RODIN.start();

RODIN.Scene.add(new RODIN.Sculpt(new THREE.AmbientLight()));

let hoverAnimation = new RODIN.AnimationClip("hoverAnim", {scale: {x: 1.2, y: 1.2, z: 1.2}});
hoverAnimation.duration(100);

let hoverOutAnimation = new RODIN.AnimationClip("hoverOutAnim", {scale: {x: 1, y: 1, z: 1}});
hoverOutAnimation.duration(100);

for (let i = 0; i < 40; i++) {
    let box = new RODIN.Box(.2, .2, .2, new THREE.MeshNormalMaterial({wireframe: true, color: 0x996633}));
    box.animation.add(hoverAnimation, hoverOutAnimation);
    box.on(RODIN.CONST.READY, onReady);
    box.on(RODIN.CONST.GAMEPAD_HOVER, hover);
    box.on(RODIN.CONST.GAMEPAD_HOVER_OUT, hoverOut);
}

// if we pass listener as function, we can use this instead of evt.target. Also all evt methods supported
// this dont work with arrow functions
function onReady() {
    this.position.set(Math.random() * 4 - 2, Math.random() * 4 - 0.4, Math.random() * 4 - 2);
    RODIN.Scene.add(this);
}

function hover() {
    if (this.animation.isPlaying('hoverOutAnim')) {
        this.animation.stop('hoverOutAnim', false);
    }
    this.animation.start('hoverAnim');
}

function hoverOut() {
    if (this.animation.isPlaying('hoverAnim')) {
        this.animation.stop('hoverAnim', false);
    }
    this.animation.start('hoverOutAnim');
}
