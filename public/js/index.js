
let game = new Phaser.Game(800, 600, Phaser.AUTO, '')

game.state.add('Level', Level)

game.state.start("Level")

