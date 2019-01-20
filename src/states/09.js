import firebase from 'firebase/app'
import { bindStatesChangeKeys } from '../utils'
require('firebase/database')

const state = function() {}

state.prototype = {
    preload,
    create,
    updateHSText,
}

function preload() {
    const btn1Path = 'assets/sprites/button1.png'
    const btn2Path = 'assets/sprites/button2.png'

    game.load.image('button1', btn1Path)
    game.load.image('button2', btn2Path)
}

let hsText = []
let ref
let fbObj

const sortDesc = (a, b) => b - a

const ROWS = Array.from(new Array(10))
    .map((v, i) => i + 1)
    .reverse()

const TXT_STYLE = { fontSize: '40px' }

const FB_CONFIG = {
    apiKey: 'AIzaSyBulDTnGLFflC5sW-6s2UTLME-B2dBdIAc',
    authDomain: 'highscores-daa19.firebaseapp.com',
    databaseURL: 'https://highscores-daa19.firebaseio.com',
    storageBucket: 'highscores-daa19.appspot.com',
    messagingSenderId: '561693293337',
}

firebase.initializeApp(FB_CONFIG)

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#ffcc66'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    ref = firebase.database().ref('/')

    ROWS.forEach((item, index) => {
        const y = 50 + index * 90
        const header = `${index + 1}.`
        game.add.text(500, y, header, TXT_STYLE).anchor.setTo(1, 0)
        hsText[index] = game.add.text(520, y, '', TXT_STYLE)
    })

    ref.on('value', (snapshot) => {
        fbObj = snapshot.val()
        this.updateHSText(fbObj.hs)
    })

    game.add.button(800, 300, 'button1', () => {
        const score = Math.round(Math.random() * 100)
        fbObj.hs = fbObj.hs.sort(sortDesc).slice(0, ROWS.length)
        fbObj.hs.push(score)
        ref.set(fbObj)
    })

    game.add.button(800, 500, 'button2', () => {
        ref.set({ hs: ROWS.map(() => 0) })
    })
}

function updateHSText(hs) {
    ROWS.forEach((item, index) => {
        hsText[index].text = hs[index] || 0
    })
}

export default state
