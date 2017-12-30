const state = function () {};

state.prototype = {
    preload,
    create,
    update
};

function preload() {};

function create() {
    game.stage.backgroundColor = '#666';
};

function update() {};

export default state;
