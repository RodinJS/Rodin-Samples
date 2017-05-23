import * as RODIN from 'rodin/core';
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
 * Load mainland.obj model, when its ready set position and add to the scene
 */
const mainland = new RODIN.Sculpt('./models/mainland.obj');
mainland.on(RODIN.CONST.READY, (evt) => {
    evt.target.position.set(0, 1.6, -3);
    RODIN.Scene.add(evt.target);

    /**
     * Make the loaded object invisible
     */
    evt.target._threeObject.children[0].material.visible = false;

    /**
     * Get loaded object vertices' position
     */
    const vertices = evt.target._threeObject.children[0].geometry.attributes.position.array;

    /**
     * Create an array of RODIN.Vector3 s from vertices array, corresponding x = i, y = i+1, z = i+2
     * Add this to verticesPos array
     * Calculate how many particles we will need
     */
    const verticesPos = [];
    let particleNumber = 0;
    for (let i = 0; i < vertices.length; i += 3) {
        verticesPos.push(new RODIN.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]));
        ++particleNumber;
    }

    /**
     * @return {RODIN.Vector3} - next vertex position on loaded model
     */
    let sphereCurrentIndex = 0;
    const getLoadedObjectVertexPosition = () => {
        sphereCurrentIndex = ++sphereCurrentIndex % particleNumber;
        return verticesPos[sphereCurrentIndex];
    };

    /**
     * Create a new RODIN.ParticleSystem
     * Set position and add to scene
     */
    let mainlandParticles = new RODIN.ParticleSystem({
        startCount: {value: particleNumber / 4, randomness: 100},
        numberPerSecond: {value: particleNumber / 4, randomness: 100},
        maxParticles: {value: particleNumber / 4, randomness: 0},
        particleSize: {value: new RODIN.Vector3(0.075, 0.075, 0.075), randomness: new RODIN.Vector3(0, 0, 0)},
        startPosition: {randomness: new RODIN.Vector3(0, 0, 0)},
        velocity: {
            type: 'set',
            path: (lifetimeFromBorn, particle) => {
                /**
                 * If the time from the moment particle is born to now is less than 2000ms,
                 * particles position is set from one of the loaded object vertices' positions
                 * returns particle new position
                 */

                if (lifetimeFromBorn < 2000) {
                    if (!particle.loadedObjectVertexPos) {
                        particle.loadedObjectVertexPos = getLoadedObjectVertexPosition();
                    }
                    return particle.loadedObjectVertexPos;
                } else if (lifetimeFromBorn > 6000) {
                    /**
                     * If the time from the moment particle is born to now is more than 6000ms,
                     * particles position is set to a point which is between its current position and object's vertex's position
                     * returns particle new position
                     */
                    if (!particle.resetLoadedObjectVertexPos) {
                        particle.resetLoadedObjectVertexPos = getLoadedObjectVertexPosition();
                    }
                    return new RODIN.Vector3().copy(particle.position).lerp(particle.resetLoadedObjectVertexPos, .05);
                } else {
                    /**
                     * If the time from the moment particle is born to now is from 2000ms to 6000ms,
                     * particles position is set to the position of one of objects vertices' position, with a noise
                     * returns particle new position
                     */
                    if (!particle.randomPosition) {
                        particle.randomPosition = new RODIN.Vector3().copy(particle.loadedObjectVertexPos).addNoise(new RODIN.Vector3(8, 8, 8));
                    }
                    return new RODIN.Vector3().copy(particle.position).lerp(particle.randomPosition, .05);
                }
            },
            randomness: 0
        },
        color: {
            value: {
                from: 0x336699,
                to: 0x993366
            }
        },
        lifetime: {value: 8000, randomness: 0}
    });
    mainlandParticles.position.set(0, 1.6, -3);
    RODIN.Scene.add(mainlandParticles);

    /**
     * On mainlandParticles update rotate object by Y axis
     */
    mainlandParticles.on(RODIN.CONST.UPDATE, (evt) => {
        evt.target.rotation.y += 0.01;
    });

});
