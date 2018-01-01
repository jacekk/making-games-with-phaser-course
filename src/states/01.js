import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    preload,
    create,
    update,
}

export default state

function preload() {
    const fieldPath = '/assets/tilemaps/field.json'
    const grassPath = '/assets/tilemaps/grassTiles.png'
    const rockPath = '/assets/tilemaps/rockTiles.png'

    game.load.tilemap('field', fieldPath, null, Phaser.Tilemap.TILED_JSON)
    game.load.image('grassTiles', grassPath)
    game.load.image('rockTiles', rockPath)
}

function create() {
    bindStatesChangeKeys()

    const map = game.add.tilemap('field')

    map.addTilesetImage('grassTiles')
    map.addTilesetImage('rockTiles')

    const grass = map.createLayer('grass')
    const rocks = map.createLayer('rocks')
}

function update() {}
