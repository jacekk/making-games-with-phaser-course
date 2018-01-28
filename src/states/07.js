import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    preload,
    create,
    update,
    startSwipe,
    getSwipeDirection,
}

function preload() {
    const arrowPath = '/assets/sprites/arrow.png'

    game.load.image('arrow', arrowPath)
}

const LEEWAY = 10

let arrow
let swipeStart = {
    x: 0,
    y: 0,
}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#a6ff4d'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    arrow = game.add.sprite(DIMS.STAGE_CENTER_X, DIMS.STAGE_CENTER_Y, 'arrow')
    arrow.anchor.setTo(0.5)

    game.input.onDown.add(this.startSwipe)
    game.input.onUp.add(this.getSwipeDirection)
}

function update() {}

function startSwipe() {
    swipeStart.x = game.input.x
    swipeStart.y = game.input.y
}

function getSwipeDirection() {
    const end = {
        x: game.input.x,
        y: game.input.y,
    }

    const yDiff = Math.abs(end.y - swipeStart.y)
    const xDiff = Math.abs(end.x - swipeStart.x)

    if (xDiff < LEEWAY && yDiff < LEEWAY) {
        return
    }

    const isHorizontal = yDiff < xDiff
    let swipeDirection

    if (isHorizontal) {
        if (end.x > swipeStart.x) {
            swipeDirection = 90
        } else {
            swipeDirection = 270
        }
    } else {
        if (end.y > swipeStart.y) {
            swipeDirection = 180
        } else {
            swipeDirection = 0
        }
    }

    arrow.angle = swipeDirection
}

export default state
