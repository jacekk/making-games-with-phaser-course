import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import state0 from './states/01';

window.game = new Phaser.Game(800, 600, Phaser.AUTO);

game
    .state
    .add('state0', state0);

game
    .state
    .start('state0');
