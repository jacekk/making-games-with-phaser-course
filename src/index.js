import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

const states = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09'
];

window.game = new Phaser.Game(800, 600, Phaser.AUTO);

states.forEach(item => {
    game
        .state
        .add(`state${item}`, require(`./states/${item}`).default);
})

game
    .state
    .start('state01');
