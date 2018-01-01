import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    preload,
    create,
    update,
}

export default state

function preload() {}

function create() {
    bindStatesChangeKeys()
}

function update() {}
