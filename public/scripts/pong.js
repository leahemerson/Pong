var app;
var ws;
function Init() {
    app = new Vue({
        el: "#app",
        data: {
            login_type: "/Login",
            login_type_options: [
                { value: "/Login", text: "Login" },
                { value: "/NewUser", text: "New User" }
            ],
            show_type: 'search',
            search_results: [],
            selected_item: {},
            username: "",
            password: "",
		bestScore: 0,
	     score1: 0,
		score2: 0,
		leaders: {},
		statistics: {},
		image: 0,
		imageUrl: "assets/profile1.jpg",
        client_count: 0,
        new_message: "",
        chat_messages: [],
        rooms: [],
        chosenRoom: "",
        newRoom : ""
	},
	 watch: {
    		firstName: function()
		{
      			console.log(this.score1);
	   	},
		score1: function()
		{
			if(this.score1>this.bestScore)
			{
				updateBestScore();
			}

			updateScore();
		},
		show_type: function()
		{
			if(this.show_type =='game')
			{
				 InitGame();
			}
			else
			{
				$("canvas").remove();

			}
		},
		chosenRoom: function()
		{
			console.log(this.chosenRoom);
			join(this.chosenRoom);
		},
		new_message: function()
		{
			broadcast(this.new_message,choosenRoom);
		},
		newRoom: function()
		{
			this.chosenRoom = this.newRoom;
		}

	}
	});
}
    var port = window.location.port || "80";
    ws = new WebSocket("ws://" + window.location.hostname + ":" + port);

    ws.onopen = (event) =>
    {
        console.log("Connection successful!");
    };
    ws.onmessage = (event) =>
    {
        console.log(event.data);
        var message = JSON.parse(event.data);
        if(message.msg === "client_count")
        {
                app.client_count = message.data;
        }
        else if(message.msg === "text") {
                app.chat_messages.push(message.data);
        }
        function send() {
    			ws.send(app.new_message);
		}
		function broadcast(msg, room)
		{
			ws.send(JSON.stringify({room:room,msg:msg}))
		}

	}

function createRoom(){

	//app.chosenRoom = app.newRoom;
	app.rooms.push(app.newRoom);
}
function join(room)
{
	ws.send(JSON.stringify({join:room}));
	console.log(room);
}

function LoginSearch(event) {
    if (app.username !== "") {
        GetJson(app.login_type + "?" + app.username + "?" + app.password).then((data) => {
		console.log(data);
		if(data == "invalid username or password")
		{
			alert("invalid username or password");
		}
		else if(data == "username already taken")
		{
			alert("username already taken");
		}
		else
		{
	        	app.show_type = 'game';
		    	app.search_results = data;
		    	 app.imageUrl = data[1][0].Image;
		    	app.bestScore = data[1][0].BestScore;
		    	console.log("best score" +  data[1][0].BestScore);
		    	console.log(app.bestScore);
			console.log(data);
			//var showProfile = document.getElementsByTagName("canvas");
		    //	var showProfile = document.getElementById("gameCanvas");
		//	showProfile.style.display = "inline-block";

			//var gamePage = document.getElementById("gameCanvas");
            		//gamePage.style.display = "inline-block";
			//window.location.href = "../game.html";

		}
        });
    }
}
function updateScore(event)
{
    GetJson("/UpdateScore" + "?" + app.username+ "?" + app.score1 ).then((data) => {
        console.log("Updated Score");
        //console.log(app.leaders);
    }, "json");
}
function updateBestScore(event)
{
    GetJson("/UpdateBestScore" + "?" + app.username+ "?" + app.score1).then((data) => {
        console.log("Updated Best Score");
        app.bestScore = app.score1;
    }, "json");
}
function getLeaderBoard(event){
    GetJson("/LeaderBoard").then((data) => {
        app.leaders = data;
	app.show_type = 'leaders';
       	console.log(app.leaders);
       	app.leaders.sort(function(a, b){return b.BestScore - a.BestScore});
       	console.log(app.leaders);

    }, "json");
}
function getProfile(user){
	console.log("CLicked user" +user);
	GetJson("/Profile" + "?" + app.username).then((data) => {
        app.statistics =data;
	app.statistics = app.statistics.reverse();

        app.show_type = 'profile';
        console.log("PROFILE DATA: " + app.statistics);
    }, "json");
}
function GetUser(user) {
    	GetJson(user).then((data) => {
        app.selected_item = data;
       	console.log(app.selected_item);
	 app.show_type = 'game'
    }, "json");
}
function ChooseProfileImage()
{
	showProfile = document.getElementById("profileChoice");
	showProfile.stlye.display = "inline-block";

}

