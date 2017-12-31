import {bindStatesChangeKeys} from '../utils'
import dimentions from '../dimentions'

const state = function () {}
const speed = 6
let adam

state.prototype = {
    preload,
    create,
    update
}

function preload() {
    game
        .load
        .image('adam', '/assets/sprites/adam.png')
    game
        .load
        .image('tree', '/assets/backgrounds/treeBG.png')
}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#000'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    const treeBg = game
        .add
        .sprite(0, 0, 'tree')

    adam = game
        .add
        .sprite(dimentions.STAGE_CENTER_X, dimentions.STAGE_CENTER_Y, 'adam')
    adam
        .anchor
        .setTo(0.5, 0.5)
    adam
        .scale
        .setTo(0.7, 0.7)
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        adam.x += speed
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        adam.x -= speed
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        adam.y += speed
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        adam.y -= speed
    }
}

export default state
