import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

const ADAM_MAX_Y = 800
const ADAM_MIN_Y = 395
const ADAM_SCALE = 0.7
const ADAM_SPEED = 30

let adam

state.prototype = {
    preload,
    create,
    update,
}

function preload() {
    game.load.image('adam', '/assets/sprites/adam.png')
    game.load.image('tree', '/assets/backgrounds/treeBG.png')
}

function create() {
    bindStatesChangeKeys()
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.stage.backgroundColor = '#000'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.world.setBounds(0, 0, DIMS.BG_WIDTH, DIMS.BG_HEIGHT)

    const treeBg = game.add.sprite(0, 0, 'tree')

    adam = game.add.sprite(DIMS.STAGE_CENTER_X, DIMS.STAGE_CENTER_Y, 'adam')
    adam.anchor.setTo(0.5, 0.5)
    adam.scale.setTo(ADAM_SCALE, ADAM_SCALE)
    game.physics.enable(adam)
    adam.body.collideWorldBounds = true
    game.camera.follow(adam)
    game.camera.deadzone = new Phaser.Rectangle(
        DIMS.STAGE_CENTER_X - 300,
        0,
        600,
        DIMS.STAGE_WIDTH
    )
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        adam.x += ADAM_SPEED
        adam.scale.setTo(ADAM_SCALE, ADAM_SCALE)
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        adam.x -= ADAM_SPEED
        adam.scale.setTo(-ADAM_SCALE, ADAM_SCALE)
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        adam.y += ADAM_SPEED
        if (adam.y > ADAM_MAX_Y) {
            adam.y = ADAM_MAX_Y
        }
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        adam.y -= ADAM_SPEED
        if (adam.y < ADAM_MIN_Y) {
            adam.y = ADAM_MIN_Y
        }
    }
}

export default state
