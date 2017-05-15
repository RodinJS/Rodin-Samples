import * as RODIN from 'rodin/core';
RODIN.start();

/**
 * Create a plane for the floor and add to the scene
 * Make plane as a grid, number of grid's segments is 100
 */
const plane = new RODIN.Plane(50, 50, 100, 100, new THREE.MeshBasicMaterial({color: 0x336699, wireframe: true}));
plane.rotation.x = -Math.PI / 2;
RODIN.Scene.add(plane);

/**
 * Create directional light and add to the scene
 * Set color '0xcccccc' and intensity 0.8
 */
let light1 = new THREE.DirectionalLight(0xcccccc, 0.8);
light1.position.set(2, 5, 2);
RODIN.Scene.active._scene.add(light1);

/**
 * Create directional light and add to the scene
 * Set color '0xcccccc' and intensity 0.5
 */
let light2 = new THREE.DirectionalLight(0xcccccc, 0.5);
light2.position.set(-4, 10, -4);
RODIN.Scene.active._scene.add(light2);

/**
 * Create carBody and add to the scene
 * Create wheels and add to carBody
 * Set position
 */
const carBody = new RODIN.Box(0.6, 0.4, 1.2, new THREE.MeshStandardMaterial({color: 0x0d253e}));
carBody.on(RODIN.CONST.READY, (evt) => {
    let carWheels = new RODIN.Cylinder(0.2, 0.2, 0.05, new THREE.MeshStandardMaterial({color: 0x0d253e}));
    carWheels.rotation.z = Math.PI / 2;

    carWheels = carWheels.clone();
    carWheels.position.set(0.325, -0.2, -0.5);
    evt.target.add(carWheels);

    carWheels = carWheels.clone();
    carWheels.position.set(-0.325, -0.2, -0.5);
    evt.target.add(carWheels);

    carWheels = carWheels.clone();
    carWheels.position.set(0.325, -0.2, 0.5);
    evt.target.add(carWheels);

    carWheels = carWheels.clone();
    carWheels.position.set(-0.325, -0.2, 0.5);
    evt.target.add(carWheels);

    RODIN.Scene.add(carBody);
    carBody.position.set(0, 0.4, -1.6);
    carBody.rotation.y = Math.PI / 2;
});

/**
 * Set information text styling
 * Add to scene
 * Set local position
 */
const infoText = new RODIN.Text({
    text: 'Press buttons to move left or right',
    color: 0xffffff,
    fontSize: 0.1
});
infoText.on(RODIN.CONST.READY, (evt) => {
    RODIN.Scene.add(evt.target);
    evt.target.position.set(0, 1.6, -1.6);
});

let moving = false;
let step = 0;
let cardboardTrigerDirection = false;

/**
 * On car update check if a button is been down
 */
carBody.on(RODIN.CONST.UPDATE, (evt) => {
    /**
     * Because cardboard has one button, after its down we change cars direction
     */
    if (RODIN.GamePad.getButtonDown(RODIN.Buttons['cardboardTrigger'])){
        cardboardTrigerDirection = !cardboardTrigerDirection;
    }

    /**
     * Check if left button is down set step to left and moving true
     * So the car will start moving to the left
     */
    if (RODIN.GamePad.getButtonDown(RODIN.Buttons['mouseWheel']) ||
        RODIN.GamePad.getButtonDown(RODIN.Buttons['viveLeftTrigger']) ||
        RODIN.GamePad.getButtonDown(RODIN.Buttons['oculusTouchLeftTrigger']) ||
        (RODIN.GamePad.getButtonDown(RODIN.Buttons['cardboardTrigger']) && cardboardTrigerDirection)) {
        moving = true;
        step = -0.01 * RODIN.Time.delta
    }

    /**
     * Check if right button is down set step to right and moving true
     * So the car will start moving to the right
     */
    if (RODIN.GamePad.getButtonDown(RODIN.Buttons['mouseRight']) ||
        RODIN.GamePad.getButtonDown(RODIN.Buttons['viveRightTrigger']) ||
        RODIN.GamePad.getButtonDown(RODIN.Buttons['oculusTouchRightTrigger']) ||
        (RODIN.GamePad.getButtonDown(RODIN.Buttons['cardboardTrigger']) && !cardboardTrigerDirection)) {
        moving = true;
        step = 0.01 * RODIN.Time.delta
    }

    /**
     * Check if a button up set moving false
     * Car stops
     */
    if (RODIN.GamePad.getButtonUp(RODIN.Buttons['mouseWheel']) ||
        RODIN.GamePad.getButtonUp(RODIN.Buttons['viveLeftTrigger']) ||
        RODIN.GamePad.getButtonUp(RODIN.Buttons['oculusTouchLeftTrigger']) ||
        RODIN.GamePad.getButtonUp(RODIN.Buttons['mouseRight']) ||
        RODIN.GamePad.getButtonUp(RODIN.Buttons['viveRightTrigger']) ||
        RODIN.GamePad.getButtonUp(RODIN.Buttons['oculusTouchRightTrigger']) ||
        RODIN.GamePad.getButtonUp(RODIN.Buttons['cardboardTrigger'])) {
        moving = false;
    }

    /**
     * Check if moving true, move car by X axis by step
     */
    if (moving) {
        evt.target.position.x += step;
    }
});