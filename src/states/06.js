import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    preload,
    create,
    update,
}

function preload() {
    const volcanoPath = '/assets/sprites/volcano.png'
    const redBallPath = '/assets/sprites/redBall.png'
    const orBallPath = '/assets/sprites/orBall.png'

    game.load.image('volcano', volcanoPath)
    game.load.image('redBall', redBallPath)
    game.load.image('orBall', orBallPath)
}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#cc6699'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    const volcano = game.add
        .sprite(DIMS.STAGE_CENTER_X, DIMS.STAGE_HEIGHT, 'volcano')
        .anchor.setTo(0.5, 1)

    const emitter = game.add.emitter(
        DIMS.STAGE_CENTER_X,
        DIMS.STAGE_CENTER_Y,
        2e3
    )

    emitter.makeParticles(['redBall', 'orBall'], 0, 5e3, false, true)
    emitter.maxParticleSpeed.set(300, -300)
    emitter.minParticleSpeed.set(-300, -100)
    emitter.gravity = 300

    game.time.events.add(2e3, () => {
        emitter.start(false, 5e3, 20)
        game.time.events.loop(5e2, () => {
            emitter.on = !emitter.on
        })
    })
}

function update() {}

export default state
