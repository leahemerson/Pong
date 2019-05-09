 var Pong = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Pong ()
    {
        Phaser.Scene.call(this, { key: 'pong' });
        this.player1;
        this.player2;
        this.ball;
    },
    preload: function()
    {
        this.load.spritesheet('ball', '../assets/ball.png', { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet('brick0', '../assets/brick0.jpg', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('brick1', '../assets/brick1.jpg',{ frameWidth: 16, frameHeight: 32 });
        this.load.image('stars', '../assets/starfield.jpg',{ frameWidth: 512, frameHeight: 512 });
    },
  create: function () {
    //this.physics.startSystem(Phaser.Physics.ARCADE);
   // this.scale.pageAlignHorizontally = true;
    this.background = this.add.tileSprite(400, 300, 800, 600,'stars');
    this.ball = this.physics.add.image(400, 500,'ball').setCollideWorldBounds(true).setBounce(1);
    this.player1 = this.physics.add.image(750, 300, 'brick0').setImmovable();
    this.player2 = this.physics.add.image(50, 300, 'brick1').setImmovable();
    this.ball.displayWidth = 50;
    this.ball.displayHeight = 50;
    this.player1.displayWidth = 32; 
    this.player1.displayHeight = 64; 
    this.player2.displayWidth = 32; 
    this.player2.displayHeight = 64; 
    //this.background.displayWidth = 800;
    //this.background.displayHeight = 600;
    this.ball.setData('onPaddle', false);
    this.physics.world.setBoundsCollision(false, false, true, true);
     //  Our colliders
    this.physics.add.collider(this.ball, this.player1, this.hitPlayer1, null, this);
    this.physics.add.collider(this.ball, this.brick1, this.hitBrick1, null, this);
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'white'});
    //  Input events
    this.input.on('pointermove', function (pointer) {
        //  Keep the paddle within the game
        this.player1.y = Phaser.Math.Clamp(pointer.y, 52, 748);
        if (this.ball.getData('onPaddle'))
        {
            this.ball.y = this.player1.y;
        }
    }, this);
    this.input.on('pointerup', function (pointer) {
        if (!this.ball.getData('onPaddle'))
        {
            this.ball.setVelocity(100, 400); //make random
            this.ball.setData('onPaddle', false);
        }
        }, this);
    },
    resetLevel: function ()
    {
        this.ball.setVelocity(0);
        this.ball.setPosition(400, 400);
        this.ball.setData('onPaddle', false);
    },
    hitPlayer1: function (ball, player1)
    {
        var diff = 0;
        if (ball.x < player1.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = player1.y - ball.y;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.y > player1.y)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.y -player1.y;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    },
    update: function ()
    {
        if (this.ball.x > 800 || this.ball.x <0)
        {
            if(this.ball.x > 800)
            {
                score1 += 10;
                console.log(score1);
                this.scoreText.setText('Score: ' +score1);
            }
            console.log("end game");
            this.resetLevel();
        }
    }
    });
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [ Pong ],
    physics: {
        default: 'arcade'
    }
};
var game = new Phaser.Game(config);