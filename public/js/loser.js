let Loser = {
  preload: function(){
    this.load.image('loser', 'assets/loser.png')

  },
  create: function(){
    game.stage.backgroundColor = "#fff"
    let image = this.add.sprite(0,0, 'loser')
    image.height = game.height
    image.width = game.width-80

  },
  update: function(){}
}
