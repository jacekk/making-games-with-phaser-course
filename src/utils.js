export const startStageOnKey = (name, key) => {
    game.input.keyboard.addKey(key).onDown.add(() => {
        game.state.start(name);
    }, null, null);
}

export const bindStatesChangeKeys = () => {
    startStageOnKey('state00', Phaser.Keyboard.ZERO);
    startStageOnKey('state01', Phaser.Keyboard.ONE);
    startStageOnKey('state02', Phaser.Keyboard.TWO);
    startStageOnKey('state03', Phaser.Keyboard.THREE);
    startStageOnKey('state04', Phaser.Keyboard.FOUR);
    startStageOnKey('state05', Phaser.Keyboard.FIVE);
    startStageOnKey('state06', Phaser.Keyboard.SIX);
    startStageOnKey('state07', Phaser.Keyboard.SEVEN);
    startStageOnKey('state08', Phaser.Keyboard.EIGHT);
    startStageOnKey('state09', Phaser.Keyboard.NINE);
}
