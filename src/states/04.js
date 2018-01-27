import { bindStatesChangeKeys } from '../utils'

const state = function() {}

state.prototype = {
    preload,
    create,
    update,
}

let adams = []

function preload() {
    const adamPath = '/assets/sprites/adam.png'

    game.load.image('adam', adamPath)
}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#cc66ff'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    const xPositons = [50, 350, 650, 950, 1250]
    xPositons.forEach((x) => {
        adams.push(game.add.sprite(x, 100, 'adam'))
    })

    game.add.tween(adams[0]).to({ y: '+400' }, 2e3, 'Linear', true)
    game.add.tween(adams[1]).from({ y: 400 }, 2e3, 'Quad.easeOut', true)

    window.tween1 = game.add.tween(adams[2]).to({ y: 400 }, 2e3, 'Bounce')
    // and then `tween1.start()` in DevTools Console

    game.add
        .tween(adams[3].anchor)
        .to({ y: -0.3, x: 1.5 }, 1e3, 'Linear', true, 1e3, false, true)
        .loop(true)

    game.add.tween(adams[4]).to({ alpha: 0 }, 4e3, 'Quad.easeOut', true)
}

function update() {}

export default state
