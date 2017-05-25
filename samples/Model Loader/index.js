import * as RODIN from 'rodin/core';
RODIN.start();

/**
 * Load earth .obj model, when its ready set position and add to the scene
 */
const earthModel = new RODIN.Sculpt('./models/earth.obj');
earthModel.on(RODIN.CONST.READY, () => {
    earthModel.position.set(0, 1.6, -3);
    RODIN.Scene.add(earthModel);
});

/**
 * On update rotate object by Y axis
 */
earthModel.on(RODIN.CONST.UPDATE, () => {
    earthModel.rotation.y += 0.002;
});

/**
 * Create directional light and add to scene
 * Set color '0xcccccc' and intensity 0.8
 */
let light1 = new THREE.DirectionalLight(0xcccccc, 0.8);
light1.position.set(2, 5, 2);
RODIN.Scene.active._scene.add(light1);

/**
 * Create directional light and add to scene
 * Set color '0xcccccc' and intensity 0.5
 */
let light2 = new THREE.DirectionalLight(0xcccccc, 0.5);
light2.position.set(-4, 10, -4);
RODIN.Scene.active._scene.add(light2);

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