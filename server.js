// build-in NodeJS modules
var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');

// downloaded NodeJS modules
var mime = require('mime-types');
var multiparty = require('multiparty');
var express = require('express');
var sqlite3 = require('sqlite3');
var app = express();
var db_filename = path.join(__dirname, 'db', 'pongDB.sqlite3');

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

                    if (actualPass[0] && actualPass[0].password == query.split('?')[1]) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify(username));
                        res.end();
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
			db.all('INSERT INTO logins VALUES (?, ?)',[username,password], (err,res) =>
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

app.get('/titles/:tconst', (req, res) => {
    console.log(req.params);
    db.get('SELECT * FROM Titles WHERE tconst = ?', [req.params.tconst], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(row));
            res.end();
        }
    });
});




/*
var server = http.createServer((req, res) =>
{
    var req_url = url.parse(req.url);
    var filename = req_url.pathname.substring(1);
    if (filename === '')
    {
        filename = 'index.html';
    }

    if (req.method === 'GET')
    {
        var ext = path.extname(filename);
        var type = mime.lookup(ext) || 'text/plain';
        fs.readFile(path.join(public_dir, filename), (err, data) =>
        {
            if (err)
            {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Oh no! Could not find that page!');
                res.end();
            }
            else
            {
                res.writeHead(200, {'Content-Type': type});
                res.write(data);
                res.end();
            }
        });
    }
    else if (req.method === 'POST')
    {
        if (filename === 'login')
        {
            var form = new multiparty.Form();
            form.parse(req, (err, fields) =>
            {
                console.log(fields.password[0]);
				//var username = decodeURI(fields.username[0]).replace(/\*/       //g, '%');
				/*db.all('SELECT * FROM logins WHERE Username = ?', [username], (err,rows) => {
				if(err)
				{
					//write some error code
					console.log("invlaid user");
					alert("User does not exsist");
				}
				else
				{
					console.log(rows);
					db.all('SELECT Password FROM logins WHERE Username = ?', [username], (err,actualPass) =>
					{
						if(err)
						{
							//write some error code
							console.log("invlaid pass");
						}
						else
						{

							if(actualPass[0] && actualPass[0].password == fields.password[0])
							{
								res.writeHead(200, {'Content-Type': 'application/json'});
								res.write(JSON.stringify(rows));
								res.end();
							}
							else
							{
								console.log("invalid username or pass");
								res.writeHead(500, {'Content-Type': 'application/json'});
								res.write("invalid username or password");
								res.end();
                            }
                        }
                      });
                    }
                });
            });
        }
	else if (filename === 'new_user')
	{
	            var form = new multiparty.Form();
	            form.parse(req, (err, fields) =>
	            {
					console.log(fields.password[0]);
					var username = decodeURI(fields.username[0]).replace(/\*/         //g, '%');
					/*db.all('SELECT * FROM logins WHERE Username = ?', [username], (err,usernameFound) =>
					{
						if(err)
						{
							//write some error code
							console.log("invlaid user");
						}
						else
						{
							if(usernameFound[0] && usernameFound[0].username == fields.username[0])
							{
								res.write("username already taken");
							}
							else
							{
								console.log("new user");
							}
						}

					});

            	});
 			}
      }
});

*/

console.log('Now listening on port ' + port);
var server = app.listen(port);
