// build-in NodeJS modules
var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
var WebSocket = require('ws');
// downloaded NodeJS modules
var mime = require('mime-types');
var multiparty = require('multiparty');
var express = require('express');
var sqlite3 = require('sqlite3');
var app = express();
var db_filename = path.join(__dirname, 'db', 'pongDB.sqlite3');

var server = http.createServer(app);
//var serverMulti =  http.Server(app);
/*var io = require('socket.io').listen(server);

var clients = {	player1: "",
		player2: "", all: []};

io.on('connection', function(socket) {

console.log("new conncetion");
	clients.all[socket.id] = {
		playerId:socket.id
	};
	socket.emit('currentPlayers', clients);
	socket.broadcast.emit('newPlayer', clients.all[socket.id]);
	socket.on('playerMovement', function (movementData) {
	  clients.all[socket.id].y = movementData.y;
	  // emit a message to all players about the player that moved
	  socket.broadcast.emit('playerMoved', clients[socket.id]);
	});
	socket.on('ballMovement', function (movementData) {
	  //players[socket.id].y = movementData.y;
	  // emit a message to all players about the player that moved
	  socket.broadcast.emit('ballMoved', movementData);
});
	socket.on('player1', function (socketId) {
	  clients.player1 = socketId;
});
	socket.on('player2', function (socketId) {
	  clients.player2 = socketId;
});
	socket.on('disconnect', function() {
		console.log('user disconnected');
		delete clients.all[socket.id];
		io.emit('disconnect', socket.id);
	});
});

*/
var port = 8007;
var public_dir = path.join(__dirname, 'public');
//var public_dir = path.join(__dirname, 'tmarrinan.github.io');
var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.log('Error opening' + db_filename);
	}
	else{
		console.log('Now connected to' + db_filename);
	}
});
app.use(express.static(public_dir));
app.get('/Login', (req, res) => {
    var req_url = url.parse(req.url);
    var query = decodeURI(req_url.query).replace(/\*/g, '%');
    var username = query.split('?')[0];
    db.all('SELECT * FROM logins WHERE Username = ?', [username], (err, rows) =>
    {
        if (err)
        {
            //write some error code
            console.log("invlaid user");
            //alert("User does not exsist");
        }
        else
        {
            console.log("username: " + username);
            db.all('SELECT Password FROM logins WHERE Username = ?', [username], (err, actualPass) => {
                if (err) {
                    //write some error code
                    console.log("invlaid pass");
                }
                else {
                    if (actualPass[0] && actualPass[0].password == rstr_md5(query.split('?')[1])) {

			db.all('SELECT BestScore,Image FROM logins WHERE Username = ?', [username], (err, stats) => {
				if(err){
					//write some error code
					console.log("error with getting stats");
				}
				else{
					console.log("ENTERED: "  + rstr_md5(query.split('?')[1]) + "ACTUAL: " + actualPass[0].password);
					res.writeHead(200, { 'Content-Type': 'application/json' });
                        		res.write(JSON.stringify([username, stats]));
                      			res.end();
				}
			});
                    }
                    else {
				console.log("invalid username or password");
				var response ="invalid username or password";
                        	res.writeHead(200, { 'Content-Type': 'application/json' });
                       		res.write(JSON.stringify(response));
                        	res.end();
                    }
                }
            });
        }
    });
});

app.get('/NewUser', (req, res) => {
    var req_url = url.parse(req.url);
    var query = decodeURI(req_url.query).replace(/\*/g, '%');
    var username = query.split('?')[0];
    var password = query.split('?')[1];
	db.all('SELECT * FROM logins WHERE Username = ?', [username], (err,usernameFound) =>
	{
	if(err)
	{
		//write some error code
		console.log("invlaid user");
	}
	else
	{
		//console.log(usernameFound[0].username);
		//console.log(username);
		if(usernameFound[0] && usernameFound[0].username == username)
		{
			console.log("username already taken");
			var response ="username already taken";
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(response));
			res.end();
		}
		else
		{
			console.log("new user");
			db.all('INSERT INTO logins VALUES (?, ?, ? ,?, ?)',[username,rstr_md5(password), [], 0, 'public/assets/profile1.jpg'], (err,res) =>
			{
				if(err)
				{
					console.log(err.message);
				}
				else
				{
					console.log('new user entered with username: ' + username + ' password : ' +  password);
				}
			});
		}
	}

	});
});

app.get('/LeaderBoard', (req, res) => {
	//UPDATE logins SET bestScore = 10 WHERE username = 'leah'
    console.log(req.params);
    db.all('SELECT Username, BestScore  FROM logins', (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
	console.log(rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(rows));
            res.end();
        }
    });
});
app.get('/Profile', (req, res) => {
    var req_url = url.parse(req.url);
    var query = decodeURI(req_url.query).replace(/\*/g, '%');
    var username = query.split('?')[0];
	console.log("user: " +username);
    db.all('SELECT *  FROM Stats WHERE Username = ?',[username], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log( "ROWS" +JSON.stringify(rows));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(rows));
            res.end();
        }
    });
});
app.get('/ProfileImage', (req, res) => {
    var req_url = url.parse(req.url);
    var query = decodeURI(req_url.query).replace(/\*/g, '%');
    var username = query.split('?')[0];
    var image = query.split('?')[1];
    db.all('UPDATE logins SET Image = ?  WHERE Username = ? ',[ image, username], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log( "ROWS" +JSON.stringify(rows));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(rows));
            res.end();
        }
    });
});
app.get('/UpdateScore', (req, res) => {
    var req_url = url.parse(req.url);
    var query = decodeURI(req_url.query).replace(/\*/g, '%');
    var username = query.split('?')[0];
    var score = query.split('?')[1];
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
    db.all('INSERT INTO Stats VALUES(?,?, ?)',[username,today, score], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log( "ROWS" +JSON.stringify(rows));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(rows));
            res.end();
        }
    });
});
app.get('/UpdateBestScore', (req, res) => {
    var req_url = url.parse(req.url);
    var query = decodeURI(req_url.query).replace(/\*/g, '%');
    var username = query.split('?')[0];
    var score = query.split('?')[1];
    db.all('UPDATE logins SET BestScore = ? WHERE Username = ?',[score, username], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log( "ROWS" +JSON.stringify(rows));
           // res.writeHead(200, { 'Content-Type': 'application/json' });
           // res.write(JSON.stringify(rows));
           // res.end();
        }
    });
});
//adapted from example
var client_count =0;
var clients = {};
var wss = new WebSocket.Server({server: server});
var messages = [];
wss.on('connection', (ws) => {
	ws.room=[];
	ws.send("user joined");
	console.log('connected');

	ws.on('message', message=>{

		var messageParse=JSON.parse(message);

		if(messageParse.join)
		{
			//if joinging room add to room array
			ws.room.push(messageParse.join)
		}
		if(messageParse.room){
			//if sending message broadcast message to those in room
			broadcast(messageParse);
		}

		ws.on('close',(e)=>console.log('websocket closed'+e))

	});
});
function broadcast(messageParse){
	wss.clients.forEach(client=>{
	if(client.room.indexOf(messageParse.room)>-1)
	{
		client.send(messageParse.msg);
	}
	});
}




/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

console.log('Now listening on port ' + port);
//var server = app.listen(port);
server.listen(port, '0.0.0.0');
