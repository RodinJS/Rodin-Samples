import * as RODIN from 'rodin/core';
RODIN.start();

/**
 * Create empty RODIN object and add to the scene
 */
const mainContainer = new RODIN.Sculpt();
RODIN.Scene.add(mainContainer);

let draggedObjectOriginalPosition = new RODIN.Vector3();
let mouseOriginalPosition = new RODIN.Vector3();
let mouseGamepad = null;
let plane = new THREE.Plane();

/**
 * Create mouseGamepad intersectPlane
 * @return {RODIN.Vector3} intersection between mouseGampad and view point
 */
const mouseToWorld = () => {
    if (!mouseGamepad) return null;
    const intersection = new RODIN.Vector3();
    mouseGamepad.raycaster.ray.intersectPlane(plane, intersection);
    return intersection;
};

/**
 * When an object is ready set its position to be random in range [-5, 5], and set mainContainer as its parent
 * @param evt
 */
const ready = (evt) => {
    const obj = evt.target;
    obj.position.addNoise(new RODIN.Vector3(10, 10, 10)); // random from -5 to 5 (5 - (-5) == 10)
    obj.position.y += 1.6;
    obj.parent = mainContainer;
};

/**
 * Handles buttonDown event for two types of controllers, mouse or any other type
 * For mouse it creates a plane from coplanar point
 * For other types adds the object to gamepad's sculpt
 * @param evt
 */
const buttonDown = (evt) => {
    const obj = evt.target;
    if (evt.gamepad.navigatorGamePadId === 'mouse') {
        navigator.mouseGamePad.stopPropagationOnMouseMove = true;
        mouseGamepad = evt.gamepad;
        plane.setFromNormalAndCoplanarPoint(
            RODIN.Scene.HMDCamera._threeCamera.getWorldDirection(),
            obj.position);
        mouseOriginalPosition = mouseToWorld();
        draggedObjectOriginalPosition = obj.position.clone();
        obj.dragging = true;
        evt.stopPropagation();
    } else if (evt.gamepad.navigatorGamePadId === 'cardboard') {
        //not ready yet, working on this :) sorry...
    } else {
        if (obj.oldParent) return;
        obj.oldParent = obj.parent;
        console.log(evt.gamepad);
        obj.parent = evt.gamepad.sculpt;
    }
};

/**
 * Handles buttonDown event for two types of controllers, mouse or any other type
 * For mouse it sets dragging to false, so we wont drag it anymore
 * For other types it restores the object's original parent
 * @param evt
 */
const buttonUp = (evt) => {
    const obj = evt.target;
    if (evt.gamepad.navigatorGamePadId === 'mouse') {
        navigator.mouseGamePad.stopPropagationOnMouseMove = false;
        obj.dragging = false;
    } else if (obj.oldParent) {
        obj.parent = obj.oldParent;
        delete obj.oldParent;
    }
};

/**
 * On objects hover set scale to 1.1
 * @param evt
 */
const hover = (evt) => {
    evt.target.scale.set(1.1, 1.1, 1.1);
};
/**
 * On objects hoverOut set scale to 1
 * @param evt
 */
const hoverOut = (evt) => {
    evt.target.scale.set(1, 1, 1);
};

/**
 * If we are using mouse for dragging, add corresponding delta to it
 * @param evt
 */
const update = (evt) => {
    const obj = evt.target;
    if (!obj.dragging) return;
    const mousePos = mouseToWorld();
    obj.position = new RODIN.Vector3().copy(draggedObjectOriginalPosition).sub(mouseOriginalPosition).add(mousePos);
};

/**
 * Create scene with 40 elements(RODIN.Sphere or RODIN.Box or RODIN.Cylinder)
 * Add events to elements
 */
const elements = [];
const types = [
    () => new RODIN.Sphere(0.25, new THREE.MeshNormalMaterial()),
    () => new RODIN.Box(0.5, new THREE.MeshNormalMaterial()),
    () => new RODIN.Cylinder(0.25, 0.25, 1, new THREE.MeshNormalMaterial())
];
for (let i = 0; i < 40; i++) {
    elements.push(types[Math.floor(Math.random() * types.length)]());
    elements[i].on(RODIN.CONST.READY, ready);
    elements[i].on(RODIN.CONST.GAMEPAD_HOVER, hover);
    elements[i].on(RODIN.CONST.GAMEPAD_HOVER_OUT, hoverOut);
    elements[i].on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, buttonDown);
    elements[i].on(RODIN.CONST.GAMEPAD_BUTTON_UP, buttonUp);
    elements[i].on(RODIN.CONST.UPDATE, update);
}
