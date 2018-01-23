import { bindStatesChangeKeys } from '../utils'
import DIMS from '../dimentions'

const state = function() {}

state.prototype = {
    create,
    fireBullet,
    hitEnemy,
    hitGroup,
    preload,
    update,
}

const VELOCITY = 1e3
const FIRE_RATE = 4e2

let barrel
let base
let bullet
let bullets
let enemy
let enemyGroup
let nextFire = 0

function preload() {
    const basePath = '/assets/sprites/cannonBase.png'
    const barrelPath = '/assets/sprites/cannonBarrel.png'
    const bulletPath = '/assets/sprites/bullet.png'
    const adamPath = '/assets/sprites/adam.png'

    game.load.image('base', basePath)
    game.load.image('barrel', barrelPath)
    game.load.image('bullet', bulletPath)
    game.load.image('adam', adamPath)
}

function create() {
    bindStatesChangeKeys()
    game.stage.backgroundColor = '#80ff80'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    const stageCenter = [DIMS.STAGE_CENTER_X, DIMS.STAGE_CENTER_Y]

    base = game.add.sprite(...stageCenter, 'base')
    bullets = game.add.group()
    barrel = game.add.sprite(...stageCenter, 'barrel')
    enemy = game.add.sprite(100, 200, 'adam')
    enemyGroup = game.add.group()

    base.anchor.setTo(0.5)
    base.scale.setTo(0.4)
    barrel.anchor.setTo(0.3, 0.5)
    barrel.scale.setTo(0.5)

    bullets.enableBody = true
    bullets.physicsBodyType = Phaser.Physics.ARCADE
    bullets.createMultiple(50, 'bullet')
    bullets.setAll('checkWorldBounds', true)
    bullets.setAll('outOfBoundsKill', true)
    bullets.setAll('anchor.y', 0.5)
    bullets.setAll('scale.x', 0.85)
    bullets.setAll('scale.y', 0.85)

    game.physics.enable(enemy)

    enemyGroup.enableBody = true
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE

    for (let i = 0; i < 3; i++) {
        enemyGroup.create(1300, 350 * i + 100, 'adam')
    }

    enemyGroup.setAll('anchor.x', 0.5)
    enemyGroup.setAll('anchor.y', 0.5)
    enemyGroup.setAll('scale.x', 0.4)
    enemyGroup.setAll('scale.y', 0.4)
}

function update() {
    barrel.rotation = game.physics.arcade.angleToPointer(barrel)

    if (game.input.activePointer.isDown) {
        this.fireBullet()
    }

    game.physics.arcade.overlap(bullets, enemy, this.hitEnemy)
    game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup)
}

function fireBullet() {
    if (game.time.now <= nextFire) {
        return
    }

    bullet = bullets.getFirstDead()
    bullet.reset(barrel.x, barrel.y)
    game.physics.arcade.moveToPointer(bullet, VELOCITY)
    bullet.rotation = game.physics.arcade.angleToPointer(bullet)
    nextFire = game.time.now + FIRE_RATE
}

function hitEnemy() {
    enemy.kill()
    bullet.kill()
}

function hitGroup(enemy) {
    bullet.kill()
    enemy.kill()
}

export default state
