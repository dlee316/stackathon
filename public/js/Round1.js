let Round1 = {

  preload: function() {
    this.load.image('ground', 'assets/ground.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('test', 'assets/test.png')
  },

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
        //if something hits the ground it wont fall
        ground.body.immovable = true
    }

    // for(let i=0; i<3; i++){
    //   ground = this.platform.create(i*45,
    //    game.world.height -110,
    //    'ground')
    //    ground.body.immovable = true
    // }

    // for(let i=0; i<4; i++){
    //   ground = this.platform.create((i*45)+500,400, 'ground')
    //   ground.body.immovable = true
    // }

    // //vertical
    // // for(let i=0; i<3; i++){
    // //   ground = this.platform.create(314,(i*45)+399,'ground')
    // //         ground.body.immovable = true

    // // }

    // ground = this.platform.create((500,200, 'ground_long_2'))
    // let ledge = this.platform.create(400,450,'ground_long_2')
    // ledge.body.immovable = true

    //player
    this.player = game.add.sprite(200,400, 'player')
    //turning on physics for player
    game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true

    //adding gravity
    this.player.body.gravity.y = 600

    //can use keyboard (event listener)
    this.keyboard = game.input.keyboard
  },

  update: function() {
    //collide
    const hitFloor = game.physics.arcade.collide(this.player, this.platform)

    //define movement
    this.player.body.velocity.x = 0


    if(this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.touching.down ) {
      this.player.body.velocity.y = -400
    }

    if(this.keyboard.isDown(Phaser.Keyboard.LEFT)){
      this.player.body.velocity.x = -100
    }

    if(this.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      this.player.body.velocity.x = 100
    }

    //when adding animation
    // this.player.animations.add('walkLeft', [8, 9, 10], 10, true);
    // this.player.goesRight = true;


  }
}
