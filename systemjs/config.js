(function (global) {

    var paths = {
        'npm:': 'https://cdn.rodin.io/v0.0.6/'
    };

    var map = {
        'rodin/core': 'npm:core',
        'rodin/physics': 'npm:physics'
    };

    var packages = {
        'dist': {main: 'index.js', defaultExtension: 'js'},
        'rodin/core': {main: 'index.js', defaultExtension: 'js'},
        'rodin/physics': {main: 'index.js', defaultExtension: 'js'},
    };

    var moduleNames = [
        'core/error',
        'core/time',
        'core/scene',
        'core/sculpt',
        'core/sculpt/elements',
        'core/messenger',
        'core/eventEmitter',
        'core/set',
        'core/initializer',
        'core/constants',
        'core/rodinEvent',
        'core/raycaster',
        'core/controllers',
        'core/animation',
        'core/video',
        'core/button',
        'core/gamePad',
        'core/utils',
        'core/loader',
        'core/plugin',
        'core/particleSystem',
        'core/color',
        'core/camera',
        'core/avatar',
        'core/math'
    ];

    function packIndex(moduleName) {
        packages['' + paths['npm:'] + moduleName + ''] = {main: 'index.js', defaultExtension: 'js'};
    }

    moduleNames.forEach(packIndex);

    var config = {
        paths: paths,
        map: map,
        packages: packages,
        meta: {
            '*': {
                authorization: true
            }
        }
    };

    System.config(config);

})(this);