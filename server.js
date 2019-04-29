// build-in NodeJS modules
var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');

// downloaded NodeJS modules
var mime = require('mime-types');
var multiparty = require('multiparty');

var port = 8007;
var public_dir = path.join(__dirname, 'public');
//var public_dir = path.join(__dirname, 'tmarrinan.github.io');

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
                console.log(fields);
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
