var player1color;
this.number;
this.color2;
this.scoreText=0;
this.count;
this.player1;
this.color = 0xFFFFFF;
this.color2 = 0xFFFFFF;
function makeButton(name, x, y)
{
this.markers = [
    { name: 'red', color:0xFF0000},
    { name: 'green',color: 0x60BB37},
    { name: 'pink',color: 0xF2ABA0},
    { name: 'purple',color: 0x9900FF},
    { name: 'orange',color: 0xFF9900},
    { name: 'Teal',color: 0x00FFB0},
    { name: 'Aqua',color: 0x2EBD97},
    { name: 'Brown',color: 0x45290B},
    { name: 'Yellow',color: 0xFFFF00},
    { name: 'LightBlue', color: 0x6666FF},
    { name: 'LightGreen',color: 0x00FF00},
    { name: 'Blue',color:0x353582},
    { name: 'LightPurple',color: 0xB4A7D6},
    { name: 'LightRed',color: 0xFF4141},
    { name: 'DarkRed',color: 0xAB0000},
    { name: 'DarkBlue', color:0x161635}
          ];
            this.cursors = this.input.keyboard.createCursorKeys();
    var button = this.add.image(x, y, 'button', 0).setInteractive();
    button.name = name;
    this.add.text(x-95, y-20, button.name, { font: '30px Arial', fill: '#fff' });
     //   var text = this.add.(x - 40, y - 8, 'nokia', name, 16);
   // text.x += (button.width - text.width) / 2;
    button.setScale(7, 1.5);
if(button.name==='Single Player')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.scene.start('game');
        }, this);
    }
     if(button.name==='Time Challenge')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.scene.start('game3');
        }, this);
    }
  if(button.name==='MultiPlayer')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.scene.start('game2');
        }, this);
}
 if(button.name==='Player 1: Color')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.scene.start('char1');
        }, this);
}
  if(button.name==='mainmenu')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.scene.start('mainmenu');
        }, this);
}
   if(button.name==='Player 2: Color')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.scene.start('char2');
        }, this);
}
if(button.name==='red'&&this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
        this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='green'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='pink'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}if(button.name==='purple'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='orange'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}if(button.name==='Teal'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}if(button.name==='Aqua'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
else if(button.name==='Brown'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='Yellow'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightBlue'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightGreen'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='Blue'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightPurple'&&this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightRed'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='DarkRed'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
          this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='DarkBlue'&& this.scene.key==='char1')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='red'&&this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='green'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='pink'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
          this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}if(button.name==='purple'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='orange'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color=button.color;
			            this.scene.start('mainmenu');
        }, this);
}if(button.name==='Teal'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='Aqua'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='Brown'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='Yellow'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightBlue'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightGreen'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='Blue'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
           this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightPurple'&&this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='LightRed'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='DarkRed'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
			            this.scene.start('mainmenu');
        }, this);
}
if(button.name==='DarkBlue'&& this.scene.key==='char2')
{
        button.setInteractive();
        button.once('pointerup', function () {
            this.color2=button.color;
            console.log(button.color);
			            this.scene.start('mainmenu');
        }, this);
}
  }
