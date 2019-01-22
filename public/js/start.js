let Start = {
  preload: function(){
    this.load.image('start', 'assets/start.png')

  },
  create: function(){
    game.stage.backgroundColor = "#fff"
    let image = this.add.sprite(0,0, 'start')
    image.height = game.height
    image.width = game.width-90

  },
  update: function(){
    if(game.input.activePointer.isDown){
      game.state.start("Level")
    }
  }
}
