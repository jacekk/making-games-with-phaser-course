import { bindStatesChangeKeys } from '../utils'

const state = function() {}

state.prototype = {
    preload,
    create,
    update,
    tint,
    unTint,
}

let sound

function preload() {
    const button1 = '/assets/sprites/button1.png'
    const button2 = '/assets/sprites/button2.png'
    const button3 = '/assets/sprites/button3.png'
    const popsSound = '/assets/sounds/buttonPops.mp3'

    game.load.image('button1', button1)
    game.load.image('button2', button2)
    game.load.image('button3', button3)
    game.load.audio('pops', popsSound)
}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#1a1aff'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    sound = game.add.audio('pops')

    sound.addMarker('low', 0.14, 0.2)
    sound.addMarker('high', 1.13, 1.2)

    const btn1 = game.add.button(100, 100, 'button1', () => {
        game.state.start('state01')
    })
    const btn2 = game.add.button(400, 400, 'button2', () => {
        game.state.start('state02')
    })
    const btn3 = game.add.button(700, 700, 'button3')

    btn1.onInputDown.add(this.tint, btn1)
    btn2.onInputDown.add(this.tint, btn2)
    btn3.onInputDown.add(this.tint, btn3)

    btn1.onInputUp.add(this.unTint, btn1)
    btn2.onInputUp.add(this.unTint, btn2)
    btn3.onInputUp.add(this.unTint, btn3)
}

function update() {}

function tint() {
    this.tint = 0xbbbbbb
    sound.play('low')
}

function unTint() {
    this.tint = 0xffffff
    sound.play('high')
}

export default state
