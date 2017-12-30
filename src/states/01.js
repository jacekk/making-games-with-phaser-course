const state = function () {};

state.prototype = {
    preload,
    create,
    update
};

function preload() {
    game
        .load
        .image('logo', './assets/images/phaser-small.png');
};

function create() {
    const logo = game
        .add
        .sprite(game.world.centerX, game.world.centerY, 'logo');
    logo
        .anchor
        .setTo(0.5, 0.5);
};

function update() {};

export default state;
