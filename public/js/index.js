
let game = new Phaser.Game(800, 608, Phaser.AUTO, '')

game.state.add('Level', Level)
game.state.add('Winner', Winner)
game.state.add('Loser', Loser)
game.state.start("Level")

