let Round1 = {

  preload: function() {
    this.load.image('ground', 'assets/ground.png')
    this.load.image('player', 'assets/player.png')
  }
,
create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    //ground
    this.platform = game.add.group()
    this.platform.enableBody = true
  let ground;
    for(let i=0; i<20; i++){
       ground  = this.platform.create(
        i*45,
        game.world.height-64,
        'ground'
        )
        ground.body.immovable = true
    }
    //if something hits the ground it will fall

    //player
    this.player = game.add.sprite(400,300, 'player')
    //turning on physics for player
    game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true

    //adding gravity
    this.player.body.gravity.y = 300

    //can use keyboard (event listener)
    this.keyboard = game.input.keyboard
  },
  update: function() {
    //collide
    const hitFloor = game.physics.arcade.collide(this.player, this.platform)

    //define movement
    this.player.body.velocity.x = 0


    if(this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.touching.down && hitFloor) {
      this.player.body.velocity.y = -400
    }


  }
}
