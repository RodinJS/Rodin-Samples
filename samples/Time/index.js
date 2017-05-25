import * as RODIN from 'rodin/core';
import {RangeBar} from './RangeBar.js';
RODIN.start();

/**
 * Create a plane for the floor and add to the scene
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

/**
 * Create an emptyObject and add to the scene
 * Set position and rotation
 */
const emptyObject = new RODIN.Sculpt();
RODIN.Scene.add(emptyObject);
emptyObject.position.set(0, 1.3, -2.5);
emptyObject.rotation.x = Math.PI / 2;

/**
 * Create a sphere and add to emptyObject
 */
const sphere = new RODIN.Sphere(0.3, new THREE.MeshNormalMaterial({}));
emptyObject.add(sphere);

/**
 * Create a box and add to emptyObject
 */
const box = new RODIN.Box(0.4, new THREE.MeshNormalMaterial({}));
emptyObject.add(box);

/**
 * On update move the sphere in a circle
 * Step depends on RODIN.Time
 */
sphere.movingRadius = 1;
sphere.step = 0;
sphere.speed = 0.1;
sphere.on(RODIN.CONST.UPDATE, function () {
    sphere.step += RODIN.Time.delta * 0.001 * sphere.speed;

    sphere.position.x = sphere.movingRadius * Math.sin(sphere.step);
    sphere.position.z = sphere.movingRadius * Math.cos(sphere.step);
});

/**
 * On update box rotate around its axis
 * Step depends on RODIN.Time
 */
box.step = 0;
box.speed = 0.1;
box.on(RODIN.CONST.UPDATE, function () {
    box.step += RODIN.Time.delta * 0.001 * box.speed;

    box.rotation.x = box.step ;
    box.rotation.z = box.step ;
});

/**
 * Create range bar from RangeBar class and add to the scene
 * Set position
 */
const rangeBar = new RangeBar();
RODIN.Scene.add(rangeBar);
rangeBar.position.set(0, 1.1, -1.2);

/**
 * On rangeBar ready we need to set rangeBtn on start position, which depend on current RODIN.Time's speed
 */
rangeBar.on(RODIN.CONST.READY, () => {
    rangeBar.rangeBtn.position.x = RODIN.Time.speed / rangeBar.sceneTimeValue.finalValue - rangeBar.sceneTimeValue.length / 2;
});

/**
 * Depends on rangeBar's value we change RODIN.Time's speed and rangeBtn position on rangeBar
 */
rangeBar.sceneTimeValue.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
    rangeBar.rangeBtn.position.x = evt.uv.x - rangeBar.sceneTimeValue.length / 2;
    RODIN.Time.speed = evt.uv.x * rangeBar.sceneTimeValue.finalValue;
});

