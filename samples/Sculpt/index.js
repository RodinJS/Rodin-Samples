import * as RODIN from 'rodin/core';
RODIN.start();

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
 * Create a box and add to the scene
 * Set position
 */
const box = new RODIN.Box(width, new THREE.MeshNormalMaterial({}));
RODIN.Scene.add(box);

/**
 * Create a sphere and add to the scene
 * Set position
 */
const sphere = new RODIN.Sphere(radius, new THREE.MeshNormalMaterial({}));
RODIN.Scene.add(sphere);

/**
 * Create a cylinder and add to the scene
 * Set position
 */
const cylinder = new RODIN.Cylinder(radius, radius, height, new THREE.MeshNormalMaterial({}));
RODIN.Scene.add(cylinder);

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
 * Set sphere as a parent object for box
 */
box.parent = sphere;

/**
 * Add sphere as a child object for cylinder
 */
cylinder.add(sphere);

/**
 * Set cylinder's local position; box and sphere should move with the cylinder
 */
cylinder.position.set(shiftByX, shiftByY, shiftByZ);

/**
 * Set sphere global position; box will move with the sphere
 */
sphere.globalPosition.set(0, shiftByY, shiftByZ);

/**
 * Set box local position with respect to the sphere
 */
box.position.set(-shiftByX, 0, 0);

// We can change local and global rotation, quaternion and scale the same way.
