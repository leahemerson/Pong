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
var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READONLY, (err) => {
	if (err) {
		console.log('Error opening' + db_filename);
	}
	else{
		console.log('Now connected to' + db_filename);
	}
});
app.use(express.static(public_dir));

var server = http.createServer((req, res) => {
    var req_url = url.parse(req.url);
    var filename = req_url.pathname.substring(1);
    if (filename === '') {
        filename = 'index.html';
    }

    if (req.method === 'GET') {
        var ext = path.extname(filename);
        var type = mime.lookup(ext) || 'text/plain';
        fs.readFile(path.join(public_dir, filename), (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Oh no! Could not find that page!');
                res.end();
            }
            else {
                res.writeHead(200, {'Content-Type': type});
                res.write(data);
                res.end();
            }
        });
    }
    else if (req.method === 'POST') {
        if (filename === 'upload') {
            var form = new multiparty.Form();
            form.parse(req, (err, fields) => {
                console.log(fields.password[0]);
		var username = decodeURI(fields.username[0]).replace(/\*/g, '%');
		db.all('SELECT * FROM logins WHERE Username = ?', [username], (err,rows) => {
		if(err)
		{
			//write some error code
			console.log("invlaid user");
			alert("User does not exsist");
		}
		else
		{	
			console.log(rows);
			db.all('SELECT Password FROM logins WHERE Username = ?', [username], (err,actualPass) => {
			if(err)
			{
				//write some error code
				console.log("invlaid pass");
				alert("Incorrect password");
			}
			else
			{

				//console.log(actualPass[0].password);
				if(actualPass[0] && actualPass[0].password == fields.password[0])
				{
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.write(JSON.stringify(rows));
					res.end();
				}
				else
				{
					console.log("invalid username or pass");
					//window.alert("invalid username or password");
				}
			}
		});
		}


	});




               // console.log(files);
   /*             fs.copyFile(path.join(__dirname), (err) => {
                    if (err) {
                        console.log('Could not copy file');
                    }
                });*/
            });
            /*
            var body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                var data_arr = body.split('&');
                var i;
                var data = {};
                var key_val;
                for (i = 0; i < data_arr.length; i++) {
                    key_val = data_arr[i].split('=');
                    data[key_val[0]] = key_val[1];
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<!DOCTYPE html>\n');
                res.write('<html>\n');
                res.write('<head>\n');
                res.write('    <title>Thank You</title>\n');
                res.write('</head>\n');
                res.write('<body>\n');
                res.write('    <p>Thank you ' + data['fname'] + ' ' + data['lname'] + '!</p>\n');
                res.write('</body>\n');
                res.write('</html>');
                res.end();
            });
            */
        }
    }
});

console.log('Now listening on port ' + port);
server.listen(port, '0.0.0.0');
