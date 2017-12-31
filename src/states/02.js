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
    game.stage.backgroundColor = '#222';
};

function update() {};

export default state;
