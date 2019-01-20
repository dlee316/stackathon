let map;
let layer;
let player;
let controls = {};
let playerSpeed = 150;
let jumpTimer=0;

let Level = {

  preload: function(){
    this.load.tilemap('map', 'assets/world.csv')
    this.load.image('tileset','assets/tiles.png' )
    this.load.spritesheet('player', 'assets/character.png',24,26)
  },

  create: function(){
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
    player = this.add.sprite(100, 800, 'player')
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
  },

  resetPlayer: function(){
    player.reset(100,800)
  },

  getClothes: function(){
    map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y))
   }
}
