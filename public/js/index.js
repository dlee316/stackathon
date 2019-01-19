
let game = new Phaser.Game(800, 600, Phaser.AUTO, '')

game.state.add('Round1', Round1)

game.state.start("Round1")

