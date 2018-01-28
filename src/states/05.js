import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    preload,
    create,
    update,
}

const ACCEL = 3e3

let adam
let platform
let platformGroup

function preload() {
    const adamPath = '/assets/sprites/adam.png'
    const platformPath = '/assets/sprites/platform.png'

    game.load.image('adam', adamPath)
    game.load.image('platform', platformPath)
}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#ff99dd'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    adam = game.add.sprite(DIMS.STAGE_CENTER_X, DIMS.STAGE_CENTER_Y, 'adam')
    platform = game.add.sprite(0, 600, 'platform')

    platformGroup = game.add.group()
    platformGroup.create(650, 450, 'platform')
    platformGroup.create(1300, 650, 'platform')

    game.physics.enable([adam, platform, platformGroup])

    adam.body.gravity.y = 2e3
    adam.body.drag.x = ACCEL
    adam.body.bounce.y = 0.3
    adam.body.collideWorldBounds = true

    platform.body.immovable = true
    platformGroup.setAll('body.immovable', true)
}

function update() {
    game.physics.arcade.collide(adam, [platform, platformGroup])

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        adam.body.acceleration.x = -ACCEL
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        adam.body.acceleration.x = ACCEL
    } else {
        adam.body.acceleration.x = 0
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        adam.body.velocity.y = -5e2
    }
}

export default state
