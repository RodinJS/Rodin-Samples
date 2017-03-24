import * as RODIN from 'rodin/core';
RODIN.start();

const sphere = new RODIN.Sphere();
sphere.position.set(-.5, 1.6, -1);
RODIN.Scene.add(sphere);

const box = new RODIN.Box();
box.position.set(.5, 1.6, -1);
RODIN.Scene.add(box);

// const cylinder = new RODIN.Cylinder();
// cylinder.position.set(0, 1.6, -1);
// RODIN.Scene.add(cylinder);