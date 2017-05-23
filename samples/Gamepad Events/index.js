import * as RODIN from 'rodin/core';
import {ButtonsControlPanel} from './ButtonsControlPanel.js';
RODIN.start();

/**
 * Create plane for the floor and add to the scene
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
 * Create control panel from ButtonsControlPanel class
 * Add to the scene
 * Set position
 */
const controlPanel = new ButtonsControlPanel();
RODIN.Scene.add(controlPanel);
controlPanel.position.set(0, 1.2, -1);

/**
 * On clickOnMeButton button down change gamepadButtonName to clicked button name
 * Call reDraw function to change text of gamepadButtonName element
 */
controlPanel.clickOnMeButton.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
    const newGamepadButtonName = controlPanel.gamepadButtonName;
    for (let key in RODIN.Buttons) {
        if (RODIN.Buttons[key].keyCode === evt.keyCode) {
            newGamepadButtonName.text = key;
            controlPanel.gamepadButtonName.reDraw(newGamepadButtonName);
        }
    }
});





