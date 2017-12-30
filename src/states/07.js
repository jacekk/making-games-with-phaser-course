const state = function () {};

state.prototype = {
    preload,
    create,
    update
};

function preload() {};

function create() {
    game.stage.backgroundColor = '#777';
};

function update() {};

export default state;
