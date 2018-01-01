import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    create,
    preload,
    update,
}

export default state

const ADAM_VELOCITY = 500

let adam
let cursors
let grass
let rocks

function preload() {
    const fieldPath = '/assets/tilemaps/field.json'
    const grassPath = '/assets/tilemaps/grassTiles.png'
    const rockPath = '/assets/tilemaps/rockTiles.png'
    const adamPath = '/assets/sprites/adam.png'

    game.load.tilemap('field', fieldPath, null, Phaser.Tilemap.TILED_JSON)
    game.load.image('grassTiles', grassPath)
    game.load.image('rockTiles', rockPath)
    game.load.image('adam', adamPath)
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.stage.backgroundColor = '#386339';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    bindStatesChangeKeys()

    const map = game.add.tilemap('field')

    map.addTilesetImage('grassTiles')
    map.addTilesetImage('rockTiles')

    grass = map.createLayer('grass')
    rocks = map.createLayer('rocks')

    map.setCollisionBetween(0, 9, true, 'rocks')
    map.setCollision(11, true, 'grass')

    adam = game.add.sprite(0, 0, 'adam')
    adam.scale.setTo(0.2, 0.2)
    game.physics.enable(adam)

    cursors = game.input.keyboard.createCursorKeys()
}

function update() {
    game.physics.arcade.collide(adam, rocks)
    game.physics.arcade.collide(adam, grass)

    if (cursors.up.isDown) {
        adam.body.velocity.y = -ADAM_VELOCITY
    } else if (cursors.down.isDown) {
        adam.body.velocity.y = ADAM_VELOCITY
    } else {
        adam.body.velocity.y = 0
    }

    if (cursors.right.isDown) {
        adam.body.velocity.x = ADAM_VELOCITY
    } else if (cursors.left.isDown) {
        adam.body.velocity.x = -ADAM_VELOCITY
    } else {
        adam.body.velocity.x = 0
    }
}
