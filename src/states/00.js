import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    create,
    preload,
    update,
}

export default state

const ADAM_MAX_Y = 800
const ADAM_MIN_Y = 395
const ADAM_SCALE = 0.7
const ADAM_SPEED = 30

let adam

function preload() {
    const adamPath = '/assets/spritesheets/adamSheet.png'
    game.load.spritesheet('adam', adamPath, 240, 370)
    game.load.image('tree', '/assets/backgrounds/treeBG.png')
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.world.setBounds(0, 0, DIMS.BG_WIDTH, DIMS.BG_HEIGHT)
    bindStatesChangeKeys()

    const treeBg = game.add.sprite(0, 0, 'tree')
    const deadzoneArgs = [DIMS.STAGE_CENTER_X - 300, 0, 600, DIMS.STAGE_WIDTH]

    adam = game.add.sprite(DIMS.STAGE_CENTER_X, DIMS.STAGE_CENTER_Y, 'adam')

    adam.animations.add('walk', [...Array(5).keys()])
    adam.anchor.setTo(0.5, 0.5)
    adam.scale.setTo(ADAM_SCALE, ADAM_SCALE)
    game.physics.enable(adam)
    adam.body.collideWorldBounds = true
    game.camera.follow(adam)
    game.camera.deadzone = new Phaser.Rectangle(...deadzoneArgs)
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        adam.x += ADAM_SPEED
        adam.scale.setTo(ADAM_SCALE, ADAM_SCALE)
        adamWalk()
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        adam.x -= ADAM_SPEED
        adam.scale.setTo(-ADAM_SCALE, ADAM_SCALE)
        adamWalk()
    } else {
        adamStop()
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

function adamWalk() {
    adam.animations.play('walk', 30, true)
}

function adamStop() {
    adam.animations.stop('walk')
    adam.frame = 0
}