function setButtonFrame(button, frame)
{
   button.frame = button.scene.textures.getFrame('button', frame);
}
var fx;
var Preloader = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preloader ()
    {
        Phaser.Scene.call(this, { key: 'preloader' });
    },
    preload: function ()
    {
        this.load.image('bg', 'http://labs.phaser.io/assets/skies/deep-space.jpg');
        this.load.image('crazy','http://labs.phaser.io/assets/pics/coma-zero-gravity.png');
        this.load.image('cloud','http://labs.phaser.io/assets/particles/cloud.png');
        this.load.image('norm','http://labs.phaser.io/assets/pics/cockpit.png');
        this.load.image('rain','http://labs.phaser.io/assets/swatches/colormap.png');
        this.load.image('loser','http://labs.phaser.io/assets/pics/archmage-in-your-face.png');
    this.load.spritesheet('button', 'http://labs.phaser.io/assets/ui/flixel-button.png',{ frameWidth: 35, frameHeight: 22 });
   // this.load.bitmapFont('nokia', 'assets/fonts/bitmap/nokia16black.png', 'assets/fonts/bitmap/nokia16black.xml');
        this.load.spritesheet('ball', 'http://labs.phaser.io/assets/sprites/blue_ball.png',{ frameWidth: 20, frameHeight: 20 });
        this.load.image('brick0','http://labs.phaser.io/assets/sprites/16x16.png');
         this.load.image('brick1','http://labs.phaser.io/assets/sprites/16x16.png');
        this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
    },
    create: function ()
    {
        this.scene.start('mainmenu');
        var bg = this.add.image(400, 300, 'sky');    }
});
var MainMenu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
        window.MENU = this;
    },
    create: function ()
    {
    fx = this.sound.add('sfx');
            var bg = this.add.image(400, 300, 'sky');
    bg.setScale(800/bg.width, 600/bg.height);
    markers = [
    { name: 'Single Player' },
    { name: 'MultiPlayer' },
    {name: 'Time Challenge'},
    {name: 'Player 1: Color'},
    {name: 'Player 2: Color'}];
Menu = this.add.text(100, 20, 'Pong Menu', { font: '100px Arial', fill: '#fff' });
        makeButton.call(this, markers[0].name, 350, 240);
        makeButton.call(this, markers[1].name, 350, 280);
        makeButton.call(this, markers[2].name, 350, 320);
        makeButton.call(this, markers[3].name, 350, 360);
        makeButton.call(this, markers[4].name, 350, 400);
    }
});
var Char1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Char1 ()
    {
        Phaser.Scene.call(this, { key: 'char1' });
        window.CHAR1 = this;
        this.controls;
        this.track;
        this.text;
    },
      create: function ()
    {
            var bg = this.add.image(400, 300, 'bg');
    bg.setScale(800/bg.width, 600/bg.height);
Character = this.add.text(50, 20, 'One Player:', { font: '100px Arial', fill: '#fff' });
Character2 = this.add.text(70, 120, 'Pick Your Character Color:', { font: '50px Arial', fill: '#fff' });
     var markers = [
    { name: 'red', color:0xFF0000},
    { name: 'green',color: 0x60BB37},
    { name: 'pink',color: 0xF2ABA0},
    { name: 'purple',color: 0x9900FF},
    { name: 'orange',color: 0xFF9900},
    { name: 'Teal',color: 0x00FFB0},
    { name: 'Aqua',color: 0x2EBD97},
    { name: 'Brown',color: 0x45290B},
    { name: 'Yellow',color: 0xFFFF00},
    { name: 'LightBlue', color: 0x6666FF},
    { name: 'LightGreen',color: 0x00FF00},
    { name: 'Blue',color:0x353582},
    { name: 'LightPurple',color: 0xB4A7D6},
    { name: 'LightRed',color: 0xFF4141},
    { name: 'DarkRed',color: 0xAB0000},
    { name: 'DarkBlue', color:0x161635}
          ];
  markerMenu=[{name:'mainmenu'}];
    makeButton.call(this, markerMenu[0].name, 660, 500);
for(i=0; i<markers.length; i++)
       {markers[i].tint=markers[i].color;
       this.number=i;
           if(i<=3)
           {
        makeButton.call(this, markers[i].name, 110, 200 + (i+1)*60);}
        if(i>3 &&i<=7)
           {
        makeButton.call(this, markers[i].name, 110+190, 200 + (i-3)*60); }
         if(i>7 &&i<=11)
           {
        makeButton.call(this, markers[i].name, 110+190*2, 200 + (i-7)*60); }
         if(i>11 &&i<=15)
           {
        makeButton.call(this, markers[i].name, 110+190*3, 200 + (i-11)*60); }
       }
    }
});
var Char2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Char2 ()
    {
        Phaser.Scene.call(this, { key: 'char2' });
        window.CHAR2 = this;
        this.controls;
        this.track;
        this.text;
    },
      create: function ()
    {
            var bg = this.add.image(400, 300, 'bg');
    bg.setScale(800/bg.width, 600/bg.height);
Character = this.add.text(50, 20, 'Second Player:', { font: '100px Arial', fill: '#fff' });
Character2 = this.add.text(70, 120, 'Pick Your Character Color:', { font: '50px Arial', fill: '#fff' });
     var markers = [
    { name: 'red', color:0xFF0000},
    { name: 'green',color: 0x60BB37},
    { name: 'pink',color: 0xF2ABA0},
    { name: 'purple',color: 0x9900FF},
    { name: 'orange',color: 0xFF9900},
    { name: 'Teal',color: 0x00FFB0},
    { name: 'Aqua',color: 0x2EBD97},
    { name: 'Brown',color: 0x45290B},
    { name: 'Yellow',color: 0xFFFF00},
    { name: 'LightBlue', color: 0x6666FF},
    { name: 'LightGreen',color: 0x00FF00},
    { name: 'Blue',color:0x353582},
    { name: 'LightPurple',color: 0xB4A7D6},
    { name: 'LightRed',color: 0xFF4141},
    { name: 'DarkRed',color: 0xAB0000},
    { name: 'DarkBlue', color:0x161635}
          ];
            markerMenu=[{name:'mainmenu'}];
    makeButton.call(this, markerMenu[0].name, 660, 500);
for(i=0; i<markers.length; i++)
       {
       this.number=i;
           if(i<=3)
           {
        makeButton.call(this, markers[i].name, 110, 200 + (i+1)*60);}
        if(i>3 &&i<=7)
           {
        makeButton.call(this, markers[i].name, 110+190, 200 + (i-3)*60); }
         if(i>7 &&i<=11)
           {
        makeButton.call(this, markers[i].name, 110+190*2, 200 + (i-7)*60); }
         if(i>11 &&i<=15)
           {
        makeButton.call(this, markers[i].name, 110+190*3, 200 + (i-11)*60); }
       }
    }
});
var Pong = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Pong ()
    {
        Phaser.Scene.call(this, { key: 'game' });
        this.player1;
        this.ball;
        this.scoreTime;
        this.endTime;
    },
  create: function () {
  var bg = this.add.image(400, 300, 'sky');
    timeInSeconds = 0;
    this.ball = this.physics.add.image(400, 400,'ball').setCollideWorldBounds(true).setBounce(1.01,1);
    this.player1 = this.physics.add.image(50, 300, 'brick0').setImmovable().setTint(this.color);
    count=0;
     this.scoreTime = this.add.text(30, 50, 'Time: '+0, { fontSize: '32px', fill: 'white'});
    for(i=0;i<10;i++)
    {
        for(j=0;j<5;j++)
    {
       pizza= this.physics.add.image(750-34*j, 550-64*i, 'cloud').setImmovable();
            pizza.displayWidth = 32;
    pizza.displayHeight = 64;
     this.physics.add.collider(this.ball, pizza, this.hitpizza, null, this);
    }}
    //this.player1 = this.physics.add.image(50, 300, 'brick1').setImmovable();
    this.ball.displayWidth = 50;
    this.ball.displayHeight = 50;
    this.player1.displayWidth = 32;
    this.player1.displayHeight = 64;
    this.ball.setData('onPaddle', false);
    this.physics.world.setBoundsCollision(false, false, true, true);
//    this.physics.add.collider(this.ball, this.player1, this.hitPlayer1, null, this);
 //   this.physics.add.collider(this.ball, this.brick1, this.hitBrick1, null, this);
    time=0;
    this.ex = this.add.text(16,100, 'How many blocks can you destroy?', { fontSize: '32px', fill: 'white'});
    this.scoreText = this.add.text(16, 16, 'Score: '+count, { fontSize: '32px', fill: 'white'});
    this.Mouse = this.add.text(50, 150, 'Use Mouse To Move', { fontSize: '30px', fill: 'white'});
    this.Space = this.add.text(50, 500, 'Use Space To Exit to Menu', { fontSize: '30px', fill: 'white'});
     this.Start = this.add.text(50, 350, 'Click to Start', { fontSize: '75px', fill: 'white'});
    this.input.on('pointermove', function (pointer) {
        this.player1.y = Phaser.Math.Clamp(pointer.y, 52, 748);
        if (this.ball.getData('onPaddle'))
        {
           // this.ball.y = this.player1.y;
        }
    }, this);
    this.ball.setVelocity(0,0);
    this.input.on('pointerup', function (pointer) {
        if (!this.ball.getData('onPaddle'))
        {
            this.ball.setVelocity(300, 400); //make random
            this.ball.setData('onPaddle', true);
            this.Mouse.setText('');
            this.Start.setText('');
          //  this.Space.setText('');
            this.scoreTime.setText('');
             this.scoreText.setText('');
             this.ex.setText('');
timeInSeconds = 0;
    this.physics.add.collider(this.ball, this.player1, this.hitPlayer1, null, this);
//    this.physics.add.collider(this.ball, this.brick1, this.hitBrick1, null, this);
this.ball.setVelocity(400,400);
        }
        }, this);
    },
    hitPlayer1: function (ball, player1)
    {
        var diff = 0;
        if (ball.x < player1.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = player1.x - ball.x;
            ball.setVelocityX(10 * diff);
        }
        else if (ball.y > player1.y)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -player1.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(102 + Math.random() * 8);
        }
    },
    hitpizza: function (ball, pizza)
    {
            pizza.destroy();
            ball.setVelocityX(-10 * 12);
            count=count+1;
    },
    update: function ()
    {
        if (this.ball.x > 800)
        {
            this.count=count;
                    this.ball.setVelocity(0);
                     for(i=0;i<10;i++)
					    {
					        for(j=0;j<5;j++)
					    {
					       pizza= this.physics.add.image(750-34*j, 550-64*i, 'brick0').setImmovable();
					            pizza.displayWidth = 32;
					    pizza.displayHeight = 64;
					     this.physics.add.collider(this.ball, pizza, this.hitpizza, null, this);
    }}
        this.ball.setPosition(400, 400);
        this.ball.setData('onPaddle', false);
        }
        if(this.ball.x <0)
        {
            console.log("end game");
		console.log(count);
		document.getElementById("score1").value = count;
            this.scene.start('gameover');
        }
        cursors = this.input.keyboard.createCursorKeys();      if(cursors.space.isDown)
		  {
		              this.scene.start('mainmenu');
}
 if (cursors.up.isDown) {
    player1.body.velocity.y = -200;
  } else if (cursors.down.isDown) {
    player1.body.velocity.y = 200;
  }
this.scoreText.setText('Score:' + count);
timeInSeconds++;
this.scoreTime.setText('Time: '+timeInSeconds/100);
    }
    });
 var Pong3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Pong3 ()
    {
        Phaser.Scene.call(this, { key: 'game3' });
        this.player1;
        this.ball;
        this.scoreTime;
        this.endTime;
    },
  create: function () {
    timeInSeconds = 0;
    this.background = this.add.image(400,300,'rain');
    this.ball = this.physics.add.image(400, 400,'ball').setCollideWorldBounds(true).setBounce(1.01,1);
    //this.player1 = this.physics.add.image(750, 300, 'brick0').setImmovable().setTint(this.color);
    this.player1 = this.physics.add.image(50, 300, 'brick1').setImmovable().setTint(this.color);
    this.ball.displayWidth = 50;
    this.background.displayWidth = 800;
    this.background.displayHeight = 800;
    this.ball.displayHeight = 50;
    this.player1.displayWidth = 32;
    this.player1.displayHeight = 64;
    this.ball.setData('onPaddle', false);
    this.physics.world.setBoundsCollision(false, true, true, true);
    time=0;
    this.scoreTime = this.add.text(30, 20, '', { fontSize: '32px', fill: 'white'});
    this.Mouse = this.add.text(50, 150, 'Use Mouse To Move', { fontSize: '30px', fill: 'white'});
     this.Start = this.add.text(50, 350, 'Click to Start', { fontSize: '75px', fill: 'white'});
     this.Space = this.add.text(50, 500, 'Use Space To Exit to Menu', { fontSize: '30px', fill: 'white'});
      this.ex = this.add.text(50, 50, 'How long can you last?', { fontSize: '50px', fill: 'white'});
    this.input.on('pointermove', function (pointer) {
        this.player1.y = Phaser.Math.Clamp(pointer.y, 52, 748);
        if (this.ball.getData('onPaddle'))
        {
           // this.ball.y = this.player1.y;
        }
    }, this);
    this.ball.setVelocity(0,0);
    this.input.on('pointerup', function (pointer) {
        if (!this.ball.getData('onPaddle'))
        {
            this.ball.setVelocity(300, 400); //make random
            this.ball.setData('onPaddle', true);
            this.Mouse.setText('');
            this.Start.setText('');
           // this.Space.setText('');
            this.ex.setText('');
                        this.scoreTime.setText('');
      //       this.scoreText.setText('');
timeInSeconds = 0;
    this.physics.add.collider(this.ball, this.player1, this.hitPlayer1, null, this);
    this.physics.add.collider(this.ball, this.brick1, this.hitBrick1, null, this);
this.ball.setVelocity(400,400);
        }
        }, this);
    },
    hitPlayer1: function (ball, player1)
    {
        var diff = 0;
        if (ball.x < player1.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = player1.x - ball.x;
            ball.setVelocityX(10 * diff);
        }
        else if (ball.y > player1.y)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -player1.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(102 + Math.random() * 8);
        }
    },
    //hitpizza: function (ball, pizza)
    //{
     //       pizza.destroy();
      //      ball.setVelocityX(-10 * 12);
       //     count=count+1;
    //},
    update: function ()
    {
        if (this.ball.x > 800)
        {
      //      this.count=count;
                    this.ball.setVelocity(0);
        this.ball.setPosition(400, 400);
        this.ball.setData('onPaddle', false);
        }
        if(this.ball.x <0)
        {
            console.log("end game");
            this.scene.start('gameover3');
        }
        cursors = this.input.keyboard.createCursorKeys();      if(cursors.space.isDown)
		  {
		              this.scene.start('mainmenu');
}
 if (cursors.up.isDown) {
    player1.body.velocity.y = -200;
  } else if (cursors.down.isDown) {
    player1.body.velocity.y = 200;
  }
//this.scoreText.setText('Score:' + count);
timeInSeconds++;
this.scoreTime.setText('Time: '+timeInSeconds/100);
    }
    });
    var Pong2 = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function Pong2 ()
        {
            Phaser.Scene.call(this, { key: 'game2' });
            this.player1;
            this.player2;
            this.ball;
            this.scoreText;
            this.Score1;
            this.Score2;
            this.Player1_score;
            this.Player2_score;
        },
      create: function () {
background=this.add.image(400, 300, 'sky');
        timeInSeconds = 0;
         this.scoreTime = this.add.text(30, 50, 'Time: '+timeInSeconds, { fontSize: '32px', fill: 'white'});
            Score1=0;
            Score2=0;
                   this.Player2_score = this.add.text(10, 16, 'Player 2 Score:'+Score2, { fontSize: '2rem', fill: 'white' });
this.Player1_score = this.add.text(400, 16, 'Player 1 Score:'+Score1, { fontSize: '2rem', fill: 'white' });
                 this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
                 this.space=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	    this.keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.ex = this.add.text(0, 100, 'Play with two players on the same computer.', { fontSize: '30px', fill: 'white'});
	      this.Mouse = this.add.text(60, 200, 'Use Arrow Keys To Move player1', { fontSize: '30px', fill: 'white'});
                  this.Mouse2 = this.add.text(60, 250, 'Use W, S Keys To Move player2', { fontSize: '30px', fill: 'white'});
                  this.Space = this.add.text(50, 500, 'Use Space To Exit to Menu', { fontSize: '30px', fill: 'white'});
     this.Start = this.add.text(50, 450, 'Click to Start', { fontSize: '75px', fill: 'white'});/*     var particles = this.add.particles('red');
	        var emitter = particles.createEmitter({
	            speed: 100,
	            scwale: { start: 1, end: 0 },
	            blendMode: 'ADD'
        });*/
        this.ball = this.physics.add.image(400, 500,'ball').setCollideWorldBounds(true).setBounce(1.01);
        this.player1 = this.physics.add.image(750, 300, 0x6666ff,'brick0').setCollideWorldBounds(true).setBounce(1).setImmovable().setTint(this.color);
       //this.player1 = this.physics.add.image(750, 300, 'brick0').setCollideWorldBounds(true).setBounce(1).setImmovable();
        count=0;
        this.player2 = this.physics.add.image(50, 300, 'brick1').setCollideWorldBounds(true).setBounce(1).setImmovable().setTint(this.color2);
        this.ball.displayWidth = 50;
        this.ball.displayHeight = 50;
        this.player1.displayWidth = 32;
        this.player1.displayHeight = 64;
                this.player2.displayWidth = 32;
        this.player2.displayHeight = 64;
        this.ball.setData('onPaddle', false);
        this.physics.world.setBoundsCollision(false, false, true, true);
       // this.scoreText = this.add.text(16, 16, 'Player 1: Score: '+Score1, { fontSize: '32px', fill: 'white'});
   //      this.scoreText2 = this.add.text(16, 16, 'Player 2: Score: '+Score2, { fontSize: '32px', fill: 'white'});
                // this.scoreTime = this.add.text(160, 16, 'Time: '+timeInSeconds, { fontSize: '32px', fill: 'white'});
        this.input.on('pointermove', function (pointer) {
         //   this.player1.y = Phaser.Math.Clamp(pointer.y, 52, 748);
            if (this.ball.getData('onPaddle'))
            {
          //      this.ball.y = this.player1.y;
            }
        }, this);
        this.input.on('pointerup', function (pointer) {
            if (!this.ball.getData('onPaddle'))
            {
                this.ball.setVelocity(300, 400); //make random
            this.ball.setData('onPaddle', true);
            this.Mouse.setText('');
            this.Mouse2.setText('');
            this.Start.setText('');
            this.scoreTime.setText('');
            this.ex.setText('');
timeInSeconds = 0;
    this.physics.add.collider(this.ball, this.player1, this.hitPlayer1, null, this);
    this.physics.add.collider(this.ball, this.brick1, this.hitBrick1, null, this);
            this.physics.add.collider(this.ball, this.player2, this.hitPlayer2, null, this);
this.ball.setVelocity(400,400);
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
      hitPlayer2: function (ball, player2)
        {
            var diff = 0;
            if (ball.x < player2.x)
            {
                //  Ball is on the left-hand side of the paddle
                diff = player2.y - ball.y;
                ball.setVelocityX(-10 * diff);
            }
            else if (ball.y > player2.y)
            {
                //  Ball is on the right-hand side of the paddle
                diff = ball.y -player2.y;
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
       //     this.ball.setData('onPaddle', false);
            if (Score1==10||Score2==10)
            {
               console.log("end game");
                this.scene.start('gameover2');
            }
            cursors = this.input.keyboard.createCursorKeys();
     if (cursors.up.isDown) {
        this.player1.setVelocityY(-200);
      } else if (cursors.down.isDown) {
        this.player1.setVelocityY(200);
      }
  if(cursors.space.isDown)
	  {
	              this.scene.start('mainmenu');
}
     if (this.keyW.isDown){
        this.player2.setVelocityY( -200);
      } else if (this.keyS.isDown) {
        this.player2.setVelocityY( 200);
      }
      if(this.ball.body.x>800)
      {
    Score2=Score2+1;
        this.resetLevel();
    }
    if(this.ball.body.x<1){
    Score1=Score1+1;
        this.resetLevel();
    }
      this.Player1_score.setText('Player 1 Score:'+Score1);
this.Player2_score.setText('Player 2 Score:'+Score2);
timeInSeconds++;
this.scoreTime.setText('Time:'+timeInSeconds/100);
    }
    });
    var GameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'gameover' });
        window.OVER = this;
    },
    create: function ()
    {
    var bg=this.add.image(400,300,'norm');
    bg.displayWidth=800;
     bg.displayHeight=800;
        this.add.text(50, 100, 'Game Over - Click to start restart', { font: '30px Courier', fill: '#00ff00' });
        this.add.text(50, 150, 'Final Score - Player 1: '+count+ '   Time: '+timeInSeconds/100, { font: '30px Courier', fill: '#00ff00' });
       //     document.getElementById('count').value= count;
        this.input.once('pointerup', function (event) {
            this.scene.start('mainmenu');
        }, this);
    }
});
     var GameOver3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameOver3 ()
    {
        Phaser.Scene.call(this, { key: 'gameover3' });
        window.OVER = this;
    },
    create: function ()
    {
    var bg=this.add.image(400,300,'loser');
	bg.displayWidth=800;
        this.add.text(100, 50, 'Game Over - Click to start restart', { font: '30px Courier', fill: '#00ff00' });
        this.add.text(100, 20, 'Final Score - Player 1 Time: '+timeInSeconds/100, { font: '30px Courier', fill: '#00ff00' });
       //     document.getElementById('count').value= count;
        this.input.once('pointerup', function (event) {
            this.scene.start('mainmenu');
        }, this);
    }
});
    var GameOver2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameOver2 ()
    {
        Phaser.Scene.call(this, { key: 'gameover2' });
        window.OVER = this;
    },
    create: function ()
    {
    var bg=this.add.image(400,300,'crazy');
    bg.displayWidth=800;
        this.add.text(75, 500, 'Game Over - Click to Go to Menu', { font: '30px Courier', fill: '#00ff00' });
        this.add.text(75, 400, 'Final Score - Player 1: '+Score1+'  Player 2: '+Score2, { font: '30px Courier', fill: '#00ff00' });
        if(Score2>Score1)
        {
              this.add.text(75, 100, 'WINNER: Player 2', { font: '30px Courier', fill: '#00ff00' });
        }
         if(Score2<Score1)
        {
              this.add.text(75, 100, 'WINNER: Player 1', { font: '30px Courier', fill: '#00ff00' });
        }
                   console.log(Score2);
                    document.getElementById('score1').value=Score1;
                    console.log(Score1);
                    document.getElementById('score2').value= Score2;
        this.input.once('pointerup', function (event) {
            this.scene.start('mainmenu');
        }, this);
    }
});
function InitGame()
{
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'gameCanvas',
    scene: [ MainMenu, GameOver, GameOver2,GameOver3,Pong, Pong2, Pong3, Char1 ],
    physics: {
        default: 'arcade'
    },
    pixelArt: true
};
var game = new Phaser.Game(config);
}
