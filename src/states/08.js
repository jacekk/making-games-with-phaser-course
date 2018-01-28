import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    preload,
    create,
    spellOutText,
}

const TEXT_MARGIN = 200
const LOREM_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function preload() {}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#99e6e6'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    const textWidth = DIMS.STAGE_WIDTH - TEXT_MARGIN * 2

    this.spellOutText(
        TEXT_MARGIN,
        TEXT_MARGIN,
        textWidth,
        LOREM_TEXT,
        40,
        '30px',
        '#f55'
    )
}

function spellOutText(x, y, width, text, speed, fontSize, fill) {
    const sentence = game.add.text(x, y, '', { fontSize, fill })
    const currentLine = game.add.text(TEXT_MARGIN, 40, '', { fontSize })
    const loop = game.time.events.loop(speed, addChar)

    let index = 0
    currentLine.alpha = 0.2 // comment out to show && debug

    function addChar() {
        const char = text[index]

        sentence.text += char
        currentLine.text += char

        if (currentLine.width > width && text[index] === ' ') {
            sentence.text += '\n'
            currentLine.text = ''
        }

        if (index >= text.length - 1) {
            game.time.events.remove(loop)
        }

        index += 1
    }
}

export default state