function GetProfileUrl(data)
{
	console.log( "image #:" +  data);
	if(data ==0)
	{
		app.imageUrl = "assets/profile1.jpg";
	}
	else if(data ==1)
	{
		app.imageUrl = "assets/profile2.jpg";
	}
	else if(data ==2)
	{
		app.imageUrl = "assets/profile3.jpg";
	}
	else if(data ==3)
	{
		app.imageUrl = "assets/profile4.jpg";
	}
	else if(data ==4)
	{
		app.imageUrl = "assets/profile5.jpg";
	}
	else if(data ==5)
	{
		app.imageUrl = "assets/profile6.jpg";
	}
	else if(data ==6)
	{
		app.imageUrl = "assets/profile7.jpg";
	}
	else if(data ==7)
	{
		app.imageUrl = "assets/profile8.jpg";
	}
	else if(data ==8)
	{
		app.imageUrl = "assets/profile9.jpg";
	}
	else if(data ==9)
	{
		app.imageUrl = "assets/profile10.jpg";
	}
	else if(data ==10)
	{
		app.imageUrl = "assets/profile11.jpg";
	}
	else if(data ==11)
	{
		app.imageUrl = "assets/profile12.jpg";
	}
	else if(data ==12)
	{
		app.imageUrl = "assets/profile13.jpg";
	}
	else if(data ==13)
	{
		app.imageUrl = "assets/profile14.jpg";
	}
	else if(data ==14)
	{
		app.imageUrl = "assets/profile15.jpg";
	}
	else if(data ==15)
	{
		app.imageUrl = "assets/profile16.jpg";
	}
	InsertProfileImage();
}

function InsertProfileImage(event)
{
    GetJson("/ProfileImage" + "?" + app.username + "?" +  app.imageUrl).then((data) => {
        console.log("PROFILE image DATA: " + data);
    }, "json");
}
function GetJson(url, query) {
    return new Promise((resolve, reject) => {
        $.get(url, (data) => {
            resolve(data);
        }, "json");
    });
}
function SortBestScore(){
	for(var i =0; i< leaders.BestScore; i++)
	{

	}
}

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

/*

  if(button.name==='MultiPlayer')
{
        button.setInteractive();
        button.once('pointerup', function () {
			var self = this;
				this.socket = io();
				this.socket.on('currentPlayers', function(clients) {
					console.log(clients );
					Object.keys(clients.all).slice(1).forEach(function(id)
					{
						if(clients.player1 != "") {
							console.log("player 1!" );
							clients.player1 = id;
							 this.socket.emit('player1', {id });
							//var player1Text = this.add.text(30, 50, "You are player 1" , { fontSize: '32px', fill: 'white'});
							var cake=cake;

						}
						else if(clients.player2 != "")
						{
								console.log("player 2!" );
								clients.player2 = id;
								this.socket.emit('player2', {id });
								//this.add.text(400, 300,"You are player 2");

 								this.scene.start('game2');

						}
						else
						{
							this.add.text(400, 300,"Please Wait for a game room to open...");
						}
					});
			});

        }, this);

}*/
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
   // { name: 'MultiPlayer' },
    {name: 'Time Challenge'}];
    //{name: 'Player 1: Color'},
    //{name: 'Player 2: Color'}
Menu = this.add.text(100, 20, 'Pong Menu', { font: '100px Arial', fill: '#fff' });
        makeButton.call(this, markers[0].name, 350, 240);
        makeButton.call(this, markers[1].name, 350, 280);
        //makeButton.call(this, markers[2].name, 350, 320);
      //  makeButton.call(this, markers[3].name, 350, 360);
        //makeButton.call(this, markers[4].name, 350, 400);
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
		app.score1 = count;
            this.scene.start('gameover');
        }
        cursors = this.input.keyboard.createCursorKeys();      if(cursors.space.isDown)
		  {
		              this.scene.start('mainmenu');
}
 /*if (cursors.up.isDown) {
    player1.body.velocity.y = -200;
  } else if (cursors.down.isDown) {
    player1.body.velocity.y = 200;
  }*/
