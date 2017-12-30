import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload, create, update});

function preload() {
    game
        .load
        .image('logo', './assets/images/phaser-small.png');
}

function create() {
    const logo = game
        .add
        .sprite(game.world.centerX, game.world.centerY, 'logo');
    logo
        .anchor
        .setTo(0.5, 0.5);
};

function update() {
    // ¯ \_(ツ)_/¯ surprise me
}
