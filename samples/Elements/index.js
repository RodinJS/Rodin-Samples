import * as RODIN from 'rodin/core';
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
 * Create a box and add to scene
 * Width, height and depth are 1 meter
 * Set position
 * On update rotate by Y axis
 */
const box = new RODIN.Box(1);
box.position.set(0, 1.6, -3);
RODIN.Scene.add(box);
box.on(RODIN.CONST.UPDATE, () => {
    box.rotation.y += 0.005;
});

/**
 * Create a control panel for our buttons
 * Add to scene
 * Set position and rotation
 */
const controlPanel = new RODIN.Sculpt();
RODIN.Scene.add(controlPanel);
controlPanel.position.set(0, 1.2, -1.0);
controlPanel.rotation.x = -Math.PI / 6;

/**
 * Set 'choose color' text styling
 * On ready set position Y and add to control panel
 */
const controlPanelText = new RODIN.Text({
    text: 'Choose color',
    color: 0xffffff,
    fontSize: 0.04
});

controlPanelText.on(RODIN.CONST.READY, (evt) => {
    evt.target.position.y = -0.12;
    controlPanel.add(evt.target);
});

/**
 * Create blue button given parameters
 * On ready set position X and add to control panel
 */
let blueBtnParams = {name: "blueBtn", width: 0.15, height: 0.15};
blueBtnParams.background = {
    color: 0x336699,
    opacity: 0.8
};
blueBtnParams.border = {
    radius: 0.075
};
let blueButton = new RODIN.Element(blueBtnParams);
blueButton.on(RODIN.CONST.READY, (evt) => {
    evt.target.position.x = -0.1;
    controlPanel.add(evt.target);
});

/**
 * Create red button given parameters
 * On ready set position X and add to control panel
 */
let redBtnParams = {name: "redBtn", width: 0.15, height: 0.15};
redBtnParams.background = {
    color: 0xd62d20,
    opacity: 0.8
};
redBtnParams.border = {
    radius: 0.075
};
let redButton = new RODIN.Element(redBtnParams);
redButton.on(RODIN.CONST.READY, (evt) => {
    evt.target.position.x = 0.1;
    controlPanel.add(evt.target);
});

/**
 * On a button hover scale set 1.1
 * On hover out scale set 1
 */
blueButton.on(RODIN.CONST.GAMEPAD_HOVER, (evt) => {
    evt.target.scale.set(1.1, 1.1, 1.1);
});
blueButton.on(RODIN.CONST.GAMEPAD_HOVER_OUT, (evt) => {
    evt.target.scale.set(1, 1, 1);
});

redButton.on(RODIN.CONST.GAMEPAD_HOVER, (evt) => {
    evt.target.scale.set(1.1, 1.1, 1.1);
});
redButton.on(RODIN.CONST.GAMEPAD_HOVER_OUT, (evt) => {
    evt.target.scale.set(1, 1, 1);
});

/**
 * On blue button down box color changes to blue
 */
blueButton.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, () => {
    box._threeObject.material.color = new THREE.Color(0x336699);
});

/**
 * On red button down box color changes to red
 */
redButton.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, () => {
    box._threeObject.material.color = new THREE.Color(0xd62d20);
});