this.scoreText.setText('Score:' + count);
timeInSeconds++;
this.scoreTime.setText('Time: '+timeInSeconds/100);
    }
    });
    var gamecreate =  new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function gamecreate ()
    {
		Phaser.Scene.call(this, { key: 'gamecreate' });
    },
  create: function () {
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
	      //  makeButton.call(this, markers[3].name, 350, 360);
	        //makeButton.call(this, markers[4].name, 350, 400);
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
    /*var Pong2 = new Phaser.Class({
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
            	//this.ex = this.add.text(0, 100, 'Play with two players on the same computer.', { fontSize: '30px', fill: 'white'});
	     	 	this.Mouse = this.add.text(60, 200, 'Use Arrow Keys To Move player1', { fontSize: '30px', fill: 'white'});
                  this.Mouse2 = this.add.text(60, 250, 'Use W, S Keys To Move player2', { fontSize: '30px', fill: 'white'});
                  this.Space = this.add.text(50, 500, 'Use Space To Exit to Menu', { fontSize: '30px', fill: 'white'});
     				this.Start = this.add.text(50, 450, 'Click to Start', { fontSize: '75px', fill: 'white'});

       			 this.ball = this.physics.add.image(400, 500,'ball').setCollideWorldBounds(true).setBounce(1.01);
				count=0;
		        this.ball.displayWidth = 50;
		        this.ball.displayHeight = 50;

		        this.ball.setData('onPaddle', false);
        this.physics.world.setBoundsCollision(false, false, true, true);
	var self = this;
	this.socket = io();
	this.socket.on('currentPlayers', function(clients) {
		Object.keys(clients).slice(1).forEach(function(id) {

			if(clients[id].player1 === self.socket.id &&cake===cake) {
				console.log("player server correct!" );
				self.player1 = self.physics.add.image(750, 300,'brick0').setCollideWorldBounds(true).setBounce(1).setImmovable().setTint(this.color);
				 self.player1.displayWidth = 32;
		        self.player1.displayHeight = 64;
			}
			else if (clients[id].player2 === self.socket.id){
				console.log("player 2!" );
				self.player2 = self.physics.add.image(50, 300, 'brick0').setCollideWorldBounds(true).setBounce(1).setImmovable().setTint(this.color2);
				self.player2.playerId = clients[id].playerId;
				self.player2.displayWidth = 32;
		        self.player2.displayHeight = 64;
			}

		});
	});
        this.socket.on('playerMoved', function (playerInfo) {
		    if (playerInfo.playerId === player2.playerId)
		    {
		      player2.y = playerInfo.y;
		    }
		});
		this.socket.on('scoreUpdate', function (scores) {
		  self.Player1_score.setText('Player 1 Score:'+Score1);
		  self.Player2_score.setText('Player 2 Score:'+Score2);
		});
		this.socket.on('ballMoved', function (ballInfo) {
			 this.ball.x = ballInfo.x;
			 this.ball.y = ballInfo.y;
		});
       //this.player1 = this.physics.add.image(750, 300, 'brick0').setCollideWorldBounds(true).setBounce(1).setImmovable();

        this.input.on('pointermove', function (pointer) {
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
				//this.ex.setText('');
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
			cursors = this.input.keyboard.createCursorKeys();
			if(cursors.space.isDown)
			{
				this.scene.start('mainmenu');
			}
			//Player movements
			if(this.player1)
			{
				console.log("Made it here" + this.player1);
				var play1y = this.player1.y;
				//var play2y = self.player2.y;

				if(this.player1.oldPosition && (this.player1.oldPosition !=  play1y))
				{
					 this.socket.emit('playerMovement', { y: this.player1.y });
				}
				/*if(self.player2.oldPosition && (self.player2.oldPosition !=  play2y))
				{
					self.socket.emit('playerMovement', { y: self.player2.y });
				}
				//Ball Movements
				var ballX = this.ball.x;
				var ballY= this.ball.y;
				if (this.ball.oldPosition && (ballX !== this.ball.oldPosition.x || ballY !== this.ball.oldPosition.y ))
				{
				  this.socket.emit('ballMovement', { x: this.ball.x, y: this.ball.y });
				}

				// save old position data
				this.ball.oldPosition = {
				  x: this.ball.x,
				  y: this.ball.y,
				};

				if (Score1==10||Score2==10)
				{
				   console.log("end game");
					this.scene.start('gameover2');
				}
				this.player1.oldPosition = this.player1.y;
				//this.player2.oldPosition = self.player2.y;

				if (cursors.up.isDown)
				{
					this.player1.setVelocityY(-200);
				 }
				 else if (cursors.down.isDown)
				 {
					this.player1.setVelocityY(200);
				 }

				/*if (this.keyW.isDown)
				{
					this.player2.setVelocityY( -200);
				 }
				 else if (self.keyS.isDown)
				 {
					self.player2.setVelocityY( 200);
				 }
				  if(this.ball.body.x>800)
				  {
					Score2=Score2+1;
					this.resetLevel();
					}
					if(this.ball.body.x<1)
					{
						Score1=Score1+1;
						this.resetLevel();
					}
				 //this.Player1_score.setText('Player 1 Score:'+Score1);
				// io.emit('scoreUpdate', Score1);
				//this.Player2_score.setText('Player 2 Score:'+Score2);
				//io.emit('scoreUpdate', Score2);
				timeInSeconds++;
				this.scoreTime.setText('Time:'+timeInSeconds/100);
			}
		}
   });*/
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
/*
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
*/
function InitGame()
{
	var config = {
		type: Phaser.WEBGL,
		width: 800,
		height: 600,
		parent: 'gameCanvas',
		scene: [Preloader, MainMenu, gamecreate, GameOver, GameOver2,GameOver3,Pong,/* Pong2,*/ Pong3],
		physics: {
			default: 'arcade'
		},
		pixelArt: true
	};
	var game = new Phaser.Game(config);
}
