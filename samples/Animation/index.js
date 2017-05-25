import * as RODIN from 'rodin/core';
RODIN.start();

// Create object

/**
 * Set default properties
 */
const shiftByX = 2.5;
const shiftByY = 0.75;
const shiftByZ = -4;
const radius = 0.75;
const height = 1.5;
const width = 1.5;

/**
 * Create our animated box and add to the scene
 * Set position
 */
const box = new RODIN.Box(width, new THREE.MeshNormalMaterial({}));
box.position.set(shiftByX, shiftByY, shiftByZ);
RODIN.Scene.add(box);

/**
 * Create our sphere and add to the scene
 * Set position
 */
const sphere = new RODIN.Sphere(radius, new THREE.MeshNormalMaterial({}));
sphere.position.set(0, shiftByY, shiftByZ);
RODIN.Scene.add(sphere);

/**
 * Create our cylinder and add to the scene
 * Set position
 */
const cylinder = new RODIN.Cylinder(radius, radius, height, new THREE.MeshNormalMaterial({}));
cylinder.position.set(-shiftByX, shiftByY, shiftByZ);
RODIN.Scene.add(cylinder);

/**
 * Create floor plane and add to the scene
 * Make plane as a grid, number of grid's segments is 100
 */
const plane = new RODIN.Plane(50, 50, 100, 100,
    new THREE.MeshBasicMaterial({
        color: 0x35a9ff,
        wireframe: true,
        alphaMap: RODIN.Loader.loadTexture('https://cdn.rodin.io/resources/img/gradient.jpg'),
        transparent: true,
        opacity: 0.2
    }));
plane.rotation.x = -Math.PI / 2;
RODIN.Scene.add(plane);
console.log(plane._threeObject.material);

// POSITION ANIMATIONS

/**
 * Create animation that will move object up and set duration to 1 second
 */
let moveUpAnimation = new RODIN.AnimationClip("moveUpAnim", {
    position: {x: shiftByX, y: shiftByY * 4, z: shiftByZ}
});
moveUpAnimation.duration(1000);

/**
 * Create animation that will move object down and set duration to 1 second
 */
let moveDownAnimation = new RODIN.AnimationClip("moveDownAnim", {
    position: {x: shiftByX, y: shiftByY, z: shiftByZ}
});
moveDownAnimation.duration(1000);

/**
 * Add animation to object and start it
 */
box.animation.add(moveUpAnimation, moveDownAnimation);
box.animation.start('moveUpAnim');

/**
 * Check if an animation is complete, then start another
 */
box.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
    if (e.animation === 'moveUpAnim') {
        e.target.animation.start('moveDownAnim');
    }
    if (e.animation === 'moveDownAnim') {
        e.target.animation.start('moveUpAnim');
    }
});

// SCALE ANIMATIONS

/**
 * Create animation that will scale down object by half and set duration to 2 second
 */
let scaleDownAnimation = new RODIN.AnimationClip("scaleDownAnim", {
    scale: {x: 0.5, y: 0.5, z: 0.5}
});
scaleDownAnimation.duration(2000);

/**
 * Create animation that will scale up object original size and set duration to 2 second
 */
let scaleUpAnimation = new RODIN.AnimationClip("scaleUpAnim", {
    scale: {x: 1, y: 1, z: 1}
});
scaleUpAnimation.duration(2000);

/**
 * Add animation to the object and start it
 */
sphere.animation.add(scaleDownAnimation, scaleUpAnimation);
sphere.animation.start('scaleDownAnim');

/**
 * Check if an animation is complete, then start another
 */
sphere.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
    if (e.animation === 'scaleDownAnim') {
        e.target.animation.start('scaleUpAnim');
    }
    if (e.animation === 'scaleUpAnim') {
        e.target.animation.start('scaleDownAnim');
    }
});

// ROTATION ANIMATIONS

/**
 * Create animation that will rotate object clockwise by X axis by and set duration to 2 second
 */
let rotateByXClockwiseAnimation = new RODIN.AnimationClip("rotateByXClockwiseAnim", {
    rotation: {x: Math.PI, y: 0, z: 0}
});
rotateByXClockwiseAnimation.duration(2000);

/**
 * Create animation that will rotate object counterclockwise by X axis by and set duration to 2 second
 */
let rotateByXCounterclockwiseAnimation = new RODIN.AnimationClip("rotateByXCounterclockwiseAnim", {
    rotation: {x: -Math.PI, y: 0, z: 0}
});
rotateByXCounterclockwiseAnimation.duration(2000);

/**
 * Add animation to object and start it
 */
cylinder.animation.add(rotateByXClockwiseAnimation, rotateByXCounterclockwiseAnimation);
cylinder.animation.start('rotateByXClockwiseAnim');

/**
 * Check if an animation is complete, then start another
 */
cylinder.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
    if (e.animation === 'rotateByXClockwiseAnim') {
        e.target.animation.start('rotateByXCounterclockwiseAnim');
    }
    if (e.animation === 'rotateByXCounterclockwiseAnim') {
        e.target.animation.start('rotateByXClockwiseAnim');
    }
});