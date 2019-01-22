let Winner = {
  preload: function(){
    this.load.image('winner', 'assets/winner.png')

  },
  create: function(){
    game.stage.backgroundColor = "#fff"
    let image = this.add.sprite(0,0, 'winner')
    image.height = game.height
    image.width = game.width-80

  },
  update: function(){}
}
