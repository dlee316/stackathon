let map;
let layer;
let player;
let controls = {};
let playerSpeed = 150;
let jumpTimer=0;
let enemy;
let stars;
let star;
let score;
let scoreText;


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
    // this.load.spritesheet('player', 'assets/character.png',24,26)
    this.load.spritesheet('player','assets/player.png',25,32)
    this.load.image('enemy', 'assets/enemy.png')
    this.load.image('star','assets/star.png')
  },

  create: function(game){
    //map
    this.stage.backgroundColor = '#F8F8FF'
    map = game.add.tilemap('map', 32,32)
    map.addTilesetImage('tileset')
    layer = map.createLayer(0)
    layer.resizeWorld()

    map.enableBody = true
    map.setCollisionBetween(0,0)

    //obstacle (first param is index of tileset)
    map.setTileIndexCallback(26,function(){
      map.replace(26,30)
      this.resetPlayer()
    },this)



    this.physics.arcade.gravity.y = 1400

    //character
    player = this.add.sprite(250, 800, 'player')
    player.anchor.setTo(0.5,0.5)

    //last param is for looping
    player.animations.add('idle', [0], true)
    player.animations.add('jump', [6],5, true)
    player.animations.add('run', [3,4,5,6], true)

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

     //star
     stars = game.add.group()
     stars.enableBody = true
     star = stars.create(100,200,'star')
     star = stars.create(740,200,'star')
     star = stars.create(680,500,'star')
     star = stars.create(390,500,'star')
     star = stars.create(100,30,'star')
     star = stars.create(740,30,'star')

     star.body.gravity.y = 300
     star.body.bounce.y = 0.7 + Math.random() * 0.2


    scoreText = game.add.text('score: 0', { fontSize: '32px', fill: '#000' })
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
    }


    //star
    game.physics.arcade.collide(stars, layer)
    game.physics.arcade.overlap(player, stars, function(player,star){
      star.kill()
      score += 10;
      scoreText.text = 'Score: ' + score;
    }, null, this);

  },


  resetPlayer: function(){
    player.body.enable = false;
    player.animations.stop()
    this.game.time.events.add(Phaser.Timer.SECOND*.25, function() {
      player.animations.play('idle')
      game.state.paused = true;
      game.state.start('Level')
    })
  },

   checkOverlap: function(a,b){
     let boundsA = a.getBounds()
     let boundsB = b.getBounds()
     return Phaser.Rectangle.intersects(boundsA, boundsB)
   }
}
