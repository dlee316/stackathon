let map;
let layer;
let player;
let controls = {};
let playerSpeed = 150;
let jumpTimer=0;
let enemy;
let timer = 0;

Enemy = function(index, game, x,y){
  this.enemy = game.add.sprite(x,y,'enemy')
  this.enemy.anchor.setTo(0.5,0.5)
  this.enemy.name = index.toString()
  game.physics.enable(this.enemy, Phaser.Physics.ARCADE)
  this.enemy.body.immovable = true
  this.enemy.body.collideWorldBounds = true
  this.enemy.body.allowGravity = false

  //tween moves from one side to another
  this.enemyTween = game.add.tween(this.enemy).to({
    y:this.enemy.y+110
  },650,'Linear',true,0,100,true)
}


let Level = {

  preload: function(){
    this.load.tilemap('map', 'assets/world.csv')
    this.load.image('tileset','assets/tiles.png' )
    this.load.spritesheet('player', 'assets/character.png',24,26)
    this.load.image('enemy', 'assets/enemy.png')
  },

  create: function(game){
    //map
    this.stage.backgroundColor = '#F8F8FF'
    map = game.add.tilemap('map', 32,32)
    map.addTilesetImage('tileset')
    layer = map.createLayer(0)
    layer.resizeWorld()

    map.setCollisionBetween(0,0)

    //obstacle (first param is index of tileset)
    map.setTileIndexCallback(26,this.resetPlayer,this)

    //clothes
    map.setTileIndexCallback(21,this.getClothes,this)


    this.physics.arcade.gravity.y = 1400

    //character
    player = this.add.sprite(250, 800, 'player')
    player.anchor.setTo(0.5,0.5)

    //last param is for looping
    player.animations.add('idle', [0,1], true)
    player.animations.add('jump', [2],1, true)
    player.animations.add('run', [3,4,5,6,7,8], true)

    this.physics.arcade.enable(player)
    // this.camera.follow(player)
    player.body.collideWorldBounds = true;

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }

    //enemy
     enemy = new Enemy(0,game,player.x+470,player.y-580)

  },

  update: function(){
    this.physics.arcade.collide(player,layer)
    player.body.velocity.x = 0

    if(controls.right.isDown){
      player.animations.play('run')
      player.scale.setTo(1,1)
      player.body.velocity.x += playerSpeed
    }
    if(controls.left.isDown){
      player.animations.play('run')
      player.scale.setTo(-1,1)
      player.body.velocity.x -= playerSpeed
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down)&& this.time.now > jumpTimer){
      player.body.velocity.y =-430
      jumpTimer = this.time.now + 750
      player.animations.play('jump')
    }

    if(player.body.velocity.x==0 && player.body.velocity.y == 0 ){
      player.animations.play('idle')
    }
    if(this.checkOverlap(player,enemy.enemy)){
      this.resetPlayer()
      player.animation.play('idle')
    }



  },


  resetPlayer: function(){
    player.body.enable = false;
    player.animations.stop();
    game.time.events.add(Phaser.Timer.SECOND, function() {
      game.state.paused = true;
      game.state.start('Level')
    })
  },

  getClothes: function(){
    map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y))
   },
   checkOverlap: function(a,b){
     let boundsA = a.getBounds()
     let boundsB = b.getBounds()
     return Phaser.Rectangle.intersects(boundsA, boundsB)
   }
}
