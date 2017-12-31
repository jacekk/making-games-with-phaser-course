import { bindStatesChangeKeys } from '../utils';

const state = function () {};

state.prototype = {
    preload,
    create,
    update
};

function preload() {};

function create() {
    bindStatesChangeKeys();
    game.stage.backgroundColor = '#000';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
};

function update() {};

export default state;
