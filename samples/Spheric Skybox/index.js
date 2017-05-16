import * as RODIN from 'rodin/core';
RODIN.start();

/**
 * Create spherical skybox
 * Radius is 72 meters
 * Number of segments is 36, by horizontal and vertical axes
 * Set material rendering side to back
 * Load texture from URL
 * Add to the scene
 */
const sphericalSkybox = new RODIN.Sphere(72, 36, 36,
    new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: RODIN.Loader.loadTexture('./textures/pitch_deck_spherical.jpg')
    }));
RODIN.Scene.add(sphericalSkybox);