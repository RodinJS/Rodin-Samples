 import * as RODIN from 'rodin/core';
 import {VPcontrolPanel} from './VPcontrolPanel.js';
 RODIN.start();

 let player = new RODIN.MaterialPlayer({
     HD: "./video/rodin2k.mp4",
     SD: "./video/rodin1k.mp4",
     default: "HD"
 });

 let material = new THREE.MeshBasicMaterial({
    map: player.getTexture()
 });
window.camera = RODIN.Scene.activeCamera;

 let sphere = new RODIN.Sculpt(new THREE.Mesh(new THREE.SphereBufferGeometry(90, 720, 4), material));
 sphere.scale.set(1, 1, -1);
 sphere.rotation.y = Math.PI/2;
 RODIN.Scene.add(sphere);

 RODIN.Scene.preRender(function () {
    player.update(RODIN.Time.delta);
 });

 let controlPanel = new VPcontrolPanel({
    player : player,
    title: "Pedra Bonita 360° video",
    cover: "img/rodin.jpg",
    distance: 2,
    width: 3
 });

controlPanel.on(RODIN.CONST.READY, (evt) => {
    RODIN.Scene.add(evt.target);
    evt.target.position.y = 1.6;
    if(evt.target.coverEl) {
        evt.target.coverEl.rotation.y = -Math.PI/2;
    }

});
